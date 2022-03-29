const { expect } = require("chai");
const { ethers } = require("hardhat");

describe.skip("Generate OSH and give to both parties from Oshiri Contract", function () {
  it("Should give new OSH to involved parties", async function () {
    //First deploy Oshiri Currency
    const OshiriCurrency = await ethers.getContractFactory("OshiriCurrency");
    const oshiriCurrency = await OshiriCurrency.deploy();
    await oshiriCurrency.deployed();

    //Then deploy Oshiri and pass Oshiri Currency
    const Oshiri = await ethers.getContractFactory("Oshiri");
    const oshiri = await Oshiri.deploy(oshiriCurrency.address);
    await oshiri.deployed();

    //Set Oshiri address in currency once its deployed
    await oshiriCurrency.setOshiriGameAddress(oshiri.address);

    const [_, smacker, smacked] = await ethers.getSigners();

    const startingBalance = await oshiriCurrency.balanceOf(smacker.address);
    console.log("starting balance", startingBalance);

    const amount = 3;
    await oshiri
      .connect(smacker)
      .smack(amount, smacker.address, smacked.address);

    //Will fail because lacks consent

    const postBalance = await oshiriCurrency.balanceOf(smacker.address);
    console.log("post balance", postBalance);

    expect(postBalance).to.equal(amount.toString());
  });
});

describe.skip("Try to mint OSH from outside Oshiri", function () {
  it("Should fail trying to mint outside Oshiri", async function () {
    //First deploy Oshiri Currency
    const OshiriCurrency = await ethers.getContractFactory("OshiriCurrency");
    const oshiriCurrency = await OshiriCurrency.deploy();
    await oshiriCurrency.deployed();

    //Then deploy Oshiri and pass Oshiri Currency
    const Oshiri = await ethers.getContractFactory("Oshiri");
    const oshiri = await Oshiri.deploy(oshiriCurrency.address);
    await oshiri.deployed();

    //Set Oshiri address in currency once its deployed
    await oshiriCurrency.setOshiriGameAddress(oshiri.address);

    const [_, smacker, smacked] = await ethers.getSigners();

    const amount = 3;
    await expect(
      oshiriCurrency
        .connect(smacker)
        .generateOshiriCurrency(amount, smacker.address, smacked.address)
    ).to.be.revertedWith("Can only be called from Oshiri");
  });
});
