# Polygon SDK 설치 

- Go 1.17 요구
    - Go 1.19 버전 미지원
- Installation

```bash
git clone https://github.com/0xPolygon/polygon-edge.git
cd polygon-edge/
go build -o polygon-edge main.go # binary file 생성
```
- Polygon Edge Setup

```bash
# /polygon-edge 폴더의
polygon-edge secrets init --data-dir ~/test-chain-1 # address와 Node ID 확인
polygon-edge genesis --consensus ibft --ibft-validator=0x0A4f7D75b1A53A1D4CcF8C853bbB103C9F3c522e --bootnode=/ip4/127.0.0.1/tcp/10001/p2p/16Uiu2HAmQYTVupJQbdiNjc6AMZ2tfnh2DgMSX7HmNvGVcJnGkvvf --premine=0xe403fA02eA982CBC118179Fbb8C15ad3B93b0740:1000000000000000000000
polygon-edge server --data-dir ~/test-chain-1 --chain genesis.json  --libp2p 0.0.0.0:1478 --nat 192.0.2.1 --seal --jsonrpc 0.0.0.0:8545
```

- ChainBridge

```bash
git clone https://github.com/ChainSafe/ChainBridge.git
```

- ChainBridge CLI tool install

```bash
git clone -b v1.0.0 --depth 1 https://github.com/ChainSafe/chainbridge-deploy \
&& cd chainbridge-deploy/cb-sol-cli \
&& npm install \
&& make install
```

- set variables

```bash
SRC_GATEWAY=http://localhost:7545
DST_GATEWAY=http://localhost:8545

SRC_ADDR="0xe403fA02eA982CBC118179Fbb8C15ad3B93b0740"
SRC_PK="f688383a93e45d9942967119fc496abc0a039c7948c18cf169bef3ec64d26747"
DST_ADDR="0xe403fA02eA982CBC118179Fbb8C15ad3B93b0740" # just set same with SRC_ADDR for convience
DST_PK="f688383a93e45d9942967119fc496abc0a039c7948c18cf169bef3ec64d26747"

SRC_TOKEN="0xB7dB2578E1032C71c9Ac25031e1F2Ed611C7490D" # token contract in source chain
RESOURCE_ID="0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce00" # resource ID for cross-chain environment 
```

- Deploy Bridge Contract
```bash
# chain Id는 contract가 체인을 구별하기 위한 ID로, 실제 체인의 아이디와 달라도 가능
cb-sol-cli deploy --bridge --erc20Handler --chainId 0 \
  --url $SRC_GATEWAY \
  --privateKey $SRC_PK \
  --relayers $SRC_ADDR \
  --relayerThreshold 1 \
  --gasPrice 100 \
  --gasLimit 5000000
```

```bash
SRC_BRIDGE="0x25b9502197339955D94dB12628A45471A1730361" # you will get it 
SRC_HANDLER="0x6658a2bB780105301EBc9B4735220481765710F3" # you will get it 
```

-  Configure contracts in source chain

```bash
cb-sol-cli --url $SRC_GATEWAY --privateKey $SRC_PK  --gasPrice 100 --gasLimit 5000000 bridge register-resource \
    --bridge $SRC_BRIDGE \
    --handler $SRC_HANDLER \
    --resourceId $RESOURCE_ID \
    --targetContract $SRC_TOKEN
```

-  Deploy bridge, erc20 in destination chain

```bash
polygon-edge secrets init --data-dir ~/test-chain-1

polygon-edge genesis --consensus ibft --ibft-validator=0xD82B700641726bda51FCdef5da2D6fE3BaA516Bb --bootnode=/ip4/127.0.0.1/tcp/10001/p2p/16Uiu2HAm5TNRn4e4BCJyrssPpVZTPRuGWcPpLH6DKZB3MHzWBEjy --premine=0xe403fA02eA982CBC118179Fbb8C15ad3B93b0740:1000000000000000000000

polygon-edge server --data-dir ~/test-chain-1 --chain genesis.json  --libp2p 0.0.0.0:1478 --nat 192.0.2.1 --seal --jsonrpc 0.0.0.0:8545

cb-sol-cli deploy --url $DST_GATEWAY --privateKey $DST_PK --gasPrice 1 \
    --bridge --erc20 --erc20Handler  \
    --relayers $DST_ADDR \
    --relayerThreshold 1 \
    --chainId 2 \
    --gasLimit 5000000
```

```bash
DST_BRIDGE="0x8A55F2824171dF2C14adc2B0d13a625909B7fE04" # you will get it 
DST_HANDLER="0x69482197b89db7b7133a51b45ced3aA505b5a14c" # you will get it 
DST_TOKEN="0x287bB4E1A2D4D6Add7557255FdD4e11a91282E94" # you will get it 
```


- Configure contract

```bash
cb-sol-cli bridge register-resource --url $DST_GATEWAY --privateKey $DST_PK --gasPrice 1  --gasLimit 5000000 \
    --bridge $DST_BRIDGE \
    --handler $DST_HANDLER \
    --resourceId $RESOURCE_ID \
    --targetContract $DST_TOKEN
```

# Set account

chainbridge accounts import --privateKey $SRC_PK
chainbridge accounts import --privateKey $DST_PK

# Run bridge

chainbridge --config config.json --verbosity trace --latest --keystore ./ChainBridge/keys

- config json

```json
{
    "chains": [
      {
        "name": "Ganache",
        "type": "ethereum",
        "id": "4",
        "endpoint": "http://localhost:7545",
        "from": "0xe403fA02eA982CBC118179Fbb8C15ad3B93b0740",
        "opts": {
          "bridge": "0x25b9502197339955D94dB12628A45471A1730361",
          "erc20Handler": "0x25b9502197339955D94dB12628A45471A1730361",
          "genericHandler": "0x25b9502197339955D94dB12628A45471A1730361",
          "gasLimit": "8000000",
          "maxGasPrice": "10000000000"
        }
      },
      {
        "name": "Polygon",
        "type": "ethereum",
        "id": "2",
        "endpoint": "http://localhost:8545",
        "from": "0xe403fA02eA982CBC118179Fbb8C15ad3B93b0740",
        "opts": {
          "bridge": "0xEBdB6E90e63f57DCb96b93CfEa5AEB9C64117eBA",
          "erc20Handler": "0x25b9502197339955D94dB12628A45471A1730361",
          "genericHandler": "0x25b9502197339955D94dB12628A45471A1730361",
          "gasLimit": "5000000",
          "maxGasPrice": "10000000000"
        }
      }
    ]
  }
```



# bridging

cb-sol-cli --url $SRC_GATEWAY --privateKey $SRC_PK --gasPrice 10000000000 erc20 approve \
    --amount 10000\
    --erc20Address $SRC_TOKEN \
    --recipient $SRC_HANDLER \
    --gasLimit 5000000

# Transfer 
cb-sol-cli --url $SRC_GATEWAY --privateKey $SRC_PK --gasPrice 10000000000 erc20 deposit \
    --amount 1000 \
    --dest 1 \
    --bridge $SRC_BRIDGE \
    --recipient $DST_ADDR \
    --resourceId $RESOURCE_ID \
    --gasLimit 5000000
