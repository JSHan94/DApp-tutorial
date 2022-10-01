#!/bin/bash
export COIN=DAI \
export ETHEREUM_JSONRPC_VARIANT=ganache \ 
export ETHEREUM_JSONRPC_HTTP_URL=http://host.docker.internal:7545 \
export ETHEREUM_JSONRPC_WS_URL=ws://host.docker.internal:7545 \

# export COIN=ETH
# export ETHEREUM_JSONRPC_VARIANT=parity 
# export ETHEREUM_JSONRPC_HTTP_URL=http://127.0.0.1:7545
# export ETHEREUM_JSONRPC_WS_URL=ws://127.0.0.1:7545
# export NETWORK=Ethereum
# export PORT=4000
# export BLOCKSCOUT_HOST=localhost

make start