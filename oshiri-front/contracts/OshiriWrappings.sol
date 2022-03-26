//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract OshiriWrappings is ERC721URIStorage {
    // using Counters for Counters.Counter;
    // Counters.Counter private _tokenIds;
    //Incrementing value for each token

    uint256 wrappingId;

    uint256 wTypeCurrent = 1;
    uint256 wSubTypeCurrent = 1;
    uint256 wVariationCurrent = 1;
    uint256 wBaseColorCurrent = 1;
    uint256 wVariationColorCurrent = 1;

    uint256 wSerialNumberCurrent = 1;

    uint256 maxType = 6;
    uint256 maxSubType = 3;
    uint256 maxVariation = 4;
    uint256 maxBaseColor = 3;
    uint256 maxVariationColor = 6;

    uint256 totalCopiesPerPair;

    address oshiriCurrencyAddress;

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

    constructor(uint256 copiesPerPair) ERC721("Oshiri Wrappings", "OSHWRAP") {
        totalCopiesPerPair = copiesPerPair;
    }

    event WrappingGenerated(WrappingStats newWrapping);

    function createToken() public {
        require(
            wSerialNumberCurrent <= totalCopiesPerPair,
            "All wrappings have been discovered"
        );
        WrappingStats memory newWrapping = getNextInProductionLine();
        // _tokenIds.increment();
        // uint256 newItemId = _tokenIds.current();
        // _mint(msg.sender, newItemId);
        // _setTokenURI(newItemId, tokenURI);
        //Gives the marketplace the approval to transact this token between users
        //from within another contract
        emit WrappingGenerated(newWrapping);
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
