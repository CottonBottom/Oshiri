//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@quant-finance/solidity-datetime/contracts/DateTime.sol";
import "./OshiriCurrency.sol";
import "./OshiriWrappings.sol";

contract Oshiri is ReentrancyGuard {
    uint256 wrappingCost = 3;

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
        //Wrapping Id
        uint256 wornWrapping;
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
    OshiriWrappings private oshiriWrappings;

    //TODO: Price for making new Oshiri
    uint256 newOshiriPrice = 0.025 ether;
    uint256 updateOshiriPrice = 0.001 ether;

    //Handling generating consent
    uint256 public yesterday;

    constructor(address oshiriCurrencyAddress, address oshiriWrappingsAddress) {
        oshiriCurrency = OshiriCurrency(oshiriCurrencyAddress);
        oshiriWrappings = OshiriWrappings(oshiriWrappingsAddress);
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
            block.timestamp,
            0
        );
        bool validOshiriStats = validateOshiriStats(oshiriStats);
        require(validOshiriStats == true, "Incorrect stats for Oshiri");
        require(
            AllOshiri[msg.sender].color == 0,
            "Oshiri already exists for this account"
        );
        require(msg.value == newOshiriPrice, "Must pay new Oshiri Price");

        AllOshiri[msg.sender] = oshiriStats;
        oshiriCurrency.awardInitialOshiriCurrency(wrappingCost, msg.sender);
        uint256 newWrappingId = spendToCreateWrapping(msg.sender);
        wearWrapping(newWrappingId);
        emit NewOshiriCreated(msg.sender, oshiriStats);
    }

    function wearWrapping(uint256 wrappingId) public {
        require(
            oshiriWrappings.ownerOf(wrappingId) == msg.sender,
            "You do not own this wrapping"
        );
        AllOshiri[msg.sender].wornWrapping = wrappingId;
    }

    function spendToCreateWrapping(address spender) internal returns (uint256) {
        require(
            oshiriCurrency.balanceOf(spender) >= wrappingCost,
            "Not enough OSH to get wrapping"
        );
        uint256 newWrappingId = oshiriWrappings.createToken(spender);
        oshiriCurrency.spendOshiriCurrency(spender, wrappingCost);
        return newWrappingId;
    }

    function getMyOshiri() public view returns (OshiriStats memory) {
        require(AllOshiri[msg.sender].color > 0, "Oshiri not existent");
        require(
            oshiriWrappings.balanceOf(msg.sender) >= 1,
            "You have lost your wrapping and cannot access"
        );
        //Needs to be view to return
        return AllOshiri[msg.sender];
    }

    function generateConsent() public {
        /** Validation */
        require(AllOshiri[msg.sender].color > 0, "Oshiri not existent");
        require(
            oshiriWrappings.balanceOf(msg.sender) >= 1,
            "You have lost your wrapping and cannot access"
        );
        uint256 today = block.timestamp;
        require(
            today > AllOshiri[msg.sender].lastDayAccessed + 1 days,
            "A day has not yet passed"
        );
        require(
            AllOshiri[msg.sender].availableConsent < 7,
            "Consent limit reached"
        );
        /** */
        AllOshiri[msg.sender].availableConsent += 1;
        AllOshiri[msg.sender].lastDayAccessed = today;
    }

    event ConsentGiven(address creator, address receiver);

    function sendConsent(address receiver) public {
        require(AllOshiri[msg.sender].color > 0, "Oshiri not existent");
        require(
            oshiriWrappings.balanceOf(msg.sender) >= 1,
            "You have lost your wrapping and cannot access"
        );
        require(
            AllOshiri[msg.sender].availableConsent > 0,
            "No consent available"
        );
        require(AllOshiri[receiver].color > 0, "Receiver Oshiri not existent");
        require(
            oshiriWrappings.balanceOf(receiver) >= 1,
            "The other party hast lost their wrapping and cannot receive consent"
        );
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
        require(
            oshiriWrappings.balanceOf(oshiri) >= 1,
            "The other party hast lost their wrapping and cannot be accessed"
        );
        require(AllOshiri[msg.sender].color > 0, "You do not have an Oshiri");
        require(
            oshiriWrappings.balanceOf(msg.sender) >= 1,
            "You have lost your wrapping and cannot access"
        );
        return (
            AllOshiri[oshiri],
            Relationships[oshiri][msg.sender].currentConsent
        );
    }

    event Smacked(address smacker, address smacked);

    function smack(address smacked) external {
        /** Validation */
        require(AllOshiri[smacked].color > 0, "Oshiri not existent");
        require(
            oshiriWrappings.balanceOf(smacked) >= 1,
            "The other party hast lost their wrapping and cannot be accessed"
        );
        require(AllOshiri[msg.sender].color > 0, "You do not have an Oshiri");
        require(
            oshiriWrappings.balanceOf(msg.sender) >= 1,
            "You have lost your wrapping and cannot access"
        );
        require(
            Relationships[smacked][msg.sender].currentConsent > 0,
            "No consent found, ask for Consent"
        );
        require(
            oshiriWrappings.ownerOf(AllOshiri[smacked].wornWrapping) == smacked,
            "The other party is not the owner of the selected wrapping"
        );
        /** */

        uint256 reward = calculateOSH(AllOshiri[smacked].wornWrapping, smacked);
        oshiriCurrency.generateOshiriCurrency(reward, msg.sender, smacked);

        Relationships[smacked][msg.sender].currentConsent -= 1;
        Relationships[smacked][msg.sender].timesUsed += 1;
        Relationships[smacked][msg.sender].lastTimeRedeemed += block.timestamp;
        emit Smacked(msg.sender, smacked);
    }

    //Calculate won OSH
    function calculateOSH(uint256 wrappingId, address smacked)
        internal
        view
        returns (uint256)
    {
        uint256 reward = 10;
        uint256 day = DateTime.getDayOfWeek(block.timestamp);
        if (oshiriWrappings.getWrapping(wrappingId).wType == day) {
            //Day matches type reward
            reward = reward * 2;
        }
        if (Relationships[smacked][msg.sender].timesUsed == 0) {
            //New relationship reward
            reward = reward * 2;
        }
        return reward;
    }

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
            AllOshiri[msg.sender].lastDayAccessed,
            AllOshiri[msg.sender].wornWrapping
        );
        bool validOshiriStats = validateOshiriStats(oshiriStats);
        require(validOshiriStats == true, "Incorrect stats for Oshiri");
        require(msg.value == updateOshiriPrice, "Must pay new Oshiri Price");

        AllOshiri[msg.sender] = oshiriStats;
        emit OshiriUpdated(msg.sender, oshiriStats);
    }

    //TODO: Get all available Consents
    //TODO: Refactor Contracts
    //TODO: Refactor Tests and do Remaining Tests
}
