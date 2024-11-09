import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import './App.css';
import * as snarkjs from 'snarkjs';

const App: React.FC = () => {
  const [_, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [a, setA] = useState<number>(0);
  const [b, setB] = useState<number>(0);
  const [proof, setProof] = useState<string | null>(null);
  const [verificationResult, setVerificationResult] = useState<string | null>(null);

  // Connect to Ethereum wallet (e.g., MetaMask)
  const connectWallet = async () => {
    if ((window as any).ethereum) {
      try {
        const web3Instance = new Web3((window as any).ethereum);
        setWeb3(web3Instance);

        // Request account access
        const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);

        // Fetch balance
        const balanceInWei = await web3Instance.eth.getBalance(accounts[0]);
        setBalance(web3Instance.utils.fromWei(balanceInWei, 'ether'));
      } catch (err) {
        setError('Failed to connect to the wallet');
        console.error(err);
      }
    } else {
      setError('No Ethereum wallet detected');
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  // Calculate proof with values of a and b
  const calculateProof = async (a: number, b: number) => {
    try {
      const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        { a, b },
        "multiplier2.wasm",
        "multiplier2_0001.zkey"
      );
      setProof(JSON.stringify(proof, null, 2));

      const vkey = await fetch("verification_key.json").then((res) => res.json());

      const verification = await snarkjs.groth16.verify(vkey, publicSignals, proof);
      setVerificationResult(verification ? 'Proof verified successfully' : 'Proof verification failed');
    } catch (err) {
      setError('Failed to calculate proof');
      console.error(err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateProof(a, b);
  };

  return (
    <>
      <h1>Zero Knowledge Multiplier</h1>
      {account ? (
        <div>
          <p>Connected Account: {account}</p>
          <p>Balance: {balance} ETH</p>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Calculate Proof</h2>
      <form onSubmit={handleSubmit}>
        <label>
          A:
          <input
            type="number"
            value={a}
            onChange={(e) => setA(Number(e.target.value))}
          />
        </label>
        <label>
          B:
          <input
            type="number"
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
          />
        </label>
        <button type="submit">Calculate Proof</button>
      </form>

      {proof && (
        <div>
          <h3>Proof:</h3>
          <pre>{proof}</pre>
        </div>
      )}

      {verificationResult && (
        <div>
          <h3>Verification Result:</h3>
          <p>{verificationResult}</p>
        </div>
      )}
    </>
  );
};

export default App;
