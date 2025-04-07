import { ethers } from "ethers";

// use this address for the publicly avialable contract for Prompt.sol instead of your deployment
// comment out if not needed
const contractAddress = '0xe75af5294f4CB4a8423ef8260595a54298c7a2FB';

export function getProvider() {
  return new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
}

export function getSigner(provider, accountIndex = 0) {
  const accounts = [
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", // Hardhat default account 0
    // Add more if needed
  ];
  return new ethers.Wallet(accounts[accountIndex], provider);
}

export function getPromptContract(providerOrSigner, contractAddress) {
  const { PromptABI } = require("../abis/PromptABI");
  return new ethers.Contract(contractAddress, PromptABI, providerOrSigner);
}

// this needs to be updated with the appropriate deployed contract Addresses
