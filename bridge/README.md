# Token Bridge Contracts

## Install dependencies
Don't use Node 14 as it has issues with truffle, use node 8, 10 or 12.
Install node https://nodejs.org/es/
Then install dependencies
```
npm install
```

## Install and run ganache
https://www.trufflesuite.com/ganache


## Running test

```
npm run migrate
npm test
npm run lint
npm run coverage
```

## Configure networks

Edit the truffle configuration file

```js
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!met
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rskregtest: {
      host: "127.0.0.1",
      port: 4444,
      network_id: "*" // Match any network id
    },
  }
};
```

## Deploy contracts

Launch the local network

```
ganache-cli --verbose
```

Deploy using truffle to the desire network
```
truffle migrate --network <network>
```

Examples
```
truffle migrate --network development
truffle migrate --network rskregtest
```

This will also generate the json files for that network with the addresses of the deployed contracts that will be called by the federator.


## Verifying contracts

If veryfing contracts on Kovan or Ethereum create a file called etherscan.key with the etherscan api key and run
```
truffle run verify ContractName [--network networkName]
```

If veryfing the contracts on Rsk Testnet or Mainnet first create the flattened file using
https://www.npmjs.com/package/truffle-flattener
and then verify it on the explorer




