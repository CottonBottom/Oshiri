//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract OshiriWrappings is ERC721URIStorage{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    //Incrementing value for each token

    address contractAddress;

    constructor() ERC721("Oshiri Wrappings","OSHWRAP"){
    }

    // function createToken(string memory tokenURI) public returns (uint){
    //     _tokenIds.increment();
    //     uint256 newItemId = _tokenIds.current();

    //     _mint(msg.sender, newItemId);
    //     _setTokenURI(newItemId, tokenURI);
    //     setApprovalForAll(contractAddress, true);
    //     //Gives the marketplace the approval to transact this token between users
    //     //from within another contract
    //     return newItemId;
    // }
}