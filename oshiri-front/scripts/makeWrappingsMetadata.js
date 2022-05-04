const hre = require("hardhat");

//Do after test
async function main() {
  //Deploy Oshiri Wrappings
  const OshiriWrappings = await ethers.getContractFactory("OshiriWrappings");
  const copiesPerPair = 100;
  const oshiriWrappings = await OshiriWrappings.deploy(copiesPerPair);
  await oshiriWrappings.deployed();
  console.log("Deployed Contracts");
  console.log("OshiriWrappings deployed to:", oshiriWrappings.address);

  //TODO: Upload to IPFS
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
