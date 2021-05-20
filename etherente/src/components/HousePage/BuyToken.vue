<template>
	<div class="buy-token">
		<div class="progress-container">
			<div class="progress-title">Tokens remaining</div>
			<div
				class="progress-bar"
				:data-label="dataLabel"
				style="--token-bar-width: 1"
				:total-tokens="totalTokens"
			></div>
		</div>
		<div class="buy-token-input-container">
			<div class="number-tokens">
				<input name="token-input" type="number" v-model="tokensToBuy" />
			</div>
			<span class="previous" @click="tokensToBuy--"></span>
			<span class="next" @click="tokensToBuy++"></span>
		</div>
		<div class="price-container">
			<div class="price-title">Price</div>
			<div class="price-value">
				{{ (totalAmount = (tokensToBuy * price).toFixed(4)) }} Ether
			</div>
		</div>
		<div class="validate-purchase" @click="purchaseTokens">validate</div>
	</div>
</template>

<script>
import ImmoTokenSaleContract from '../../contracts/ImmoTokenSale.json';
import ImmoTokenContract from '../../contracts/ImmoToken.json';
import getWeb3 from '../../getWeb3';
import { mapState, mapGetters } from 'vuex';
export default {
	name: 'BuyToken',
	data() {
		return {
			tokensForSale: null,
			totalTokens: null,
			tokensToBuy: 0,
			price: 0.0001,
			totalAmount: 0,
			progressBar: '',
			dataLabel: '',
		};
	},
	async mounted() {
		try {
			this.progressBar = document.getElementsByClassName('progress-bar')[0];
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
			this.totalTokens = await this.getTotalTokens;
			this.tokensForSale = await this.getTokensLeftForSale;
			if (!this.tokensForSale) {
				console.log('transfer not done');
				const transferStatus = await ImmoTokenInstance.methods
					.transfer(this.saleContract.options.address, this.totalTokens - 10)
					.send({ from: accounts[0] });
				this.$store.dispatch('transferDone', true);
			}
			this.progressBarWidth();
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(
				`Failed to load web3, accounts, or contract. Check console for details.`
			);
			console.error(error);
		}
	},
	computed: {
		...mapState([
			'web3',
			'accounts',
			'saleContract',
			'erc20Contract',
			'storageValue',
			'transferDone',
		]),
		...mapGetters(['getTotalTokens', 'getTokensLeftForSale']),
	},
	methods: {
		async purchaseTokens() {
			let purchase = {
				tokens: this.tokensToBuy,
				value: this.web3.utils.toWei(this.totalAmount.toString(), 'ether'),
			};
			this.$store.dispatch('buyTokens', purchase);
			this.tokensToBuy = 0;
		},
		progressBarWidth() {
			const maxWidth = Math.floor(
				(this.tokensForSale * 100) / this.totalTokens
			);
			this.dataLabel =
				new Intl.NumberFormat('en-US').format(this.tokensForSale).toString() +
				' tokens';
			var interval = setInterval(() => {
				const computedStyle = getComputedStyle(this.progressBar);
				const progressWidth =
					parseFloat(computedStyle.getPropertyValue('--token-bar-width')) || 0;
				this.progressBar.style.setProperty(
					'--token-bar-width',
					progressWidth + 1
				);
				if (progressWidth > maxWidth) {
					clearInterval(interval);
				}
			}, 15);
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/components/_buy_tokens.scss';
</style>
