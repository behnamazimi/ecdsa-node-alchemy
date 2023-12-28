const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { secp256k1 } = require("ethereum-cryptography/secp256k1")
const { toHex } = require("ethereum-cryptography/utils")

app.use(cors());
app.use(express.json());

const balances = {
  "02381daad49a491d5df90195633bfb703f25885fc530f3c37a103e7b1f82ac39bc": 100,
  "0291b6d938203cf4c6220bdbe8b1ede048ee9bee8d9366d8c2fb1608ef0dc3eabc": 50,
  "021970517fe8788f098506552a5f7408106181a49a91f4b8f82ef9d1c0e80c13aa": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { signatureHex, sigRecoveryBit, tnxHash, recipient, amount } = req.body;

  // convert signature string to signature object
  let signature = secp256k1.Signature.fromCompact(signatureHex);
  signature.recovery = parseInt(sigRecoveryBit);

  const publicKeyBytes = signature.recoverPublicKey(tnxHash).toRawBytes();
  const sender = toHex(publicKeyBytes);

  if (sender === recipient) {
    res.status(400).send({ message: "Sender and recipient cannot be the same!" });
  
  } else if (!balances[sender]) {
    res.status(400).send({ message: "Sender does not exist!" });

  } else if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
