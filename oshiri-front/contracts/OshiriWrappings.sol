//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract OshiriWrappings is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    //Incrementing value for each token

    uint256 wTypeCurrent;
    uint256 wSubTypeCurrent;
    uint256 wVariationCurrent;
    uint256 wBaseColorCurrent;
    uint256 wVariationColorCurrent;
    uint256 wSerialNumberCurrent;

    address oshiriCurrencyAddress;

    struct WrappingStats {
        uint256 wType;
        //1-6
        uint256 wSubType;
        //1-3
        uint256 wVariation;
        //1-4
        uint256 wBaseColor;
        //1-3
        uint256 wVariationColor;
        //1-6
        uint256 wSerialNumber;
    }

    mapping(uint256 => mapping(uint256 => mapping(uint256 => mapping(uint256 => mapping(uint256 => uint256)))))
        private CreatedWrappings;

    //wType => wSubType => wVariation => wBaseColor => wVariationColor => wSerialNumber

    constructor() ERC721("Oshiri Wrappings", "OSHWRAP") {}

    function createToken(string memory tokenURI) public returns (uint) {
        getNextInLine();
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        //Gives the marketplace the approval to transact this token between users
        //from within another contract
        return newItemId;
    }

    // returns wSerialNumberCurrent
    function getNextInLine() private returns (WrappingStats memory) {
        if (
            CreatedWrappings[wTypeCurrent][wSubTypeCurrent][wVariationCurrent][
                wBaseColorCurrent
            ][wVariationColorCurrent] < 100
        ) {
            WrappingStats memory newWrapping = WrappingStats(
                wTypeCurrent,
                wSubTypeCurrent,
                wVariationCurrent,
                wBaseColorCurrent,
                wVariationColorCurrent,
                wSerialNumberCurrent
            );
            //Set first type += 1 if less than max, else go back to 0 and plus 1 to subType, do the same until colorCUrrent
            return newWrapping;
        } else {
            //NFT Finished
        }
    }
    //Should go through all, if no available: NFT ENDED
}
