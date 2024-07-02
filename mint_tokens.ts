import * as token from "@solana/spl-token";
import dotenv from "dotenv";
dotenv.config();
import * as helpers from "@solana-developers/helpers";
import * as web3 from "@solana/web3.js";
const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

// Our token has two decimal places
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const user = helpers.getKeypairFromEnvironment("SECRET_KEY");

// Subtitute in your token mint account from create-token-mint.ts
const tokenMintAccount = new web3.PublicKey(
  "CguhZG2R6XkAHAc5T69wqW2qXtumRgn1jTJ6gtVCNYxw"
);

// Substitute in your own, or a friend's token account address, based on the previous step.
const recipientAssociatedTokenAccount = new web3.PublicKey(
  "GUvTYKX4oh7kKqCXtsCvZAr8JuogpC5PGSdXRtCRUEpz"
);

const transactionSignature = await token.mintTo(
  connection,
  user,
  tokenMintAccount,
  recipientAssociatedTokenAccount,
  user,
  10 * MINOR_UNITS_PER_MAJOR_UNITS
);

const link = helpers.getExplorerLink(
  "transaction",
  transactionSignature,
  "devnet"
);

console.log(`✅ Success! Mint Token Transaction: ${link}`);
