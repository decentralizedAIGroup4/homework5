const AIOracleCallbackReceiverABI = {
  "_format": "hh-sol-artifact-1",
  "contractName": "AIOracleCallbackReceiver",
  "sourceName": "contracts/AIOracleCallbackReceiver.sol",
  "abi": [
    {
      "inputs": [
        {
          "internalType": "contract IAIOracle",
          "name": "expected",
          "type": "address"
        },
        {
          "internalType": "contract IAIOracle",
          "name": "found",
          "type": "address"
        }
      ],
      "name": "UnauthorizedCallbackSource",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "aiOracle",
      "outputs": [
        {
          "internalType": "contract IAIOracle",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "requestId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "output",
          "type": "bytes"
        },
        {
          "internalType": "bytes",
          "name": "callbackData",
          "type": "bytes"
        }
      ],
      "name": "aiOracleCallback",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "requestId",
          "type": "uint256"
        }
      ],
      "name": "isFinalized",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "linkReferences": {},
  "deployedLinkReferences": {}
};
