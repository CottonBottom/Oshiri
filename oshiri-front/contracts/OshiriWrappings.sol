//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OshiriWrappings is ERC721URIStorage, IERC2981, Ownable {
    address private oshiriGame;
    address private oshiriCurrencyAddress;
    uint256 private wrappingId;

    uint256 private wTypeCurrent = 1;
    uint256 private wSubTypeCurrent = 1;
    uint256 private wVariationCurrent = 1;
    uint256 private wBaseColorCurrent = 1;
    uint256 private wSecondaryColorCurrent = 1;
    uint256 private wSerialNumberCurrent = 1;

    uint256 private maxTypes = 6;
    uint256 private maxSubTypes = 3;
    uint256 private maxVariations = 4;
    uint256 private maxBaseColors = 3;
    uint256 private maxSecondaryColors = 6;

    uint256 private totalCopiesPerPair;

    struct WrappingStats {
        uint256 wType;
        uint256 wSubType;
        uint256 wVariation;
        uint256 wBaseColor;
        uint256 wSecondaryColor;
        uint256 wSerialNumber;
    }

    mapping(uint256 => WrappingStats) private CreatedWrappings;
    //wType => wSubType => wVariation => wBaseColor => wSecondaryColor => wSerialNumber

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

    /** External Viewable */
    function getWrapping(uint256 tokenId)
        public
        view
        returns (WrappingStats memory)
    {
        return CreatedWrappings[tokenId];
    }

    function checkAvailableWrappings() external view returns (uint256) {
        uint256 total = maxTypes *
            maxSubTypes *
            maxVariations *
            maxBaseColors *
            maxSecondaryColors *
            totalCopiesPerPair;
        return total - wrappingId;
    }

    /** */

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

    //TODO: Get data from the event -> Make JSON and upload -> get URL and setTokenURI
    function createToken(address receiver) external returns (uint256) {
        require(msg.sender == oshiriGame, "Can only be called from Oshiri");
        require(
            wSerialNumberCurrent <= totalCopiesPerPair,
            "All wrappings have been discovered"
        );
        uint currentWrappingId = wrappingId;
        WrappingStats memory newWrapping = getNextInProductionLine();
        CreatedWrappings[wrappingId] = newWrapping;
        _mint(receiver, wrappingId);
        emit WrappingGenerated(newWrapping);
        wrappingId += 1;
        return currentWrappingId;
    }

    function setTokenURI(uint256 tokenId, string memory tokenURI)
        external
        onlyOwner
    {
        _setTokenURI(tokenId, tokenURI);
    }

    function addCombinations(
        uint256 addType,
        uint256 addSubType,
        uint256 addVariation,
        uint256 addBaseColor,
        uint256 addVariationColor
    ) external onlyOwner {
        maxTypes += addType;
        maxSubTypes += addSubType;
        maxVariations += addVariation;
        maxBaseColors += addBaseColor;
        maxSecondaryColors += addVariationColor;
    }

    function getNextInProductionLine() private returns (WrappingStats memory) {
        //Build Current Set Wrapping Stats
        WrappingStats memory newWrapping = WrappingStats(
            wTypeCurrent,
            wSubTypeCurrent,
            wVariationCurrent,
            wBaseColorCurrent,
            wSecondaryColorCurrent,
            wSerialNumberCurrent
        );

        //Update All Current Stats
        if (wTypeCurrent < maxTypes) {
            wTypeCurrent += 1;
        } else {
            wTypeCurrent = 1;
            if (wSubTypeCurrent < maxSubTypes) {
                wSubTypeCurrent += 1;
            } else {
                wSubTypeCurrent = 1;
                if (wVariationCurrent < maxVariations) {
                    wVariationCurrent += 1;
                } else {
                    wVariationCurrent = 1;
                    if (wBaseColorCurrent < maxBaseColors) {
                        wBaseColorCurrent += 1;
                    } else {
                        wBaseColorCurrent = 1;
                        if (wSecondaryColorCurrent < maxSecondaryColors) {
                            wSecondaryColorCurrent += 1;
                        } else {
                            wSecondaryColorCurrent = 1;
                            wSerialNumberCurrent += 1;
                        }
                    }
                }
            }
        }
        return newWrapping;
    }

    function createTokenTestOnly(address receiver) external returns (uint256) {
        require(
            wSerialNumberCurrent <= totalCopiesPerPair,
            "All wrappings have been discovered"
        );
        uint currentWrappingId = wrappingId;
        WrappingStats memory newWrapping = getNextInProductionLine();
        CreatedWrappings[wrappingId] = newWrapping;
        _mint(receiver, wrappingId);
        emit WrappingGenerated(newWrapping);
        wrappingId += 1;
        return currentWrappingId;
    }
}
