# Polygon SDK

## node client 설치

- Go >= 1.17 이상 설치 되어있어야함
- Installation

```bash
git clone https://github.com/0xPolygon/polygon-edge.git
cd polygon-edge/
go build -o polygon-edge main.go
```
- Setup

```bash
# /polygon-edge 폴더
./polygon-edge secrets init --data-dir ~/test-chain-1 # address와 Node ID 확인
./polygon-edge genesis --consensus ibft --ibft-validator=0xf6f414C6903165231FB9d29D7B556226981057d5 --bootnode=/ip4/127.0.0.1/tcp/10001/p2p/16Uiu2HAkxK2heTzFzFtd2MfdzBiLfR3sJ6VzaSjr9o3ceWCwnAwE
./polygon-edge server --data-dir ~/test-chain-1 --chain genesis.json  --libp2p 0.0.0.0:1478 --nat 192.0.2.1 --seal --jsonrpc 0.0.0.0:8545
```
