import Web3 from 'web3'
var web3 = new Web3("HTTP://127.0.0.1:7545")
// 어카운트 생성하기
const account = web3.eth.accounts.create()
console.log("account: ", account)

// 프라이빗 키를 web3 keystore 표준으로 암호화하기 
const privateKey = account.privateKey
const encrypt = web3.eth.accounts.encrypt(privateKey, "pass")
// console.log("encrypt: ", encrypt)
const decrypt = web3.eth.accounts.decrypt(encrypt, "pass")
// console.log("decrypt:", decrypt)

web3.eth.getBalance(account.address).then(console.log)

// 어카운트 개인키로 서명하여 트랜잭션 생성하기
const txResult = await web3.eth.accounts.signTransaction({
    to: '0x0a0Dd3AeF3AE322C2a40b170809cfA155Ae36155',
    value: '10000000',
    gas: 4718,
    gasPrice: 10,
    gasLimit: 1000000,
}, privateKey)
console.log("txResult: ", txResult)
