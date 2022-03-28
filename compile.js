import fs from 'fs';
import solc from 'solc';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inboxContractSource = fs.readFileSync(
	path.resolve(__dirname, 'contracts', 'Inbox.sol'),
	'utf-8'
);

const inboxContract = {
	language: 'Solidity',
	sources: {
		'Inbox.sol': {
			content: inboxContractSource,
		},
	},
	settings: {
		outputSelection: {
			'*': {
				'*': ['*'],
			},
		},
	},
};

export default JSON.parse(solc.compile(JSON.stringify(inboxContract)))
	.contracts['Inbox.sol'].Inbox;
