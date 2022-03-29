//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OshiriWrappings is ERC721URIStorage, IERC2981, Ownable {
    address private oshiriGame;
    uint256 private wrappingId;

    uint256 private wTypeCurrent = 1;
    uint256 private wSubTypeCurrent = 1;
    uint256 private wVariationCurrent = 1;
    uint256 private wBaseColorCurrent = 1;
    uint256 private wVariationColorCurrent = 1;
    uint256 private wSerialNumberCurrent = 1;

    uint256 private maxType = 6;
    uint256 private maxSubType = 3;
    uint256 private maxVariation = 4;
    uint256 private maxBaseColor = 3;
    uint256 private maxVariationColor = 6;

    uint256 private totalCopiesPerPair;

    address private oshiriCurrencyAddress;

    struct WrappingStats {
        uint256 wType;
        uint256 wSubType;
        uint256 wVariation;
        uint256 wBaseColor;
        uint256 wVariationColor;
        uint256 wSerialNumber;
    }

    mapping(uint256 => mapping(uint256 => mapping(uint256 => mapping(uint256 => mapping(uint256 => uint256)))))
        private CreatedWrappings;
    //wType => wSubType => wVariation => wBaseColor => wVariationColor => wSerialNumber

    /** IERC2981 Royalties */
    struct RoyaltyInfo {
        address recipient;
        uint24 amount;
    }
    RoyaltyInfo private royalties;

    /** */

    constructor(uint256 copiesPerPair) ERC721("Oshiri Wrappings", "OSHWRAP") {
        totalCopiesPerPair = copiesPerPair;
        setRoyalties(msg.sender, 1000);
        //Start with 10%
    }

    function setOshiriGameAddress(address oshiriGameAddress)
        external
        onlyOwner
    {
        oshiriGame = oshiriGameAddress;
    }

    /** Royalties */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, IERC165)
        returns (bool)
    {
        return
            interfaceId == type(IERC2981).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function setRoyalties(address recipient, uint256 value) public onlyOwner {
        require(value <= 10000, "ERC2981Royalties: Too high");
        royalties = RoyaltyInfo(recipient, uint24(value));
    }

    function royaltyInfo(uint256, uint256 value)
        external
        view
        override
        returns (address receiver, uint256 royaltyAmount)
    {
        RoyaltyInfo memory currentRoyalties = royalties;
        receiver = currentRoyalties.recipient;
        royaltyAmount = (value * currentRoyalties.amount) / 10000;
    }

    /** */

    event WrappingGenerated(WrappingStats newWrapping);

    //TODO: Create token with URI and metadata
    function createToken(address receiver) external {
        require(msg.sender == oshiriGame, "Can only be called from Oshiri");
        require(
            wSerialNumberCurrent <= totalCopiesPerPair,
            "All wrappings have been discovered"
        );
        //Require OSH amount
        WrappingStats memory newWrapping = getNextInProductionLine();
        wrappingId += 1;
        // _tokenIds.increment();
        // uint256 newItemId = _tokenIds.current();
        _mint(receiver, wrappingId);
        //_setTokenURI(newItemId, tokenURI);
        //Gives the marketplace the approval to transact this token between users
        //from within another contract
        emit WrappingGenerated(newWrapping);
    }

    function checkAvailableWrappings() external view returns (uint256) {
        uint256 total = maxType *
            maxSubType *
            maxVariation *
            maxBaseColor *
            maxVariationColor *
            totalCopiesPerPair;
        return total - wrappingId;
    }

    function addCombinations(
        uint256 addType,
        uint256 addSubType,
        uint256 addVariation,
        uint256 addBaseColor,
        uint256 addVariationColor
    ) external onlyOwner {
        maxType += addType;
        maxSubType += addSubType;
        maxVariation += addVariation;
        maxBaseColor += addBaseColor;
        maxVariationColor += addVariationColor;
    }

    // returns wSerialNumberCurrent
    function getNextInProductionLine() private returns (WrappingStats memory) {
        //Build Current Set Wrapping Stats
        WrappingStats memory newWrapping = WrappingStats(
            wTypeCurrent,
            wSubTypeCurrent,
            wVariationCurrent,
            wBaseColorCurrent,
            wVariationColorCurrent,
            wSerialNumberCurrent
        );

        //Update All Current Stats
        if (wTypeCurrent < maxType) {
            wTypeCurrent += 1;
        } else {
            wTypeCurrent = 1;
            if (wSubTypeCurrent < maxSubType) {
                wSubTypeCurrent += 1;
            } else {
                wSubTypeCurrent = 1;
                if (wVariationCurrent < maxVariation) {
                    wVariationCurrent += 1;
                } else {
                    wVariationCurrent = 1;
                    if (wBaseColorCurrent < maxBaseColor) {
                        wBaseColorCurrent += 1;
                    } else {
                        wBaseColorCurrent = 1;
                        if (wVariationColorCurrent < maxVariationColor) {
                            wVariationColorCurrent += 1;
                        } else {
                            wVariationColorCurrent = 1;
                            wSerialNumberCurrent += 1;
                        }
                    }
                }
            }
        }
        return newWrapping;
    }
}
