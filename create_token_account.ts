import * as token from "@solana/spl-token";
import dotenv from "dotenv";
dotenv.config();
import * as helpers from "@solana-developers/helpers";
import * as web3 from "@solana/web3.js";

const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

const user = helpers.getKeypairFromEnvironment("SECRET_KEY");

console.log(
  `🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
);

// Subtitute in your token mint account from create-token-mint.ts
const tokenMintAccount = new web3.PublicKey(
  "JCUFwpfs5DaEzvnjWLH1VQvW9zWFXGf5iAcKgJdAVzyp"
);

// Here we are making an associated token account for our own address, but we can
// make an ATA on any other wallet in devnet!
// const recipient = new PublicKey("SOMEONE_ELSES_DEVNET_ADDRESS");
const recipient = user.publicKey;

const tokenAccount = await token.getOrCreateAssociatedTokenAccount(
  connection,
  user,
  tokenMintAccount,
  recipient
);

console.log(`Token Account: ${tokenAccount.address.toBase58()}`);

const link = helpers.getExplorerLink(
  "address",
  tokenAccount.address.toBase58(),
  "devnet"
);

console.log(`✅ Created token Account: ${link}`);
