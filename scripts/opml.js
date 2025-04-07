const { ethers } = require("ethers");
const { PromptABI } = require("../abis/PromptABI");

const PROVIDER_URL = "http://127.0.0.1:8545";
const PRIVATE_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const PROMPT_CONTRACT_ADDRESS = "0xYourPromptContractAddress";

const provider = new ethers.JsonRpcProvider(PROVIDER_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const promptContract = new ethers.Contract(PROMPT_CONTRACT_ADDRESS, PromptABI.abi, wallet);

async function simulateOpml() {
  console.log("Listening for promptRequest events...");
  promptContract.on("promptRequest", async (requestId, sender, modelId, prompt) => {
    console.log(`Received request: ${requestId}, modelId: ${modelId}, prompt: ${prompt}`);

    const response = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestId: requestId.toString(), modelId, prompt }),
    });

    const result = await response.json();
    console.log("opML response:", result);
  });
}

simulateOpml().catch(console.error);
