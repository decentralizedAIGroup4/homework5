Weekend Project [5]
To consolidate this week's learning, complete the following project:

-(1) Pick one of your previous AI projects using OpenAI APIs for AI inference
-(2) Replace the OpenAI APIs with decentralized inference
-(3) Implement a smart contract to handle payments (or any other relevant asset for your project)

#Before running

- Setup Metamask Flask
[metamask flask](https://docs.metamask.io/snaps/get-started/install-flask/)
- In metamask flask select show rest networks, and select Sepolia
- use a faucet (e.g https://sepolia-faucet.pk910.de/)  to sent Sepolia ETH to address accessibke in Flask Wallet. may need to import wallet with private key listed in tell-me-a-joke-oaa hardhat.config.ts .

# To Compile Contracts in directory:
npx hardhat compile

## run on local in tell-me-a-joke-oao
- outside of tell-me-a-joke-oao directory: cp hardhat.config.ts.local hardhat.config.ts
  const SEPOLIA_PRIVATE_KEY = "your-32byte-private-key-as-hex-string-without-0x-prefix-here";
- outside of tell-me-a-joke-oao directory: npx hardhat compile

- outside of tell-me-a-joke-oao directory: npx hardhat node

- outside of tell-me-a-joke-oao directory: npx hardhat run scripts/deploy.js --network localhost
  (for remote npx hardhat run scripts/deploy.js --network sepolia)

- inside of tell-me-a-joke-oao directory: cp .env.local .env
  replace .env with ora api key in ORA_API_KEY=your-ora-api-key-here (see [ora-rms](https://rms.ora.io/) to try to obstain)

- inside of tell-me-a-joke-oao directory: npm run dev

- simulate opml node with event listener outside of tell-me-a-joke-oao directory: node scripts/opml.js (normally remote API, https://docs.ora.io/doc/resilient-model-services-rms/ora-api, but using hardhat for emulation of local chain) 


## fix
* tell-me-a-joke-oao/lib/web3.[ts]js (needs to be updated with the contract address)

(vibe coded with Grok 3, to be taken as outline until working)
