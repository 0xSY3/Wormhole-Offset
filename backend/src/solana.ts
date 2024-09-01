import { Connection, PublicKey, Transaction, Keypair, SystemProgram } from '@solana/web3.js';
import * as dotenv from 'dotenv';

dotenv.config();

export const connectToSolana = async () => {
    const connection = new Connection(process.env.SOLANA_RPC_URL, 'confirmed');
    const keypair = Keypair.fromSecretKey(new Uint8Array(JSON.parse(process.env.SOLANA_PRIVATE_KEY)));
    return { connection, keypair };
};

export const createTransactionOnSolana = async (connection, keypair, to, amount) => {
    const toPublicKey = new PublicKey(to);
    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: keypair.publicKey,
            toPubkey: toPublicKey,
            lamports: amount,
        })
    );
    const signature = await connection.sendTransaction(transaction, [keypair]);
    await connection.confirmTransaction(signature);
    return signature;
};
