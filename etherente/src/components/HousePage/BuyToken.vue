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
import contractInstance from '../../getWeb3Instance';
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
			const state = await contractInstance();
			this.$store.dispatch('setAllState', state);
			this.totalTokens = await this.getTotalTokens;
			this.tokensForSale = await this.getTokensLeftForSale;

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
		...mapState(['web3']),
		...mapGetters(['getTotalTokens', 'getTokensLeftForSale']),
	},
	methods: {
		async purchaseTokens() {
			let purchase = {
				tokens: this.tokensToBuy,
				value: this.web3.web3.utils.toWei(this.totalAmount.toString(), 'ether'),
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
