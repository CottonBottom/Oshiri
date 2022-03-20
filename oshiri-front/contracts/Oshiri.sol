//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Oshiri is ReentrancyGuard {
    struct OshiriStats {
        uint256 color;
        //1 to 100
        uint256 size;
        //1 to 100
        string name;
        uint256 tail;
        //0 to 5
        uint256 tailColor;
        //0 to 10
        uint256 availableConsent;
        //1 to 7
    }

    mapping(address => OshiriStats) private AllOshiri;

    //TODO: Price for making new Oshiri
    uint256 newOshiriPrice = 0.025 ether;

    function getNewOshiriPrice() public view returns (uint256) {
        return newOshiriPrice;
    }

    function validateOshiriStats(OshiriStats memory oshiriStats)
        private
        pure
        returns (bool)
    {
        bytes memory oshiriName = bytes(oshiriStats.name);
        if (
            oshiriStats.color == 0 ||
            oshiriStats.size == 0 ||
            oshiriName.length == 0 ||
            (oshiriStats.tail > 0 && oshiriStats.tailColor == 0) ||
            (oshiriStats.tail == 0 && oshiriStats.tailColor > 0)
        ) {
            return false;
        }
        return true;
    }

    event NewOshiriCreated(address creator, OshiriStats oshiriStats);

    function createOshiri(
        uint256 color,
        uint256 size,
        string memory name,
        uint256 tail,
        uint256 tailColor
    ) public payable nonReentrant {
        OshiriStats memory oshiriStats = OshiriStats(
            color,
            size,
            name,
            tail,
            tailColor,
            1
        );
        bool validOshiriStats = validateOshiriStats(oshiriStats);
        require(validOshiriStats == true, "Incorrect stats for Oshiri");
        require(
            AllOshiri[msg.sender].color == 0,
            "Oshiri already exists for this account"
        );
        require(msg.value == newOshiriPrice, "Must pay new Oshiri Price");

        AllOshiri[msg.sender] = oshiriStats;
        emit NewOshiriCreated(msg.sender, oshiriStats);

        //Create new Wrapping
        //Give Wrapping to msg.sender
    }

    function getOshiriStats() public view returns (OshiriStats memory) {
        require(AllOshiri[msg.sender].color > 0, "Oshiri not existent");
        return AllOshiri[msg.sender];
    }

    function generateConsent() public {
        //Require today is greater than yesterday
        //block.timestamp???
        //Blockchain has no clock as it would mean sync of all the nodes and that would be almost impossible to achieve.
    }

    //Generate Consent
    //Give Consent
    //Smack
    //Get Oshiri Info
    //See Oshiri and Check Consent
    //Get all available Conssents
    //Calculate won OSH
}
