import { ethers } from "ethers";
import * as dotenv from "dotenv";
import WormholeBridge from "../../artifacts/contracts/WormholeBridge.sol/WormholeBridge.json";

dotenv.config();

async function mintNFT(to: string, uri: string, destinationChainId: number) {
    const provider = new ethers.providers.JsonRpcProvider(process.env.ETH_RPC_URL);
    const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);

    const contract = new ethers.Contract(process.env.WORMHOLE_BRIDGE_ADDRESS, WormholeBridge.abi, wallet);
    const tx = await contract.mintAndSend(to, uri, destinationChainId);
    console.log("NFT minted and message sent to Wormhole", tx.hash);
}

mintNFT("0xRecipientAddress", "ipfs://TokenURI", 3).catch(console.error);
