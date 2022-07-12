import Web3 from 'web3'
import Transaction from '@ethereumjs/tx'
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

var _privateKey = Buffer.from('b0d9204561ef48a75285806b3016823d066b9d5c6557a2f88ad6fb204c79c064', 'hex');

var rawTx = {
  nonce: '0x00',
  gasPrice: '0x09184e72a000',
  gasLimit: '0x2710',
  to: '0x0000000000000000000000000000000000000000',
  value: '0x100',
  data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057'
}

Transaction
var tx = new Tx(rawTx, {'chain':'ropsten'});
tx.sign(_privateKey);

var serializedTx = tx.serialize();

web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
.on('receipt', console.log);