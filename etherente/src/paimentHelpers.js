import { ethers } from 'ethers';

// recipient is the address that should be paid.
// amount, in wei, specifies how much ether should be sent.
// nonce can be any unique number to prevent replay attacks
// contractAddress is used to prevent cross-contract replay attacks
export const hashPayment = (recipient, amount, nonce, contractAddress) => {
	var hash =
		'0x' +
		ethers.utils
			.solidityKeccak256(
				['address', 'uint256', 'uint256', 'address'],
				[recipient, amount, nonce, contractAddress]
			)
			.toString('hex');

	return hash;
};
