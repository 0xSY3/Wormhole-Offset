import express from 'express';
import { sendMessageToWormhole } from './blockchain/wormhole';
import { createTransactionOnEthereum, connectToEthereum } from './blockchain/ethereum';
import { connectToSolana, createTransactionOnSolana } from './blockchain/solana';

const app = express();
app.use(express.json());

app.post('/wormhole/send', async (req, res) => {
    const { message, chainId } = req.body;
    const vaa = await sendMessageToWormhole(message, chainId);
    res.json({ vaa });
});

app.post('/ethereum/transaction', async (req, res) => {
    const { to, amount } = req.body;
    const wallet = await connectToEthereum();
    const tx = await createTransactionOnEthereum(wallet, to, amount);
    res.json({ tx });
});

app.post('/solana/transaction', async (req, res) => {
    const { to, amount } = req.body;
    const { connection, keypair } = await connectToSolana();
    const signature = await createTransactionOnSolana(connection, keypair, to, amount);
    res.json({ signature });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
