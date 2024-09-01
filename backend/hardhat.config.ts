import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    mainnet: {
      url: process.env.ETH_RPC_URL,
      accounts: [process.env.WALLET_PRIVATE_KEY]
    },
    rinkeby: {
      url: process.env.RINKEBY_RPC_URL,
      accounts: [process.env.WALLET_PRIVATE_KEY]
    }
  }
};

export default config;
