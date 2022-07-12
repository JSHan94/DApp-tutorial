# Architecture

- etherscan 구조 자료 참고

# Installation

```bash
git clone https://github.com/blockscout/blockscout.git

export COIN=Test
export ETHEREUM_JSONRPC_VARIANT=parity 
export ETHEREUM_JSONRPC_HTTP_URL=http://localhost:8545/
export ETHEREUM_JSONRPC_WS_URL=ws://localhost:8545/
export NETWORK=Ethereum
export SUBNETWORK=Test
export PORT=4000
export BLOCKSCOUT_HOST=localhost

cd blockscout/docker
make start
```