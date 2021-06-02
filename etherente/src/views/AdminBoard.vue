<template>
	<div class="admin-container" v-if="contractCalled">
		<SendTokens />
		<TransactionList />
	</div>
</template>

<script>
import SendTokens from '../components/AdminBoard/SendTokens.vue';
import TransactionList from '../components/AdminBoard/TransactionList.vue';
import ImmoTokenSaleContract from '../contracts/ImmoTokenSale.json';
import ImmoTokenContract from '../contracts/ImmoToken.json';
import getWeb3 from '../getWeb3';
export default {
	name: 'AdminBoard',
	components: { SendTokens, TransactionList },
	data() {
		return {
			contractCalled: false,
			listOfTransactions: null,
		};
	},
	async mounted() {
		try {
			// Get network provider and web3 instance.
			const web3 = await getWeb3();
			// Use web3 to get the user's accounts.
			const accounts = await web3.eth.getAccounts();
			// Get the contract instance.
			const networkId = await web3.eth.net.getId();

			const deployedSaleNetwork = ImmoTokenSaleContract.networks[networkId];
			const deployedErc20Network = ImmoTokenContract.networks[networkId];

			const ImmoTokenInstance = new web3.eth.Contract(
				ImmoTokenContract.abi,
				deployedErc20Network && deployedErc20Network.address
			);
			const ImmoTokenSaleInstance = new web3.eth.Contract(
				ImmoTokenSaleContract.abi,
				deployedSaleNetwork && deployedSaleNetwork.address
			);
			this.$store.dispatch('setWeb3', web3);
			this.$store.dispatch('setAccounts', accounts);
			this.$store.dispatch('setSaleContract', ImmoTokenSaleInstance);
			this.$store.dispatch('setErc20Contract', ImmoTokenInstance);
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
