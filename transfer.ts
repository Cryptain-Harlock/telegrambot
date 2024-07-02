import * as web3 from "@solana/web3.js";
import * as token from "@solana/spl-token";
import dotenv from "dotenv";
dotenv.config();
import * as helpers from "@solana-developers/helpers";
const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

const sender = helpers.getKeypairFromEnvironment("SECRET_KEY");

console.log(
  `🔑 Loaded our keypair securely, using an env file! Our public key is: ${sender.publicKey.toBase58()}`
);

// Add the recipient public key here.
const recipient = new web3.PublicKey("YOUR_RECIPIENT_HERE");

// Subtitute in your token mint account
const tokenMintAccount = new web3.PublicKey("YOUR_TOKEN_MINT_ADDRESS_HERE");

// Our token has two decimal places
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

console.log(`💸 Attempting to send 1 token to ${recipient.toBase58()}...`);

// Get or create the source and destination token accounts to store this token
const sourceTokenAccount = await token.getOrCreateAssociatedTokenAccount(
  connection,
  sender,
  tokenMintAccount,
  sender.publicKey
);

const destinationTokenAccount = await token.getOrCreateAssociatedTokenAccount(
  connection,
  sender,
  tokenMintAccount,
  recipient
);

// Transfer the tokens
const signature = await token.transfer(
  connection,
  sender,
  sourceTokenAccount.address,
  destinationTokenAccount.address,
  sender,
  1 * MINOR_UNITS_PER_MAJOR_UNITS
);

const explorerLink = helpers.getExplorerLink(
  "transaction",
  signature,
  "devnet"
);

console.log(`✅ Transaction confirmed, explorer link is: ${explorerLink}!`);
