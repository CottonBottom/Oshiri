# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

# Starting Oshiri Testing

1. Start ipfs with "ipfs daemon" to run ipfs locally
2. Run "npx hardhat test" to run the uploading process of images
3. Run "npx hardhat node" to start blockchain test server locally
4. Run "npx hardhat run scripts/deploy.js --network localhost" to deploy contracts
5. Run "npm start" to start Frontend

# TODO next:

1. Get wrappings process -> Spend OSH to get a new Wrapping (give some test OSH)
2. Make it able to equip the new Wrapping
