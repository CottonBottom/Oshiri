const { ethers } = require("hardhat");
//const { fetch } = require("node-fetch");
const { create } = require("ipfs-http-client");

/* Saving Files */
const fs = require("fs");

/** Upload to IPFS */
//For Testing:
//* Needs to run Daemon
const ipfsUrl = "http://127.0.0.1:5001";
// Stopped working:
// const ipfsLocalHost = "https://ipfs.io";

//Opening file with local gateway for testing purposes
const getIpfsLocalHost = (filename) => {
  return `http://localhost:8080/ipfs/${filename}?filename=${filename}`;
};

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
//Done: uploading images and using in front

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
    const url = getIpfsLocalHost(added.path);
    return url;
  } catch (error) {
    console.log(error);
    return "error";
  }
};
