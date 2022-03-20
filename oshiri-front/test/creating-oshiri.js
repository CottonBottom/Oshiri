const { expect } = require("chai");
const { ethers } = require("hardhat");

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

    const createdOshiri = await oshiri.getOshiriStats(
      oshiriCreatorAddress.address
    );

    const readableOshiri = {
      color: createdOshiri.color.toString(),
      size: createdOshiri.size.toString(),
      string: createdOshiri.name.toString(),
      tail: createdOshiri.tail.toString(),
      tailColor: createdOshiri.tailColor.toString(),
      availableConsent: createdOshiri.availableConsent.toString(),
    };

    console.log("The created oshiri:", readableOshiri);
  });
});
