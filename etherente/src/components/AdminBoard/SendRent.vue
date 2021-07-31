<template>
	<div>
		<input type="text" v-model="messageToSign" />
	</div>
</template>

<script>
import * as paimentHelpers from './../../paimentHelpers.js';
import { mapState } from 'vuex';
export default {
	name: 'SendRent',
	computed: {
		...mapState(['web3']),
	},
	data() {
		return {
			messageToSign: null,
		};
	},
	async mounted() {
		try {
			/// Hashing first makes things easier
			const hash = paimentHelpers.hashPayment(
				'0x7dC1E9bb0D4cC9D013c347f8Df427Dbf4c3377C9',
				1,
				1457,
				contractAddress
			);
			this.web3.web3.eth.personal.sign(hash, this.web3.accounts[0], function() {
				console.log('Signed');
			});
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(`Send Rent Failed. Check console for details.`);
			console.error(error);
		}
	},
};
</script>

<style lang="scss" scoped></style>
