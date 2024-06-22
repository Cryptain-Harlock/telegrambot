import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const publicKey = new PublicKey('BBURQH3QxNt5bjCojTeXZbnL1FgFQBKvRQS31B1Czqwx');
const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
const balanceInLamports = await connection.getBalance(publicKey);
const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;

console.log(`Finished! The balance for the wallet at address ${publicKey} is ${balanceInSol}!`);