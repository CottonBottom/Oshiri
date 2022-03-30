const { expect } = require("chai");
const { ethers } = require("hardhat");

const getReadableOshiri = (createdOshiri) => {
  const dateInSeconds = parseInt(createdOshiri.lastDayAccessed.toString());
  const formattedDate = new Date(dateInSeconds * 1000).toISOString();
  return {
    color: createdOshiri.color.toString(),
    size: createdOshiri.size.toString(),
    string: createdOshiri.name.toString(),
    tail: createdOshiri.tail.toString(),
    tailColor: createdOshiri.tailColor.toString(),
    availableConsent: createdOshiri.availableConsent.toString(),
    lastDayAccessed: formattedDate,
  };
};

describe("Create Oshiri", function () {
  it("Should create a new Oshiri with correct description", async function () {
    //First deploy Oshiri Currency
    const OshiriCurrency = await ethers.getContractFactory("OshiriCurrency");
    const oshiriCurrency = await OshiriCurrency.deploy();
    await oshiriCurrency.deployed();

    //Then deploy Oshiri Wrappings
    const OshiriWrappings = await ethers.getContractFactory("OshiriWrappings");
    const copiesPerPair = 100;
    const oshiriWrappings = await OshiriWrappings.deploy(copiesPerPair);
    await oshiriWrappings.deployed();

    //Then deploy Oshiri and pass Oshiri Currency
    const Oshiri = await ethers.getContractFactory("Oshiri");
    const oshiri = await Oshiri.deploy(
      oshiriCurrency.address,
      oshiriWrappings.address
    );
    await oshiri.deployed();

    //Set Oshiri address in currency and wrappings once its deployed
    await oshiriCurrency.setOshiriGameAddress(oshiri.address);
    await oshiriWrappings.setOshiriGameAddress(oshiri.address);

    const newOshiriPrice = await oshiri.getNewOshiriPrice();
    const oshiriTest = {
      color: 1,
      size: 2,
      name: "Cool Oshiri",
      tail: 0,
      tailColor: 0,
    };

    const [_, oshiriCreatorAddress] = await ethers.getSigners();

    await oshiri
      .connect(oshiriCreatorAddress)
      .createOshiri(
        oshiriTest.color,
        oshiriTest.size,
        oshiriTest.name,
        oshiriTest.tail,
        oshiriTest.tailColor,
        { value: newOshiriPrice.toString() }
      );

    const createdOshiri = await oshiri
      .connect(oshiriCreatorAddress)
      .getMyOshiri();

    const readableOshiri = getReadableOshiri(createdOshiri);
    console.log("The created oshiri:", readableOshiri);
  });
});

describe("Generate Consent", function () {
  it("Should revert because one day has not passed", async function () {
    //First deploy Oshiri Currency
    const OshiriCurrency = await ethers.getContractFactory("OshiriCurrency");
    const oshiriCurrency = await OshiriCurrency.deploy();
    await oshiriCurrency.deployed();

    //Then deploy Oshiri Wrappings
    const OshiriWrappings = await ethers.getContractFactory("OshiriWrappings");
    const copiesPerPair = 100;
    const oshiriWrappings = await OshiriWrappings.deploy(copiesPerPair);
    await oshiriWrappings.deployed();

    //Then deploy Oshiri and pass Oshiri Currency
    const Oshiri = await ethers.getContractFactory("Oshiri");
    const oshiri = await Oshiri.deploy(
      oshiriCurrency.address,
      oshiriWrappings.address
    );
    await oshiri.deployed();

    //Set Oshiri address in currency and wrappings once its deployed
    await oshiriCurrency.setOshiriGameAddress(oshiri.address);
    await oshiriWrappings.setOshiriGameAddress(oshiri.address);

    const newOshiriPrice = await oshiri.getNewOshiriPrice();
    const oshiriTest = {
      color: 1,
      size: 2,
      name: "Cool Oshiri",
      tail: 0,
      tailColor: 0,
    };

    const [_, oshiriCreatorAddress] = await ethers.getSigners();

    await oshiri
      .connect(oshiriCreatorAddress)
      .createOshiri(
        oshiriTest.color,
        oshiriTest.size,
        oshiriTest.name,
        oshiriTest.tail,
        oshiriTest.tailColor,
        { value: newOshiriPrice.toString() }
      );

    const createdOshiri = await oshiri
      .connect(oshiriCreatorAddress)
      .getMyOshiri();

    const readableOshiri = getReadableOshiri(createdOshiri);
    console.log("The created oshiri:", readableOshiri);

    await expect(
      oshiri.connect(oshiriCreatorAddress).generateConsent()
    ).to.be.revertedWith("A day has not yet passed");
  });
});

describe("Give Consent", function () {
  it("Should create two Oshiri and one give consent to the other", async function () {
    //First deploy Oshiri Currency
    const OshiriCurrency = await ethers.getContractFactory("OshiriCurrency");
    const oshiriCurrency = await OshiriCurrency.deploy();
    await oshiriCurrency.deployed();

    //Then deploy Oshiri Wrappings
    const OshiriWrappings = await ethers.getContractFactory("OshiriWrappings");
    const copiesPerPair = 100;
    const oshiriWrappings = await OshiriWrappings.deploy(copiesPerPair);
    await oshiriWrappings.deployed();

    //Then deploy Oshiri and pass Oshiri Currency
    const Oshiri = await ethers.getContractFactory("Oshiri");
    const oshiri = await Oshiri.deploy(
      oshiriCurrency.address,
      oshiriWrappings.address
    );
    await oshiri.deployed();

    //Set Oshiri address in currency and wrappings once its deployed
    await oshiriCurrency.setOshiriGameAddress(oshiri.address);
    await oshiriWrappings.setOshiriGameAddress(oshiri.address);

    const newOshiriPrice = await oshiri.getNewOshiriPrice();
    const consenteeOshiri = {
      color: 1,
      size: 2,
      name: "Consenter Oshiri",
      tail: 0,
      tailColor: 0,
    };
    const receiverOshiri = {
      color: 5,
      size: 3,
      name: "Receiver Oshiri",
      tail: 1,
      tailColor: 2,
    };

    const [_, consenterAddress, receiverAddress] = await ethers.getSigners();

    await oshiri
      .connect(consenterAddress)
      .createOshiri(
        consenteeOshiri.color,
        consenteeOshiri.size,
        consenteeOshiri.name,
        consenteeOshiri.tail,
        consenteeOshiri.tailColor,
        { value: newOshiriPrice.toString() }
      );

    await oshiri
      .connect(receiverAddress)
      .createOshiri(
        receiverOshiri.color,
        receiverOshiri.size,
        receiverOshiri.name,
        receiverOshiri.tail,
        receiverOshiri.tailColor,
        { value: newOshiriPrice.toString() }
      );

    const createdConsenterOshiri = await oshiri
      .connect(consenterAddress)
      .getMyOshiri();

    const createdReceiverOshiri = await oshiri
      .connect(receiverAddress)
      .getMyOshiri();

    const consenterReadableOshiri = getReadableOshiri(createdConsenterOshiri);
    const receiverReadableOshiri = getReadableOshiri(createdReceiverOshiri);

    console.log("The consenter oshiri:", consenterReadableOshiri);
    console.log("The receiver oshiri:", receiverReadableOshiri);

    const seeOshiriBefore = await oshiri
      .connect(receiverAddress)
      .seeOshiri(consenterAddress.address);

    expect(seeOshiriBefore[0].availableConsent.toString()).to.equal("1");
    expect(seeOshiriBefore[1].toString()).to.equal("0");

    await oshiri.connect(consenterAddress).sendConsent(receiverAddress.address);

    const seeOshiriAfter = await oshiri
      .connect(receiverAddress)
      .seeOshiri(consenterAddress.address);

    expect(seeOshiriAfter[0].availableConsent.toString()).to.equal("0");
    expect(seeOshiriAfter[1].toString()).to.equal("1");
  });
});

describe("Update Oshiri", function () {
  it("Should update a Oshiri after creation", async function () {
    //First deploy Oshiri Currency
    const OshiriCurrency = await ethers.getContractFactory("OshiriCurrency");
    const oshiriCurrency = await OshiriCurrency.deploy();
    await oshiriCurrency.deployed();

    //Then deploy Oshiri Wrappings
    const OshiriWrappings = await ethers.getContractFactory("OshiriWrappings");
    const copiesPerPair = 100;
    const oshiriWrappings = await OshiriWrappings.deploy(copiesPerPair);
    await oshiriWrappings.deployed();

    //Then deploy Oshiri and pass Oshiri Currency
    const Oshiri = await ethers.getContractFactory("Oshiri");
    const oshiri = await Oshiri.deploy(
      oshiriCurrency.address,
      oshiriWrappings.address
    );
    await oshiri.deployed();

    //Set Oshiri address in currency and wrappings once its deployed
    await oshiriCurrency.setOshiriGameAddress(oshiri.address);
    await oshiriWrappings.setOshiriGameAddress(oshiri.address);

    const newOshiriPrice = await oshiri.getNewOshiriPrice();
    const oshiriTest = {
      color: 1,
      size: 2,
      name: "Cool Oshiri",
      tail: 0,
      tailColor: 0,
    };

    const [_, oshiriCreatorAddress] = await ethers.getSigners();

    await oshiri
      .connect(oshiriCreatorAddress)
      .createOshiri(
        oshiriTest.color,
        oshiriTest.size,
        oshiriTest.name,
        oshiriTest.tail,
        oshiriTest.tailColor,
        { value: newOshiriPrice.toString() }
      );

    const createdOshiri = await oshiri
      .connect(oshiriCreatorAddress)
      .getMyOshiri();

    const readableOshiri = getReadableOshiri(createdOshiri);
    console.log("The created oshiri:", readableOshiri);

    //Update
    const updateOshiriPrice = await oshiri.getUpdateOshiriPrice();

    const newOshiri = {
      color: 4,
      size: 10,
      name: "The Coolest Oshiri",
      tail: 2,
      tailColor: 5,
    };

    await oshiri
      .connect(oshiriCreatorAddress)
      .updateOshiri(
        newOshiri.color,
        newOshiri.size,
        newOshiri.name,
        newOshiri.tail,
        newOshiri.tailColor,
        { value: updateOshiriPrice.toString() }
      );

    const updatedOshiri = await oshiri
      .connect(oshiriCreatorAddress)
      .getMyOshiri();

    const readableUpdatedOshiri = getReadableOshiri(updatedOshiri);
    console.log("The updated oshiri:", readableUpdatedOshiri);
  });
});

describe("Smacking", function () {
  it("Should spend consent to smack oshiri and recieve rewards", async function () {
    //First deploy Oshiri Currency
    const OshiriCurrency = await ethers.getContractFactory("OshiriCurrency");
    const oshiriCurrency = await OshiriCurrency.deploy();
    await oshiriCurrency.deployed();

    //Then deploy Oshiri Wrappings
    const OshiriWrappings = await ethers.getContractFactory("OshiriWrappings");
    const copiesPerPair = 100;
    const oshiriWrappings = await OshiriWrappings.deploy(copiesPerPair);
    await oshiriWrappings.deployed();

    //Then deploy Oshiri and pass Oshiri Currency
    const Oshiri = await ethers.getContractFactory("Oshiri");
    const oshiri = await Oshiri.deploy(
      oshiriCurrency.address,
      oshiriWrappings.address
    );
    await oshiri.deployed();

    //Set Oshiri address in currency and wrappings once its deployed
    await oshiriCurrency.setOshiriGameAddress(oshiri.address);
    await oshiriWrappings.setOshiriGameAddress(oshiri.address);

    const newOshiriPrice = await oshiri.getNewOshiriPrice();
    const consenteeOshiri = {
      color: 1,
      size: 2,
      name: "Consenter Oshiri",
      tail: 0,
      tailColor: 0,
    };
    const receiverOshiri = {
      color: 5,
      size: 3,
      name: "Receiver Oshiri",
      tail: 1,
      tailColor: 2,
    };

    const [_, consenter, receiver] = await ethers.getSigners();

    const ownedWrappingsBefore = await oshiriWrappings.balanceOf(
      receiver.address
    );
    console.log("Owned Wrappings", ownedWrappingsBefore);

    await oshiri
      .connect(consenter)
      .createOshiri(
        consenteeOshiri.color,
        consenteeOshiri.size,
        consenteeOshiri.name,
        consenteeOshiri.tail,
        consenteeOshiri.tailColor,
        { value: newOshiriPrice.toString() }
      );

    await oshiri
      .connect(receiver)
      .createOshiri(
        receiverOshiri.color,
        receiverOshiri.size,
        receiverOshiri.name,
        receiverOshiri.tail,
        receiverOshiri.tailColor,
        { value: newOshiriPrice.toString() }
      );

    const ownedWrappingsAfter = await oshiriWrappings.balanceOf(
      receiver.address
    );
    console.log("Owned Wrappings", ownedWrappingsAfter);

    const createdConsenterOshiri = await oshiri
      .connect(consenter)
      .getMyOshiri();

    const createdReceiverOshiri = await oshiri.connect(receiver).getMyOshiri();

    const consenterReadableOshiri = getReadableOshiri(createdConsenterOshiri);
    const receiverReadableOshiri = getReadableOshiri(createdReceiverOshiri);

    console.log("The consenter oshiri:", consenterReadableOshiri);
    console.log("The receiver oshiri:", receiverReadableOshiri);

    const startingBalance = await oshiriCurrency.balanceOf(receiver.address);
    console.log("starting balance", startingBalance);

    await oshiri.connect(consenter).sendConsent(receiver.address);

    //Get Smacked NFT
    // const smackedWrappingId = await oshiriWrappings.balanceOf(
    //   consenter.address
    // );

    await oshiri.connect(receiver).smack(consenter.address, 0);

    const lastBalance = await oshiriCurrency.balanceOf(receiver.address);
    console.log("last balance", lastBalance);

    //TODO: Calculate the OSH according to logic of days vs NFT
  });
});
