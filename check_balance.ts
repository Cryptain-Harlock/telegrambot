import * as web3 from "@solana/web3.js";

const connection = new web3.Connection(
  "http://ash.dextrolab.com:31337",
  "confirmed"
);
const address = new web3.PublicKey(
  "AghqzBrXv8KNuqM8p4zF9VpDNWvZQ3cGbELjjRrJxqjB"
);
const balance = await connection.getBalance(address);

console.log(
  `The balance of the account at ${address} is ${
    balance / web3.LAMPORTS_PER_SOL
  } SOL`
);
console.log(`✅ Finished!`);
