import Web3 from "web3"

var web3 = new Web3("HTTP://127.0.0.1:7545")

const account = web3.eth.accounts.create()

const privateKey = account.privateKey
const encrypt = web3.eth.accounts.encrypt(privateKey, "password")
const decrypt = web3.eth.accounts.decrypt(encrypt, "password")

const txResult = await web3.eth.accounts.signTransaction({
  to : "0xB45Cd78Ba07EEECfeb371951f1c2cfDD5f27ad6B",
  value : '100000',
  gas : 4000,
  gasPrice : 10,
  gasLimit : 1000000
}, privateKey)
console.log(txResult)