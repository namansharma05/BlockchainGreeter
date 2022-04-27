import { useState, useEffect } from "react";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import { ethers } from "ethers";
import "./App.css";

function App() {
  const [greeting, doGreeting] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const LoadProvider = async () => {
      let contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
      const url = "http://localhost:8545";
      const provider = new ethers.providers.JsonRpcProvider(url);
      const contract = new ethers.Contract(
        contractAddress,
        Greeter.abi,
        provider
      );
      setContract(contract);
      setProvider(provider);
    };
    LoadProvider();
  }, []);
  useEffect(() => {
    const getGreetings = async () => {
      const greeting = await contract.greet();
      doGreeting(greeting);
    };
    contract && getGreetings();
  }, [contract]);

  const changeGreetings = async () => {
    const input = document.querySelector("#value");
    const signer = contract.connect(provider.getSigner());
    signer.setGreeting(input.value);
    setTimeout(function () {
      window.location.reload(1);
    }, 800);
    setTimeout();
  };
  return (
    <div className="App">
      <h1>{greeting}</h1>
      <input className="input" type="text" id="value"></input>
      <button className="button" onClick={changeGreetings}>
        Change!
      </button>
    </div>
  );
}

export default App;
