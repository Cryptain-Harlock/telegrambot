import dotenv from "dotenv";
dotenv.config();
import * as helpers from "@solana-developers/helpers";
import * as web3 from "@solana/web3.js";
import * as meta from "@metaplex-foundation/mpl-token-metadata";
import { publicDecrypt } from "crypto";
import { publicKey } from "@metaplex-foundation/beet-solana";

const user = helpers.getKeypairFromEnvironment("SECRET_KEY");

const connection = new web3.Connection("http://ash.dextrolab.com:31337");

console.log(
  `🔑 We've loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
);

const TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

// Subtitute in your token mint account
const tokenMintAccount = new web3.PublicKey(
  "88qXCeGtTSwyFUJDCLPsKXXMqhwBBecU2nzNVpH9wMjc"
);

const metadataData = {
  name: "Shitty Token",
  symbol: "Fart!!!",
  // Arweave / IPFS / Pinata etc link using metaplex standard for off-chain data
  uri: "https://arweave.net/1234",
  sellerFeeBasisPoints: 0,
  creators: null,
  collection: null,
  uses: null,
};

const metadataPDAAndBump = web3.PublicKey.findProgramAddressSync(
  [
    Buffer.from("metadata"),
    TOKEN_METADATA_PROGRAM_ID.toBuffer(),
    tokenMintAccount.toBuffer(),
  ],
  TOKEN_METADATA_PROGRAM_ID
);

const metadataPDA = metadataPDAAndBump[0];

const transaction = new web3.Transaction();

const createMetadataAccountInstruction =
  meta.createCreateMetadataAccountV3Instruction(
    {
      metadata: metadataPDA,
      mint: tokenMintAccount,
      mintAuthority: user.publicKey,
      payer: user.publicKey,
      updateAuthority: user.publicKey,
    },
    {
      createMetadataAccountArgsV3: {
        collectionDetails: null,
        data: metadataData,
        isMutable: true,
      },
    }
  );

transaction.add(createMetadataAccountInstruction);

const transactionSignature = await web3.sendAndConfirmTransaction(
  connection,
  transaction,
  [user]
);

const transactionLink = helpers.getExplorerLink(
  "transaction",
  transactionSignature,
  "devnet"
);

console.log(`✅ Transaction confirmed, explorer link is: ${transactionLink}!`);

const tokenMintLink = helpers.getExplorerLink(
  "address",
  tokenMintAccount.toString(),
  "devnet"
);

console.log(`✅ Look at the token mint again: ${tokenMintLink}!`);
