import assert from 'assert';
import ganache from 'ganache';
import Web3 from 'web3';
import compiled from '../compile.js';

const web3 = new Web3(ganache.provider({ logging: { quiet: true } }));

describe('Inbox', () => {
	let accounts, inbox;

	beforeEach(async () => {
		accounts = await web3.eth.getAccounts();

		inbox = await new web3.eth.Contract(compiled.abi)
			.deploy({
				data: compiled.evm.bytecode.object,
				arguments: ['Boom'],
			})
			.send({ from: accounts[0], gas: 1000000 });
	});

	it('can deploy a contract', () => {
		assert.ok(inbox.options.address);
	});

	it('has a default message', async () => {
		const message = await inbox.methods.message().call();
		assert.equal(message, 'Boom');
	});

	it('can change the message', async () => {
		await inbox.methods.setMessage('Weee').send({ from: accounts[0] });
		const message = await inbox.methods.message().call();
		assert.equal(message, 'Weee');
	});
});
