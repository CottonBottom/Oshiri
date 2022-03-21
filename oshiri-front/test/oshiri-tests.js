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
    const Oshiri = await ethers.getContractFactory("Oshiri");
    const oshiri = await Oshiri.deploy();
    await oshiri.deployed();
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
    const Oshiri = await ethers.getContractFactory("Oshiri");
    const oshiri = await Oshiri.deploy();
    await oshiri.deployed();
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
    ).to.be.revertedWith("A day has not passed");
  });
});

describe("Give Consent", function () {
  it("Should create two Oshiri and one give consent to the other", async function () {
    const Oshiri = await ethers.getContractFactory("Oshiri");
    const oshiri = await Oshiri.deploy();
    await oshiri.deployed();
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
