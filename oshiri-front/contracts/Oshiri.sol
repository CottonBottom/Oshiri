//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./OshiriCurrency.sol";

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
        uint256 lastDayAccessed;
    }

    struct Relationship {
        uint256 currentConsent;
        uint256 timesUsed;
        uint256 lastTimeRedeemed;
    }

    struct Consenters {
        address consenter;
        uint256 currentConsent;
    }

    mapping(address => OshiriStats) private AllOshiri;
    mapping(address => mapping(address => Relationship)) private Relationships;
    //Consentee => Receiver => Relationship info

    OshiriCurrency private oshiriCurrency;

    //TODO: Price for making new Oshiri
    uint256 newOshiriPrice = 0.025 ether;
    uint256 updateOshiriPrice = 0.001 ether;

    //Handling generating consent
    uint256 public yesterday;

    constructor(address oshiriCurrencyAddress) {
        oshiriCurrency = OshiriCurrency(oshiriCurrencyAddress);
    }

    function getNewOshiriPrice() public view returns (uint256) {
        return newOshiriPrice;
    }

    function getUpdateOshiriPrice() public view returns (uint256) {
        return updateOshiriPrice;
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
            1,
            block.timestamp
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

        //Give OSH to sender
        //Create new Wrapping (use OSH given)
        //Give Wrapping to msg.sender
    }

    function getMyOshiri() public view returns (OshiriStats memory) {
        require(AllOshiri[msg.sender].color > 0, "Oshiri not existent");
        //generateConsent();
        return AllOshiri[msg.sender];
    }

    function generateConsent() public {
        uint256 today = block.timestamp;
        require(
            today > AllOshiri[msg.sender].lastDayAccessed + 1 days,
            "A day has not passed"
        );
        require(
            AllOshiri[msg.sender].availableConsent < 7,
            "Consent limit reached"
        );
        AllOshiri[msg.sender].availableConsent += 1;
        AllOshiri[msg.sender].lastDayAccessed = today;
    }

    event ConsentGiven(address creator, address receiver);

    function sendConsent(address receiver) public {
        require(AllOshiri[msg.sender].color > 0, "Oshiri not existent");
        require(
            AllOshiri[msg.sender].availableConsent > 0,
            "No consent available"
        );
        require(AllOshiri[receiver].color > 0, "Receiver Oshiri not existent");
        AllOshiri[msg.sender].availableConsent -= 1;
        Relationships[msg.sender][receiver].currentConsent += 1;
        emit ConsentGiven(msg.sender, receiver);
    }

    function seeOshiri(address oshiri)
        public
        view
        returns (OshiriStats memory, uint256)
    {
        require(AllOshiri[oshiri].color > 0, "Oshiri not existent");
        require(AllOshiri[msg.sender].color > 0, "You do not have an Oshiri");
        return (
            AllOshiri[oshiri],
            Relationships[oshiri][msg.sender].currentConsent
        );
    }

    event Smacked(address smacker, address smacked);

    function smack(
        uint256 amount,
        address smacker,
        address smacked
    ) public {
        oshiriCurrency.generateOshiriCurrency(amount, smacker, smacked);
        emit Smacked(msg.sender, smacked);
    }

    //TODO: Tests after Token and NFT
    /** 
    function smack(address smacked, address smackedWrapping) public {
        require(
            Relationships[smacked][msg.sender].currentConsent > 0,
            "No consent found, ask for Consent"
        );

        uint256 reward = calculateOSH(
            smackedWrapping,
            Relationships[smacked][msg.sender]
        );

        //Send to smacker and smacked
        oshiriCurrency.transfer(msg.sender, reward);
        oshiriCurrency.transfer(smacked, reward);

        Relationships[smacked][msg.sender].currentConsent -= 1;
        Relationships[smacked][msg.sender].timesUsed += 1;
        Relationships[smacked][msg.sender].lastTimeRedeemed += block.timestamp;
        emit Smacked(msg.sender, smacked);
    }

    //Calculate won OSH
    function calculateOSH(
        address smackedWrapping,
        Relationship memory relationship
    ) private returns (uint256) {
        //Todo: logic
        //Calculate OSH depending on worn NFT and day
        //Calculate OSH depending on new Relationship
        return 10;
    }
    */

    event OshiriUpdated(address creator, OshiriStats oshiriStats);

    function updateOshiri(
        uint256 color,
        uint256 size,
        string memory name,
        uint256 tail,
        uint256 tailColor
    ) public payable nonReentrant {
        require(AllOshiri[msg.sender].color > 0, "Oshiri not yet existent");
        OshiriStats memory oshiriStats = OshiriStats(
            color,
            size,
            name,
            tail,
            tailColor,
            AllOshiri[msg.sender].availableConsent,
            AllOshiri[msg.sender].lastDayAccessed
        );
        bool validOshiriStats = validateOshiriStats(oshiriStats);
        require(validOshiriStats == true, "Incorrect stats for Oshiri");
        require(msg.value == updateOshiriPrice, "Must pay new Oshiri Price");

        AllOshiri[msg.sender] = oshiriStats;
        emit OshiriUpdated(msg.sender, oshiriStats);
    }

    //Get all available Consents
}
