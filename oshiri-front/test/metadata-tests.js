const { ethers } = require("hardhat");
//const { fetch } = require("node-fetch");
const { create } = require("ipfs-http-client");

/* Saving Files */
const fs = require("fs");
/* Uploading to IPFS */
//const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
//* Needs to run Daemon
const client = create("http://127.0.0.1:5001/api/v0");

const getReadableBaseData = (wrappingData) => {
  return {
    types: parseInt(wrappingData.wType.toString()),
    subTypes: parseInt(wrappingData.wSubType.toString()),
    variations: parseInt(wrappingData.wVariation.toString()),
    baseColors: parseInt(wrappingData.wBaseColor.toString()),
    secondaryColors: parseInt(wrappingData.wSecondaryColor.toString()),
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

    const allMetaData = [];

    //All start from 1
    for (let indexType = 1; indexType <= readableBaseData.types; indexType++) {
      for (
        let indexSubType = 1;
        indexSubType <= readableBaseData.subTypes;
        indexSubType++
      ) {
        for (
          let indexVariation = 1;
          indexVariation <= readableBaseData.variations;
          indexVariation++
        ) {
          for (
            let indexBaseColor = 1;
            indexBaseColor <= readableBaseData.baseColors;
            indexBaseColor++
          ) {
            for (
              let indexSecondaryColor = 1;
              indexSecondaryColor <= readableBaseData.secondaryColors;
              indexSecondaryColor++
            ) {
              const metaData = JSON.stringify({
                type: {
                  name: wrappingTypes[indexType - 1].name,
                  code: indexType,
                },
                subType: {
                  name: wrappingTypes[indexType - 1].wSubType[indexSubType - 1]
                    .name,
                  code: indexSubType,
                },
                variation: {
                  name: wrappingTypes[indexType - 1].wSubType[indexSubType - 1]
                    .wVariation[indexVariation - 1],
                  code: indexVariation,
                },
                baseColor: {
                  name: wrappingTypes[indexType - 1].wSubType[indexSubType - 1]
                    .wBaseColor[indexBaseColor - 1].name,
                  code: indexBaseColor,
                },
                secondaryColor: {
                  name: wrappingTypes[indexType - 1].wSubType[indexSubType - 1]
                    .wSecondaryColor[indexSecondaryColor - 1].name,
                  code: indexSecondaryColor,
                },
                image: "",
              });
              allMetaData.push({
                fileName: `${indexType}-${indexSubType}-${indexVariation}-${indexBaseColor}-${indexSecondaryColor}`,
                data: metaData,
              });
            }
          }
        }
      }
    }

    //Create MetaData JSON files
    allMetaData.forEach((meta, index) => {
      //* If not loged, the file is created but the data is not added (Process is too fast?)
      console.log("for index:", index, "data:", meta.data);
      saveMetadata(meta.data, meta.fileName);
    });

    const fileName = "test";
    uploadToIPFS(fileName);

    //Upload Images Based on Metadata
  });
});

const uploadToIPFS = async (fileName) => {
  const imageBinary = fs.readFileSync(
    `${__dirname}/../nftMetadata/wrappings/tests/${fileName}.png`
  );
  console.log("THE image binary", imageBinary);

  try {
    const added = await client.add(imageBinary, {
      progress: (prog) => console.log(`received: ${prog}`),
    });
    const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    console.log("URL", url);
  } catch (error) {
    console.log(error);
  }

  // const ipfsUrl = "https://ipfs.infura.io:5001";
  // //const respone =

  // fetch(`${ipfsUrl}/api/v0/add`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: imageBinary,
  // }).then((res) => {
  //   console.log("Request complete! response:", res);
  // });
};

//!Next:
//Later: upload all the metadata files to IPFT (do test with 5 first)
//Later: add the metadata when registering the nft

//Try in Node 16+

const saveMetadata = (data, fileName) => {
  fs.writeFile(`${__dirname}/../nftMetadata/${fileName}.json`, data, (err) => {
    if (err) console.log(err);
    else {
      console.log("File written successfully\n");
    }
  });
};

/** Wrappings */
//TODO: Update with latest from src/

const wrappingTypes = [
  {
    name: "chewingGum",
    wSubType: [
      {
        name: "ball",
        wBaseColor: [
          { name: "blue", value: "black" },
          { name: "green", value: "black" },
          { name: "orange", value: "black" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["plain", "tallWaist", "flames", "pocket"],
      },
      {
        name: "bubble",
        wBaseColor: [
          { name: "blue", value: "black" },
          { name: "red", value: "black" },
          { name: "pink", value: "black" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["plain", "singleStripe", "doubleStripe", "tag"],
      },
      {
        name: "stick",
        wBaseColor: [
          { name: "green", value: "black" },
          { name: "blue", value: "black" },
          { name: "black", value: "black" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["a", "b", "c", "d"],
      },
    ],
  },
  {
    name: "gummies",
    wSubType: [
      {
        name: "nutty",
        wBaseColor: [
          { name: "almond", value: "black" },
          { name: "hazelnut", value: "black" },
          { name: "peanut", value: "black" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["plain", "stripes", "tartan", "dots"],
      },
      {
        name: "fruity",
        wBaseColor: [
          { name: "pineapple", value: "black" },
          { name: "lime", value: "black" },
          { name: "cherry", value: "black" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["plain", "stripes", "dots", "ribbons"],
      },
      {
        name: "milky",
        wBaseColor: [
          { name: "strawberry", value: "black" },
          { name: "coffee", value: "black" },
          { name: "banana", value: "black" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["plain", "panda", "polar", "grizzly"],
      },
    ],
  },
  {
    name: "cottonCandy",
    wSubType: [
      {
        name: "pals",
        wBaseColor: [
          { name: "white", value: "black" },
          { name: "pink", value: "black" },
          { name: "blue", value: "black" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["cat", "rabbit", "dog", "hamster"],
      },
      {
        name: "patterns",
        wBaseColor: [
          { name: "purple", value: "black" },
          { name: "yellow", value: "black" },
          { name: "green", value: "black" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["a", "b", "c", "d"],
      },
      {
        name: "puffy",
        wBaseColor: [
          { name: "cyan", value: "black" },
          { name: "magenta", value: "black" },
          { name: "white", value: "black" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["plain", "ribbons", "dots", "stripes"],
      },
    ],
  },
  {
    name: "licorice",
    wSubType: [
      {
        name: "salty",
        wBaseColor: [
          { name: "black", value: "black" },
          { name: "pink", value: "black" },
          { name: "purple", value: "black" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["plain", "sideTied", "ribbon", "lace"],
      },
      {
        name: "sweet",
        wBaseColor: [
          { name: "red", value: "black" },
          { name: "black", value: "black" },
          { name: "white", value: "black" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["a", "b", "c", "d"],
      },
      {
        name: "sour",
        wBaseColor: [
          { name: "red", value: "black" },
          { name: "green", value: "black" },
          { name: "blue", value: "black" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["plain", "stars", "ribbon", "dots"],
      },
    ],
  },
  {
    name: "chewable",
    wSubType: [
      {
        name: "marshmallow",
        wBaseColor: [
          { name: "classic", value: "black" },
          { name: "colorful", value: "black" },
          { name: "dehydrated", value: "black" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["a", "b", "c", "d"],
      },
      {
        name: "sours",
        wBaseColor: [
          { name: "lemon", value: "black" },
          { name: "cherry", value: "black" },
          { name: "grapefruit", value: "black" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["a", "b", "c", "d"],
      },
      {
        name: "taffy",
        wBaseColor: [
          { name: "fruity", value: "black" },
          { name: "molasses", value: "black" },
          { name: "classic", value: "black" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["a", "b", "c", "d"],
      },
    ],
  },
  {
    name: "caramel",
    wSubType: [
      {
        name: "blackTea",
        wBaseColor: [
          { name: "cream", value: "black" },
          { name: "straight", value: "black" },
          { name: "lemon", value: "black" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["a", "b", "c", "d"],
      },
      {
        name: "greenTea",
        wBaseColor: [
          { name: "matcha", value: "black" },
          { name: "hojicha", value: "black" },
          { name: "genmaicha", value: "black" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["a", "b", "c", "d"],
      },
      {
        name: "milk",
        wBaseColor: [
          { name: "sweet", value: "black" },
          { name: "salty", value: "black" },
          { name: "burnt", value: "black" },
        ],
        wSecondaryColor: [
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
          { name: "TODO", value: "black" },
        ],
        wVariation: ["a", "b", "c", "d"],
      },
    ],
  },
];
