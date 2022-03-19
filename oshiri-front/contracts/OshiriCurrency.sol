// contracts/OurToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OurToken is ERC20 {
    //initialSupply: wei
    constructor(uint256 initialSupply) ERC20("Oshiri", "OSH") {
        _mint(msg.sender, initialSupply);
    }
}

//Token can be imported to Metamask once it has deployed with the contract address:
//0xcf88E29D8B447aac9BCe585314de741D4c331002
//Can be checked in Etherscan

//Token can be added to a liquidity pool, an exchange platform:
//https://uniswap.org/
//Can be sold, put on the market.
//Create Pool and add the Token.
