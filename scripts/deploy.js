const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const Prompt = await hre.ethers.getContractFactory("Prompt");
  const prompt = await Prompt.deploy(aiOracle.address);
  await prompt.deployed();
  console.log("Prompt:", prompt.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
