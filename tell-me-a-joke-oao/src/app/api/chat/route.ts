import { ethers } from "ethers";
import { PromptABI } from "../../../../abis/PromptABI"; 

import openai from "openai";

// Hardhat local node defaults
const PROVIDER_URL = "http://127.0.0.1:8545";
const PRIVATE_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; // Hardhat account 0 private key
const PROMPT_CONTRACT_ADDRESS = "0xYourPromptContractAddress"; // Replace with deployed address

const provider = new ethers.JsonRpcProvider(PROVIDER_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const promptContract = new ethers.Contract(PROMPT_CONTRACT_ADDRESS, PromptABI.abi, wallet);

// ORA API setup
const ORA_API_KEY = process.env.ORA_API_KEY || "YOUR_ORA_API_KEY"; // Set in .env.local
const oraClient = new openai.OpenAI({
  api_key: ORA_API_KEY,
  base_url: "https://api.ora.io/v1",
});

export async function POST(req: Request) {
  const { requestId, modelId, prompt } = await req.json();

  if (!requestId || !modelId || !prompt) {
    return new Response(JSON.stringify({ error: "Missing requestId, modelId, or prompt" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Check if the request exists and isn’t finalized
    const isFinalized = await promptContract.isFinalized(requestId);
    if (isFinalized) {
      return new Response(JSON.stringify({ error: "Request already finalized" }), {
        status: 400,
      });
    }

    // Call ORA API to generate the joke
    const systemPrompt = `You are a world-class stand-up comedian known for your perfect timing and clever humor. You excel at:
    - Crafting jokes that land perfectly
    - Creating unexpected but delightful punchlines
    - Reading the room and keeping things appropriate
    - Making complex topics simple and funny
    - Using perfect setup-punchline timing
    Your jokes are always original, quotable, and leave people laughing.`;

    const chatCompletion = await oraClient.chat.completions.create({
      model: "deepseek-ai/DeepSeek-V3", // ORA model
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
    });

    const output = chatCompletion.choices[0].message.content || ""; // Default to empty string if null
    const outputBytes = ethers.toUtf8Bytes(output);

    // Submit the result back to the Prompt contract
    const tx = await promptContract.aiOracleCallback(requestId, outputBytes, "0x");
    const receipt = await tx.wait();

    return new Response(
      JSON.stringify({
        requestId: requestId.toString(),
        output,
        txHash: receipt.transactionHash,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing OAO request:", error);
    return new Response(JSON.stringify({ error: "Failed to process request" }), {
      status: 500,
    });
  }
}