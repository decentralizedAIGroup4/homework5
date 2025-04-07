Weekend Project [5]
To consolidate this week's learning, complete the following project:

Pick one of your previous AI projects using OpenAI APIs for AI inference
Replace the OpenAI APIs with decentralized inference
Implement a smart contract to handle payments (or any other relevant asset for your project)

* Add: https://github.com/ArcTanSusan/tell-me-a-joke
* Add: https://github.com/Encode-Club-AI-Bootcamp/DeAI/blob/main/Lesson-19/exercises/00-Decentralized-Inference.md , https://docs.ora.io/doc
* Add: https://github.com/Encode-Club-AI-Bootcamp/DeAI/blob/main/Lesson-17/exercises/01-Create-Fungible-Token.md (mint joke NFTs)

# To Compile Contracts in directory:
npx hardhat compile

## run on local in tell-me-a-joke-oao
outside of tell-me-a-joke-oao directory: npx hardhat node

inside of tell-me-a-joke-oao directory: npx hardhat run scripts/deploy.js --network localhost
    --- OR -----
inside of tell-me-a-joke-oao directory: npx hardhat run scripts/deploy.js --network sepolia 


## fix
* tell-me-a-joke-oao/page.ts
* tell-me-a-joke-oao/scripts.deploy.js (needs to be completely refactored)
* tell-me-a-joke-oao/lib/web3.js (needs to be updated with the contract address)

(vibe coded with Grok 3, to be taken as outline until working)
