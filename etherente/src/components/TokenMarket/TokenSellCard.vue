<template>
	<div class="sell-token">
		<div class="progress-container">
			<div class="progress-title">Tokens for Sale</div>
			<div
				class="progress-bar"
				:id="`progress-bar-${cardId}`"
				:data-label="dataLabel"
				style="--token-bar-width: 1"
				:total-tokens="tokens"
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
			<div class="price-title">Price of Token</div>
			<div class="price-unit-value">
				{{ priceInFinney }}
				Finney
			</div>
		</div>
		<div class="price-container">
			<div class="price-title">Total amount</div>
			<div class="price-value">
				{{ (totalAmount = parseFloat(tokensToBuy * priceInEther).toFixed(4)) }}
				Ether
			</div>
		</div>
		<div class="validate-purchase" @click="purchaseTokens">validate</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'TokenSellCard',
	data() {
		return {
			progressBar: null,
			tokensToBuy: 0,
			totalAmount: null,
			dataLabel: '',
			priceInFinney: null,
			priceInEther: null,
		};
	},
	computed: {
		...mapState(['web3']),
	},
	props: {
		tokens: { type: Number, required: true },
		price: { type: String, required: true },
		cardId: { type: Number, required: true },
		seller: { type: String, required: true },
		index: { type: String, required: true },
	},
	async mounted() {
		try {
			this.progressBar = document.getElementsByClassName('progress-bar')[
				this.cardId
			];
			this.progressBarWidth();
			this.priceInFinney = await this.web3.web3.utils.fromWei(
				this.price.toString(),
				'finney'
			);
			this.priceInEther = await this.web3.web3.utils.fromWei(
				this.price.toString(),
				'ether'
			);
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(
				`Failed to load web3, accounts, or contract. Check console for details.`
			);
			console.error(error);
		}
	},
	methods: {
		async purchaseTokens() {
			let purchase = {
				amount: this.tokensToBuy,
				price: this.web3.web3.utils.toWei(this.totalAmount.toString(), 'ether'),
				seller: this.seller,
				index: this.index,
			};

			this.$store.dispatch('buyOfferTokens', purchase);
			this.tokensToBuy = 0;
		},
		progressBarWidth() {
			const maxWidth = 100;
			this.dataLabel =
				new Intl.NumberFormat('en-US').format(this.tokens).toString() +
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
@import '../../assets/styles/components/_token_card_sell.scss';
</style>
