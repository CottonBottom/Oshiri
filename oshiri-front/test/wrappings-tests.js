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

const getReadableBaseData = (wrappingData) => {
  return {
    types: parseInt(wrappingData.wType.toString()),
    subTypes: parseInt(wrappingData.wSubType.toString()),
    variations: parseInt(wrappingData.wVariation.toString()),
    baseColors: parseInt(wrappingData.wBaseColor.toString()),
    variationColors: parseInt(wrappingData.wSecondaryColor.toString()),
    serialNumbers: parseInt(wrappingData.wSerialNumber.toString()),
  };
};

describe("Get all metadata", function () {
  it.only("Should get metadata for all of the available wrappings", async function () {
    const Wrappings = await ethers.getContractFactory("OshiriWrappings");
    const copiesPerPair = 1;
    const wrappings = await Wrappings.deploy(copiesPerPair);
    await wrappings.deployed();
    const initialAvailableWrappings = await wrappings.checkAvailableWrappings();

    const allBaseData = await wrappings.getAllBaseData();
    const readableBaseData = getReadableBaseData(allBaseData);

    console.log(
      "The initial available wrappings",
      parseInt(initialAvailableWrappings.toString())
    );
    console.log("The allBaseData available wrappings", readableBaseData);

    for (let indexType = 0; indexType < readableBaseData.types; indexType++) {
      for (
        let indexSubType = 0;
        indexSubType < readableBaseData.subTypes;
        indexSubType++
      ) {
        for (
          let indexVariation = 0;
          indexVariation < readableBaseData.variations;
          indexVariation++
        ) {
          for (
            let indexBaseColor = 0;
            indexBaseColor < readableBaseData.variationColors;
            indexBaseColor++
          ) {
            for (
              let indexVariationColor = 0;
              indexVariationColor < readableBaseData.serialNumbers;
              indexVariationColor++
            ) {
              const metaData = JSON.stringify({
                type: indexType,
                subType: indexSubType,
                variation: indexVariation,
                baseColor: indexBaseColor,
                variationColor: indexVariationColor,
              });
              const fileName = `${indexType}-${indexSubType}-${indexVariation}-${indexBaseColor}-${indexVariationColor}`;
              saveMetadata(metaData, fileName);
            }
          }
        }
      }
    }
  });
});

/** Save the file */
const fs = require("fs");

//!Next: Make metadata for all possible combinations
//!First make the array of objects send to saveMetadata and make stream with everything first (?)
//!Then have it write all the json files
//Later: upload all the metadata files to IPFT (do test with 5 first)
//Later: add the metadata when registering the nft

//https://stackoverflow.com/questions/48442773/how-to-write-a-json-array-to-a-file-with-node-js-writestream
const saveMetadata = (data, fileName) => {
  // fs.writeFile(__dirname + `/../nftMetadata/${fileName}.json`, data, (err) => {
  //   if (err) console.log(err);
  //   else {
  //     console.log("File written successfully\n");
  //   }
  // });

  let writeStream = fs.createWriteStream("secret.txt");

  // write some data with a base64 encoding
  writeStream.write(data, "base64");

  // the finish event is emitted when all data has been flushed from the stream
  writeStream.on("finish", () => {
    console.log("wrote all data to file");
  });

  // close the stream
  writeStream.end();
};
