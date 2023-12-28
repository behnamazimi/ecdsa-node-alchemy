import { useEffect, useState } from "react";
import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

function Wallet({ privateKey, setPrivateKey, balance, setBalance }) {
  const [address, setAddress] = useState("");

  useEffect(() => {
    setBalance(0);
    setAddress("");

    let extractedAddress = "";
    try {
      extractedAddress = toHex(secp256k1.getPublicKey(privateKey));
      console.log(extractedAddress);
      setAddress(extractedAddress);
    } catch (e) {
      console.log(e.message);
    }

    if (extractedAddress) {
      server.get(`balance/${extractedAddress}`).then(({ data: { balance } }) => {
        setBalance(balance);
      });
    }
  }, [privateKey])

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private key:
        <input
          placeholder="Type your private key"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)} />
      </label>

      <div>Adress: {address.slice(0, 15)}...</div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
