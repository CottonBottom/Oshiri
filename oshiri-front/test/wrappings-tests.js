const { expect } = require("chai");
const { ethers } = require("hardhat");

const getReadableWrapping = (newWrapping) => {
  return {
    type: newWrapping.wType.toString(),
    subType: newWrapping.wSubType.toString(),
    variation: newWrapping.wVariation.toString(),
    baseColor: newWrapping.wBaseColor.toString(),
    variationColor: newWrapping.wVariationColor.toString(),
    serialNumber: newWrapping.wSerialNumber.toString(),
  };
};

const getSimplyfiedWrapping = (newWrapping) => {
  return `${newWrapping.wType.toString()}-${newWrapping.wSubType.toString()}-${newWrapping.wVariation.toString()}-${newWrapping.wBaseColor.toString()}-${newWrapping.wVariationColor.toString()}-${newWrapping.wSerialNumber.toString()}`;
};

describe("Discover All Wrappings", function () {
  it.only("Should discover all wrappings and stop when all are finished", async function () {
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
          wrappings.connect(wrappingDiscoverer).createToken()
        ).to.be.revertedWith("All wrappings have been discovered");
      } else {
        const transaction = await wrappings
          .connect(wrappingDiscoverer)
          .createToken();
        const tx = await transaction.wait();
        const event = tx.events[0];
        const value = event.args[0];
        const readableWrapping = getSimplyfiedWrapping(value);
        console.log("The Generated Wrapping", readableWrapping);
        counter += 1;
      }
    }
  });
});
