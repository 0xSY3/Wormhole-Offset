import { ethers } from "ethers";
import * as dotenv from "dotenv";
import WormholeBridge from "../../artifacts/contracts/WormholeBridge.sol/WormholeBridge.json";

dotenv.config();

async function deployContract() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.ETH_RPC_URL);
    const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);

    const factory = new ethers.ContractFactory(WormholeBridge.abi, WormholeBridge.bytecode, wallet);
    const contract = await factory.deploy(process.env.WORMHOLE_ADDRESS);

    console.log("WormholeBridge deployed to:", contract.address);
}

deployContract().catch(console.error);
