import * as token from "@solana/spl-token";
import dotenv from "dotenv";
dotenv.config();
import * as helper from "@solana-developers/helpers";
import * as web3 from "@solana/web3.js";

const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

const user = helper.getKeypairFromEnvironment("SECRET_KEY");

console.log(
  `🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
);

const tokenMint = await token.createMint(
  connection,
  user,
  user.publicKey,
  null,
  2
);

const link = helper.getExplorerLink("address", tokenMint.toString(), "devnet");

console.log(`✅ Finished! Created token mint: ${link}`);
