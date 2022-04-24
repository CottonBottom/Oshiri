const { expect } = require("chai");
const { ethers } = require("hardhat");

const getReadableWrapping = (newWrapping) => {
  return {
    type: newWrapping.wType.toString(),
    subType: newWrapping.wSubType.toString(),
    variation: newWrapping.wVariation.toString(),
    baseColor: newWrapping.wBaseColor.toString(),
    variationColor: newWrapping.wSecondaryColor.toString(),
    serialNumber: newWrapping.wSerialNumber.toString(),
  };
};

const getSimplyfiedWrapping = (newWrapping) => {
  return `${newWrapping.wType.toString()}-${newWrapping.wSubType.toString()}-${newWrapping.wVariation.toString()}-${newWrapping.wBaseColor.toString()}-${newWrapping.wSecondaryColor.toString()}-${newWrapping.wSerialNumber.toString()}`;
};

describe.skip("Discover All Wrappings", function () {
  it("Should discover all wrappings and stop when all are finished", async function () {
    const Wrappings = await ethers.getContractFactory("OshiriWrappings");
    //Testing with only 3 copies for each
    const copiesPerPair = 3;
    const totalWrappings = 6 * 3 * 4 * 3 * 6 * copiesPerPair;

    const wrappings = await Wrappings.deploy(copiesPerPair);
    await wrappings.deployed();

    let counter = 1;

    const [_, wrappingDiscoverer] = await ethers.getSigners();

    for (let index = 0; index < counter; index++) {
      console.log("Current counter:", counter);

      if (counter > totalWrappings) {
        await expect(
          wrappings
            .connect(wrappingDiscoverer)
            .createTokenTestOnly(wrappingDiscoverer.address)
        ).to.be.revertedWith("All wrappings have been discovered");
      } else {
        const transaction = await wrappings
          .connect(wrappingDiscoverer)
          .createTokenTestOnly(wrappingDiscoverer.address);
        const tx = await transaction.wait();
        const event = tx.events[1];
        const value = event.args[0];
        const readableWrapping = getSimplyfiedWrapping(value);
        console.log("The Generated Wrapping", readableWrapping);
        counter += 1;
      }
    }
  });
});

describe("Return Available Wrappings", function () {
  it("Should return available wrappings", async function () {
    const Wrappings = await ethers.getContractFactory("OshiriWrappings");
    const copiesPerPair = 100;
    const totalWrappings = 6 * 3 * 4 * 3 * 6 * copiesPerPair;

    const wrappings = await Wrappings.deploy(copiesPerPair);
    await wrappings.deployed();

    //Make 3 Wrappings
    let counter = 3;

    const [_, wrappingDiscoverer] = await ethers.getSigners();

    for (let index = 0; index < counter; index++) {
      console.log("Current counter:", counter);
      const transaction = await wrappings
        .connect(wrappingDiscoverer)
        .createTokenTestOnly(wrappingDiscoverer.address);
      const tx = await transaction.wait();
      const event = tx.events[1];
      const value = event.args[0];
      const readableWrapping = getSimplyfiedWrapping(value);
      console.log("The Generated Wrapping", readableWrapping);
    }

    const availableWrappings = await wrappings
      .connect(wrappingDiscoverer)
      .checkAvailableWrappings();

    console.log(
      "The available wrappings",
      parseInt(availableWrappings.toString())
    );

    expect(parseInt(availableWrappings.toString())).to.equal(
      totalWrappings - counter
    );
  });
});

//TODO: Test transaction with Royalties management
describe("Update Royalties", function () {
  it("Should update Royalties from 10 to 3 percent", async function () {
    const Wrappings = await ethers.getContractFactory("OshiriWrappings");
    const copiesPerPair = 100;
    const wrappings = await Wrappings.deploy(copiesPerPair);
    await wrappings.deployed();

    const [_, wrappingDiscoverer] = await ethers.getSigners();
    const transaction = await wrappings.setRoyalties(
      wrappingDiscoverer.address,
      300
    );
    const tx = await transaction.wait();
    console.log("THE TX", tx);
  });
});

describe("Update Types", function () {
  it("Should update the types and return more available wrappings", async function () {
    const Wrappings = await ethers.getContractFactory("OshiriWrappings");
    const copiesPerPair = 100;
    const wrappings = await Wrappings.deploy(copiesPerPair);
    await wrappings.deployed();
    const initialAvailableWrappings = await wrappings.checkAvailableWrappings();

    console.log(
      "The initial available wrappings",
      parseInt(initialAvailableWrappings.toString())
    );

    await wrappings.addCombinations(0, 1, 0, 0, 0);
    const newAvailableWrappings = await wrappings.checkAvailableWrappings();

    console.log(
      "The available wrappings",
      parseInt(newAvailableWrappings.toString())
    );
  });
});
