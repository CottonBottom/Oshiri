// contracts/OurToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OshiriCurrency is ERC20, Ownable {
    address oshiriGame;

    constructor() ERC20("Oshiri", "OSH") {
        _mint(msg.sender, 69000000000000000000);
    }

    function setOshiriGameAddress(address oshiriGameAddress) public onlyOwner {
        oshiriGame = oshiriGameAddress;
    }

    function generateOshiriCurrency(
        uint256 amount,
        address recipientA,
        address recipientB
    ) public {
        require(msg.sender == oshiriGame);
        uint256 amountToDecimals = (amount * 10) ^ 18;
        _mint(recipientA, amountToDecimals);
        _mint(recipientB, amountToDecimals);
    }
}
