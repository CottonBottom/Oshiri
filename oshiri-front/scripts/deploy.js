const hre = require("hardhat");

async function main() {
  //First deploy Oshiri Currency
  const OshiriCurrency = await ethers.getContractFactory("OshiriCurrency");
  const oshiriCurrency = await OshiriCurrency.deploy();
  await oshiriCurrency.deployed();

  //Then deploy Oshiri Wrappings
  const OshiriWrappings = await ethers.getContractFactory("OshiriWrappings");
  const copiesPerPair = 100;
  const oshiriWrappings = await OshiriWrappings.deploy(copiesPerPair);
  await oshiriWrappings.deployed();

  //Then deploy Oshiri and pass Oshiri Currency
  const Oshiri = await ethers.getContractFactory("Oshiri");
  const oshiri = await Oshiri.deploy(
    oshiriCurrency.address,
    oshiriWrappings.address
  );
  await oshiri.deployed();

  //Set Oshiri address in currency and wrappings once its deployed
  await oshiriCurrency.setOshiriGameAddress(oshiri.address);
  await oshiriWrappings.setOshiriGameAddress(oshiri.address);

  console.log("Deployed Contracts");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
