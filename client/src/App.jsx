import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [privateKey, setPrivateKey] = useState("");

  return (
    <div className="app">
      <Wallet privateKey={privateKey} 
              setPrivateKey={setPrivateKey} 
              balance={balance} 
              setBalance={setBalance} />
      <Transfer setBalance={setBalance} privateKey={privateKey} />
    </div>
  );
}

export default App;
