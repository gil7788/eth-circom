# Circom Example
An example of a toy circuit appliaction.

## Project Structure & Initializtion
This project was initailized as a `React`, `Vite`, `Yarn` project using,:

```bash
yarn create vite
```
```bash
yarn
```
```bash
yarn dev
```

## Contracts Directory
This directory was initialized as a foundry project, using:

```bash
forge init
```

```bash
forge build
```
* Make sure to delete `.git`, `.github` directories.

## Complie Circut to a Solidity Smart Contract
### Complie Circut
To complie the circuit, run following command:

```bash
cd circuits/
circom multiplier2.circom --r1cs --wasm --sym --c
```

### Witness
To generate a witness for a proof, run:

```bash
cd multiplier2_js/
node generate_witness.js multiplier2.wasm input.json witness
.wtns
```

```bash
cd ../
```

### Powers of Tao
To run a ZkSnark protocol between two parties, a trusted third party is required.

Generate powers of Tao:
```bash
snarkjs powersoftau new bn128 12 pot12_0000.ptau -v
```

Cuntribute to Tao ceremony
```bash
snarkjs powersoftau contribute pot12_0000.ptau pot12_0001.pt
au --name="First contribution" -v
```

Prepare phase2
```bash
snarkjs powersoftau prepare phase2 pot12_0001.ptau pot12_fin
al.ptau -v
```

Generate zkey
```bash
snarkjs groth16 setup multiplier2.r1cs pot12_final.ptau mult
iplier2_0000.zkey
```


```bash
snarkjs zkey contribute multiplier2_0000.zkey multiplier2_00
01.zkey --name="1st Contributor Name" -v
```

```bash
snarkjs zkey export verificationkey multiplier2_0001.zkey ve
rification_key.json
```

### Generate a Smart Contract
```bash
snarkjs groth16 prove multiplier2_0001.zkey multiplier2_js/w
itness.wtns proof.json public.json
```

```bash
snarkjs zkey export solidityverifier multiplier2_0001.zkey ../contracts/src/verifier.sol
```

## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
cd contracts/
$ forge script script/verifier.s.sol:VerifierScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```




## References
 * [Tutorial](https://www.youtube.com/watch?app=desktop&v=2BHdTjpYmFg&ab_channel=ChristianLacdael)
 * [Docs](https://docs.circom.io/getting-started/installation/)