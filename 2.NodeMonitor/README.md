# Architecture

- bridge 구조 자료 참고
- 인덱싱을 위해 postgreSQL DB 사용

# Installation

```bash
git clone https://github.com/blockscout/blockscout.git

export COIN=Test
export ETHEREUM_JSONRPC_VARIANT=parity 
export ETHEREUM_JSONRPC_HTTP_URL=http://host.docker.internal:8545/
# export ETHEREUM_JSONRPC_HTTP_URL=http://host.docker.internal:7545/
export NETWORK=Ethereum
export SUBNETWORK=Test
export PORT=4000
export BLOCKSCOUT_HOST=localhost

cd blockscout/docker
make start
```

# 주의사항

- blockscout의 경우 manual 설치 시엔 dependency가 너무 많아 docker를 이용한 설치 추천
- 프로그램이 무거워 실행 시 많은 메모리와 CPU를 점유함에 유의해야함

