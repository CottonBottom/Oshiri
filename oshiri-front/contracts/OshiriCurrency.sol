// contracts/OurToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OshiriCurrency is ERC20, Ownable {
    address private oshiriGame;

    constructor() ERC20("Oshiri", "OSH") {
        _mint(msg.sender, 69);
    }

    function setOshiriGameAddress(address oshiriGameAddress)
        external
        onlyOwner
    {
        oshiriGame = oshiriGameAddress;
    }

    function generateOshiriCurrency(
        uint256 amount,
        address recipientA,
        address recipientB
    ) external {
        require(msg.sender == oshiriGame, "Can only be called from Oshiri");
        _mint(recipientA, amount);
        _mint(recipientB, amount);
    }

    function awardInitialOshiriCurrency(uint256 amount, address recipientA)
        external
    {
        require(msg.sender == oshiriGame, "Can only be called from Oshiri");
        _mint(recipientA, amount);
    }

    function spendOshiriCurrency(address spender, uint256 amount) public {
        _burn(spender, amount);
    }
}
