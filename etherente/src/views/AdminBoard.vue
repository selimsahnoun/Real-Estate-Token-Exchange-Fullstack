<template>
	<div class="admin-container" v-if="contractCalled">
		<SendTokens />
		<TransactionList />
		<SendRent />
	</div>
</template>

<script>
import SendTokens from '../components/AdminBoard/SendTokens.vue';
import TransactionList from '../components/AdminBoard/TransactionList.vue';
import SendRent from '../components/AdminBoard/SendRent.vue';

import contractInstance from '../getWeb3Instance';
export default {
	name: 'AdminBoard',
	components: { SendTokens, TransactionList, SendRent },
	data() {
		return {
			contractCalled: false,
			listOfTransactions: null,
		};
	},
	async mounted() {
		try {
			const state = await contractInstance();
			this.$store.dispatch('setAllState', state);
			this.contractCalled = true;
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(
				`Failed to load web3, accounts, or contract. Check console for details.`
			);
			console.error(error);
		}
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/views/_adminboard.scss';
</style>
