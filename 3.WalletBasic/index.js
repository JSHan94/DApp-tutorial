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
    to: '0x20215c6c68a75074e5d0ac9f914261c4284e10C9',
    value: '1000000000',
    gas: 2000000
}, privateKey)
console.log(txResult)