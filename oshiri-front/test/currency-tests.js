const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Generate OSH and give to both parties from Oshiri Contract", function () {
  it.only("Should give new OSH to involved parties", async function () {
    const OshiriCurrency = await ethers.getContractFactory("OshiriCurrency");
    const oshiriCurrency = await OshiriCurrency.deploy();
    await oshiriCurrency.deployed();

    const Oshiri = await ethers.getContractFactory("Oshiri");
    const oshiri = await Oshiri.deploy(oshiriCurrency.address);
    await oshiri.deployed();

    await oshiriCurrency.setOshiriGameAddress(oshiri.address);

    const [_, smacker, smacked] = await ethers.getSigners();

    const amount = 3;

    const transaction = await oshiri
      .connect(smacker)
      .smack(amount, smacker.address, smacked.address);

    const tx = await transaction.wait();
    console.log("THE TX", tx);
  });
});
