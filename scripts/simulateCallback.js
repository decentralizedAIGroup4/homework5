const hre = require("hardhat");

async function main() {
  const AIORACLE_ADDRESS = "0xYourAIOracleAddress";
  const PROMPT_ADDRESS = "0xYourPromptContractAddress";
  const REQUEST_ID = "YourRequestId"; // From the alert
  const RESULT = "Simulated AI response";

  const [signer] = await hre.ethers.getSigners();
  const aiOracle = await hre.ethers.getContractAt("AIOracle", AIORACLE_ADDRESS, signer);
  await aiOracle.callback(REQUEST_ID, hre.ethers.utils.toUtf8Bytes(RESULT), "0x");

  const prompt = await hre.ethers.getContractAt("Prompt", PROMPT_ADDRESS);
  const result = await prompt.prompts(1, "YourPromptText");
  console.log("Result:", result);
}

main().catch(console.error);
