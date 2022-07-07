import Web3 from 'web3'

var web3 = new Web3();
// console.log(web3)

// 어카운트 생성하기
const account = web3.eth.accounts.create()
// console.log(account)

// 프라이빗 키를 web3 keystore 표준으로 암호화하기 
const privateKey = account.privateKey
const encrypt = web3.eth.accounts.encrypt(privateKey, "pass")
// console.log(encrypt)

const decrypt = web3.eth.accounts.decrypt(encrypt, "pass")
// console.log(decrypt)


web3 = new Web3("HTTP://127.0.0.1:7545")
const txResult = await web3.eth.accounts.signTransaction({
    to: '0xF0109fC8DF283027b6285cc889F5aA624EaC1F55',
    value: '1000000000',
    gas: 2000000
}, privateKey)
console.log(txResult)