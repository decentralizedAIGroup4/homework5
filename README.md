Weekend Project [5]
To consolidate this week's learning, complete the following project:

-(1) Pick one of your previous AI projects using OpenAI APIs for AI inference
-(2) Replace the OpenAI APIs with decentralized inference
-(3) Implement a smart contract to handle payments (or any other relevant asset for your project)

#Before running

- Setup Metamask Flask
[metamask flask](https://docs.metamask.io/snaps/get-started/install-flask/)
- In metamask flask select show rest networks, and select Sepolia
- use a faucet to sent Sepolia ETH to address accessibke in Flask Wallet. may need to import wallet with private key listed in tell-me-a-joke-oaa hardhat.config.ts .

# To Compile Contracts in directory:
npx hardhat compile

## run on local in tell-me-a-joke-oao
- outside of tell-me-a-joke-oao directory: npx hardhat node

- inside of tell-me-a-joke-oao directory: npx hardhat run scripts/deploy.js --network localhost
    --- OR -----
- inside of tell-me-a-joke-oao directory: npx hardhat run scripts/deploy.js --network sepolia 


## fix
* tell-me-a-joke-oao/page.ts
* tell-me-a-joke-oao/scripts.deploy.js (needs to be completely refactored)
* tell-me-a-joke-oao/lib/web3.js (needs to be updated with the contract address)

(vibe coded with Grok 3, to be taken as outline until working)
