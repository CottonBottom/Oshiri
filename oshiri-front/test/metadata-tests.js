const { ethers } = require("hardhat");
//const { fetch } = require("node-fetch");
const { create } = require("ipfs-http-client");

/* Saving Files */
const fs = require("fs");

/** Upload to IPFS */
//For Testing:
//* Needs to run Daemon
const ipfsUrl = "http://127.0.0.1:5001";
const ipfsUrlReq = "https://ipfs.io";
//Real:
//const ipfsUrl = "https://ipfs.infura.io:5001/"
const client = create(`${ipfsUrl}/api/v0`);

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

//! We don't need the metadata, since the neccesary info is already inside the smart contract
//* We only need to get the image url, this will be generated on Front End
//* However, we need to upload all the parts to IPFS, since they will be used to make the wrappings on front

//1. Upload all images
const imagesPaths = {
  oshiri: ["base", "left", "right"],
  wrappings: ["test", "testvara"],
};

describe("Get all metadata", function () {
  it.only("Should get metadata for all of the available wrappings", async function () {
    /** Upload all images and get Urls */
    const oshiriPromises = imagesPaths.oshiri.map(async (fileName) => {
      const filePath = `oshiri/${fileName}.png`;
      const url = await uploadToIPFS(filePath);
      return { name: fileName, url: url };
    });
    const oshiriUrls = await Promise.all(oshiriPromises);

    const wrappingsPromises = imagesPaths.wrappings.map(async (fileName) => {
      const filePath = `wrappings/${fileName}.png`;
      const url = await uploadToIPFS(filePath);
      return { name: fileName, url: url };
    });
    const wrappingsUrls = await Promise.all(wrappingsPromises);

    /** Save urls data for using in Front */
    const jsonForFront = JSON.stringify({
      oshiri: oshiriUrls,
      wrappings: wrappingsUrls,
    });

    fs.writeFile(
      `${__dirname}/../src/assets/ipfsUrls.json`,
      jsonForFront,
      (err) => {
        if (err) console.log(err);
        else {
          console.log("File written successfully\n");
        }
      }
    );
  });
});

const uploadToIPFS = async (filePath) => {
  const imageBinary = fs.readFileSync(`${__dirname}/../nftParts/${filePath}`);
  console.log("THE image binary", imageBinary);
  try {
    const added = await client.add(imageBinary, {
      progress: (prog) => console.log(`received: ${prog}`),
    });
    const url = `${ipfsUrlReq}/ipfs/${added.path}`;
    return url;
  } catch (error) {
    console.log(error);
    return "error";
  }
};

//2. Save urls in json for frontend to use

// describe("Get all metadata", function () {
//   it("Should get metadata for all of the available wrappings", async function () {
//     const Wrappings = await ethers.getContractFactory("OshiriWrappings");
//     const copiesPerPair = 1;
//     const wrappings = await Wrappings.deploy(copiesPerPair);
//     await wrappings.deployed();
//     const initialAvailableWrappings = await wrappings.checkAvailableWrappings();

//     const allBaseData = await wrappings.getAllBaseData();
//     const readableBaseData = getReadableBaseData(allBaseData);

//     console.log(
//       "The initial available wrappings",
//       parseInt(initialAvailableWrappings.toString())
//     );
//     console.log("The allBaseData available wrappings", readableBaseData);

//     const allMetaData = [];

//     //All start from 1
//     for (let indexType = 1; indexType <= readableBaseData.types; indexType++) {
//       for (
//         let indexSubType = 1;
//         indexSubType <= readableBaseData.subTypes;
//         indexSubType++
//       ) {
//         for (
//           let indexVariation = 1;
//           indexVariation <= readableBaseData.variations;
//           indexVariation++
//         ) {
//           for (
//             let indexBaseColor = 1;
//             indexBaseColor <= readableBaseData.baseColors;
//             indexBaseColor++
//           ) {
//             for (
//               let indexSecondaryColor = 1;
//               indexSecondaryColor <= readableBaseData.secondaryColors;
//               indexSecondaryColor++
//             ) {
//               //MetaData salva solamente los codigos porque solo estos se pueden validar en el contract
//               const metaData = JSON.stringify({
//                 type: indexType,
//                 subType: indexSubType,
//                 variation: indexVariation,
//                 baseColor: indexBaseColor,
//                 secondaryColor: indexSecondaryColor,
//                 image: "",
//               });
//               allMetaData.push({
//                 fileName: `${indexType}-${indexSubType}-${indexVariation}-${indexBaseColor}-${indexSecondaryColor}`,
//                 data: metaData,
//               });
//             }
//           }
//         }
//       }
//     }

//     //Create MetaData JSON files
//     // allMetaData.forEach((meta, index) => {
//     //   //* If not loged, the file is created but the data is not added (Process is too fast?)
//     //   console.log("for index:", index, "data:", meta.data);
//     //   saveMetadata(meta.data, meta.fileName);
//     // });

//     const fileName = "test";
//     const url = await uploadToIPFS(fileName);

//     console.log("THE URL", url);

//     //Upload Images Based on Metadata

//     //The metadata and image are uploaded on Front end when NFT is created
//     //1. Image will be assembled with parts, the data is
//   });
// });

//!Next:
//Later: add the metadata when registering the nft
