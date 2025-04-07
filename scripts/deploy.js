const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Step 1: Deploy a mock IAIOracle (since AIOracle.sol isn’t included)
  // This is a minimal implementation to satisfy the interface
  const MockAIOracle = await hre.ethers.getContractFactory("MockAIOracle", deployer);
  const mockAIOracle = await MockAIOracle.deploy();
  await mockAIOracle.deployed();
  console.log("MockAIOracle deployed to:", mockAIOracle.address);

  // Step 2: Deploy Prompt
  const Prompt = await hre.ethers.getContractFactory("Prompt", deployer);
  const prompt = await Prompt.deploy(mockAIOracle.address);
  await prompt.deployed();
  console.log("Prompt deployed to:", prompt.address);

  // Step 3: Deploy SimplePrompt
  const SimplePrompt = await hre.ethers.getContractFactory("SimplePrompt", deployer);
  const simplePrompt = await SimplePrompt.deploy(mockAIOracle.address);
  await simplePrompt.deployed();
  console.log("SimplePrompt deployed to:", simplePrompt.address);

  // Optional: Set callback gas limits (example)
  await prompt.setCallbackGasLimit(1, 500000); // Model ID 1, gas limit 500,000
  await simplePrompt.setCallbackGasLimit(1, 500000);
  console.log("Callback gas limits set for model ID 1");
}

// MockAIOracle contract (minimal implementation for deployment)
const mockAIOracleArtifact = {
  abi: [
    "function requestCallback(uint256 modelId, bytes calldata input, address callbackContract, uint64 gasLimit, bytes calldata callbackData) external payable returns (uint256)",
    "function estimateFee(uint256 modelId, uint64 gasLimit) external view returns (uint256)",
    "function isFinalized(uint256 requestId) external view returns (bool)"
  ],
  bytecode: `
    // Simple mock bytecode (deployed inline for simplicity)
    // This is a basic placeholder; replace with actual implementation if needed
    608060405234801561001057600080fd5b506103e5806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80633d2d003914610051578063a03b73391461008c578063c4b5e075146100f5575b600080fd5b61008a61005f3660046101b7565b60405190815260200160405180910390f35b61008a61009a3660046101ef565b6000806040516020016100ab90610188565b6040516020818303038152906040528051906020012060001c6100cc9190610264565b60405190815260200160405180910390f35b610108610103366004610287565b61011a565b604051901515815260200160405180910390f35b60008060405160200161012b90610188565b6040516020818303038152906040528051906020012060001c61014c9190610264565b60405190815260200160405180910390f35b610180806101956000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80634c13a41f146037575b600080fd5b60406042366004604e565b604c565b005b60405181815260200160405180910390a0565b600060208284031215605f57600080fd5b5035919050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171560a4576100a4610066565b604052919050565b600067ffffffffffffffff82111560be576100be610066565b50601f01601f191660200190565b600082601f83011260e057600080fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715610957610957610066565b60405291906001600160a01b03841660208301526040808301356060840152608080840135815260a0810135608085015260c060a085013560c085015260e060c085013560e085015261010060e085013561010085015280915050565b60008060008060008060c087890312156101d057600080fd5b86356001600160a01b03811681146101e657600080fd5b955050602087015960408801359550606088013595506080880135945060a0880135935060c0880135919050565b6000806040838503121561020257600080fd5b82359150602083013567ffffffffffffffff81111561022057600080fd5b61022c8582860160cf565b9150509250929050565b634e487b7160e01b600052601160045260246000fd5b60008261026157610261610236565b500690565b60008261027357610273610236565b500490565b60006020828403121561029957600080fd5b503591905056fea26469706673582212208eabf8c8ebfa9eabf8c8ebfa9eabf8c8ebfa9eabf8c8ebfa9eabf8c8ebfa9eab64736f6c63430008120033
  `,
};

hre.artifacts.add(mockAIOracleArtifact);

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
