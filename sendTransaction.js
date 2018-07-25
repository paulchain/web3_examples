var Tx = require('ethereumjs-tx')
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/7e56d44937a1424ea0fa2c81d8c67093')

const account1 = '0xc037ea5a7bf93c18e47cef7723a82a06487bbf44'
const account2 = '0xb1681638531515aa0e9beaeb3a69435121c40efb'

const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1, 'hex')
const privateKey2 = Buffer.from(process.env.PRIVATE_KEY_2, 'hex')

web3.eth.getTransactionCount(account1, (err, txCount) => {
	//Build the Transaction

	const txObject = {
		nonce: web3.utils.toHex(txCount),
		to: account2,
		value: web3.utils.toHex(web3.utils.toWei('0.5', 'ether')),
		gasLimit: web3.utils.toHex(21000),
		gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
	}

	// Sign the transaction

	const tx = new Tx(txObject);
	tx.sign(privateKey1)

	const serializedTransaction = tx.serialize();
	const raw = '0x' + serializedTransaction.toString('hex')

	// Broadcast the transaction

	web3.eth.sendSignedTransaction(raw, (err, txHash) => {
		console.log('txHash: ', txHash);
	})
})