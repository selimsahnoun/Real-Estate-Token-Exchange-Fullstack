<template>
	<div class="transaction-container">
		<div class="transaction">
			<span>address</span>
			<span>balance in tokens</span>
		</div>
		<div class="transaction" v-for="transaction in transactionList">
			<span>{{ transaction.address }}</span>
			<span>{{ transaction.balance }} tokens</span>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as transactionService from '../../service/transaction.service.js';
export default {
	name: 'TransactionList',
	computed: {
		...mapGetters(['getBalance']),
	},
	data() {
		return {
			transactionList: [],
		};
	},
	async mounted() {
		var addressList = await transactionService.fetchAllAddresses();

		for (var i = 0; i < addressList.length; i++) {
			const balance = await this.getBalance(addressList[i]);
			this.transactionList.push({
				address: addressList[i],
				balance,
			});
		}
	},
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/components/_transaction_list.scss';
</style>
