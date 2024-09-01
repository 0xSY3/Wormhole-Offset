import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

export const connectToEthereum = async () => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.ETH_RPC_URL);
    const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);
    return wallet;
};

export const createTransactionOnEthereum = async (wallet, to, amount) => {
    const tx = await wallet.sendTransaction({
        to,
        value: ethers.utils.parseEther(amount),
        gasPrice: ethers.utils.parseUnits('10', 'gwei'),
        gasLimit: 21000
    });
    return tx;
};
