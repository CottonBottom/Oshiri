const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Try to mint OSH from outside Oshiri", function () {
  it("Should fail trying to mint outside Oshiri", async function () {
    //First deploy Oshiri Currency
    const OshiriCurrency = await ethers.getContractFactory("OshiriCurrency");
    const oshiriCurrency = await OshiriCurrency.deploy();
    await oshiriCurrency.deployed();

    const [_, smacker, smacked] = await ethers.getSigners();

    const amount = 3;
    await expect(
      oshiriCurrency
        .connect(smacker)
        .generateOshiriCurrency(amount, smacker.address, smacked.address)
    ).to.be.revertedWith("Can only be called from Oshiri");
  });
});
