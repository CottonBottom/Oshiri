//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@quant-finance/solidity-datetime/contracts/DateTime.sol";
import "./OshiriCurrency.sol";
import "./OshiriWrappings.sol";

contract Oshiri is ReentrancyGuard {
    //TODO: Decide price for making new Oshiri
    uint256 public newOshiriPrice = 0.025 ether;
    uint256 public updateOshiriPrice = 0.001 ether;
    uint256 public wrappingCost = 3;
    uint256 public yesterday;

    uint256 private maxColors = 100;
    uint256 private maxSizes = 100;
    uint256 private maxNameLength = 50;
    uint256 private maxTails = 5;
    uint256 private maxTailColors = 10;
    uint256 private maxAvailableConsent = 7;

    struct OshiriStats {
        uint256 color;
        uint256 size;
        string name;
        uint256 tail;
        uint256 tailColor;
        uint256 availableConsent;
        uint256 lastDayAccessed;
        uint256 wornWrapping;
    }

    struct Relationship {
        uint256 currentConsent;
        uint256 timesUsed;
        uint256 lastTimeRedeemed;
    }

    mapping(address => OshiriStats) private AllOshiri;
    mapping(address => mapping(address => Relationship)) private Relationships;
    //Consenter => Receiver => Relationship

    OshiriCurrency private oshiriCurrency;
    OshiriWrappings private oshiriWrappings;

    constructor(address oshiriCurrencyAddress, address oshiriWrappingsAddress) {
        oshiriCurrency = OshiriCurrency(oshiriCurrencyAddress);
        oshiriWrappings = OshiriWrappings(oshiriWrappingsAddress);
    }

    /** External Viewable */
    function getNewOshiriPrice() external view returns (uint256) {
        return newOshiriPrice;
    }

    function getUpdateOshiriPrice() external view returns (uint256) {
        return updateOshiriPrice;
    }

    function getMyOshiri() external view returns (OshiriStats memory) {
        /** Validation */
        require(AllOshiri[msg.sender].color > 0, "Oshiri not existent");
        require(
            oshiriWrappings.balanceOf(msg.sender) >= 1,
            "You have lost your wrapping and cannot access"
        );
        /** */
        return AllOshiri[msg.sender];
    }

    function getOtherOshiri(address oshiri)
        external
        view
        returns (OshiriStats memory, uint256)
    {
        /** Validation */
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
        /** */
        return (
            AllOshiri[oshiri],
            Relationships[oshiri][msg.sender].currentConsent
        );
    }

    function getRelationship(address with)
        external
        view
        returns (Relationship memory)
    {
        /** Validation */
        require(AllOshiri[with].color > 0, "Oshiri not existent");
        require(AllOshiri[msg.sender].color > 0, "You do not have an Oshiri");
        /** */
        return Relationships[msg.sender][with];
    }

    /** */

    /** Events */
    event NewOshiriCreated(address creator, OshiriStats oshiriStats);
    event OshiriUpdated(address creator, OshiriStats oshiriStats);
    event ConsentGenerated(address reciever, uint256 currentConsent);
    event SentConsent(address creator, address receiver);
    event OshiriSmacked(address smacker, address smacked);
    event wearingWrapping(address wearer, uint256 wrappingId);
    event gotWrapping(address oshiri, uint256 wrappingId);

    /** */

    function validateOshiriStats(OshiriStats memory oshiriStats)
        private
        view
        returns (bool)
    {
        bytes memory oshiriName = bytes(oshiriStats.name);
        if (
            //No zero and no more than max
            oshiriStats.color <= 0 ||
            oshiriStats.color > maxColors ||
            oshiriStats.size <= 0 ||
            oshiriStats.size > maxSizes ||
            oshiriName.length == 0 ||
            oshiriName.length > maxNameLength ||
            //No less than zero and no more than max
            oshiriStats.tail < 0 ||
            oshiriStats.tail > maxTails ||
            oshiriStats.tailColor < 0 ||
            oshiriStats.tailColor > maxTailColors ||
            //If tail, require tailColor, if tailColor, require tail
            (oshiriStats.tail > 0 && oshiriStats.tailColor <= 0) ||
            (oshiriStats.tail <= 0 && oshiriStats.tailColor > 0)
        ) {
            return false;
        }
        return true;
    }

    function createOshiri(
        uint256 color,
        uint256 size,
        string memory name,
        uint256 tail,
        uint256 tailColor
    ) external payable nonReentrant {
        OshiriStats memory oshiriStats = OshiriStats(
            color,
            size,
            name,
            tail,
            tailColor,
            //Initial Consent, Today, Zero wrapping
            1,
            block.timestamp,
            0
        );
        bool validOshiriStats = validateOshiriStats(oshiriStats);
        /** Validation */
        require(validOshiriStats == true, "Incorrect stats for Oshiri");
        require(
            AllOshiri[msg.sender].color == 0,
            "Oshiri already exists for this account"
        );
        require(msg.value == newOshiriPrice, "Must pay new Oshiri Price");
        /** */

        AllOshiri[msg.sender] = oshiriStats;
        oshiriCurrency.awardInitialOshiriCurrency(wrappingCost, msg.sender);
        uint256 newWrappingId = spendToCreateWrapping(msg.sender);
        wearWrapping(newWrappingId);
        emit NewOshiriCreated(msg.sender, oshiriStats);
    }

    function wearWrapping(uint256 wrappingId) public {
        /** Validation */
        require(
            oshiriWrappings.ownerOf(wrappingId) == msg.sender,
            "You do not own this wrapping"
        );
        /** */
        AllOshiri[msg.sender].wornWrapping = wrappingId;
        emit wearingWrapping(msg.sender, wrappingId);
    }

    function spendToCreateWrapping(address spender) internal returns (uint256) {
        /** Validation */
        require(
            oshiriCurrency.balanceOf(spender) >= wrappingCost,
            "Not enough OSH to get wrapping"
        );
        /** */
        uint256 newWrappingId = oshiriWrappings.createToken(spender);
        oshiriCurrency.spendOshiriCurrency(spender, wrappingCost);
        emit gotWrapping(msg.sender, newWrappingId);
        return newWrappingId;
    }

    function generateConsent() external {
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
        emit ConsentGenerated(
            msg.sender,
            AllOshiri[msg.sender].availableConsent
        );
    }

    function sendConsent(address receiver) external nonReentrant {
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
        emit SentConsent(msg.sender, receiver);
    }

    function smack(address smacked) external nonReentrant {
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
        emit OshiriSmacked(msg.sender, smacked);
    }

    //TODO: Review numbers for rewards after testing
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
}
