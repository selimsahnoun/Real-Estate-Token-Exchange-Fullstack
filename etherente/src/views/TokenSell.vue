<template>
	<div class="sell-token">
		<div class="progress-container">
			<div class="progress-title">Tokens in your balance</div>
			<div
				class="progress-bar"
				:data-label="dataLabel"
				style="--token-bar-width: 1"
				:total-tokens="totalTokens"
			></div>
		</div>
		<div class="buy-token-input-container">
			<div class="number-tokens">
				<input
					name="token-input"
					type="number"
					step="0.0000001"
					v-model="tokensToSell"
				/>
			</div>
			<span class="previous" @click="tokensToSell--"></span>
			<span class="next" @click="tokensToSell++"></span>
		</div>
		<div class="sell-token-price-input-container">
			<input type="number" required v-model="price" />
			<div class="underline"></div>
			<label>Price in Finney per Token</label>
		</div>
		<div class="price-container">
			<div class="price-title">Total amount</div>
			<div class="price-value">
				{{
					(totalAmount = (tokensToSell * price * Math.pow(10, -3)).toFixed(4))
				}}
				Ether
			</div>
		</div>
		<div class="validate-purchase" @click="offerTokenForSale">validate</div>
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import contractInstance from '../getWeb3Instance';
export default {
	name: 'TokenSell',
	data() {
		return {
			tokensForTransfer: null,
			totalTokens: null,
			tokensToSell: 0,
			totalAmount: 0,
			progressBar: '',
			dataLabel: '',
			price: null,
		};
	},
	async mounted() {
		try {
			const state = await contractInstance();
			this.$store.dispatch('setAllState', state);
			this.progressBar = document.getElementsByClassName('progress-bar')[0];
			if (this.web3.erc20Contract) {
				this.totalTokens = await this.getTotalTokens;
				this.tokensForTransfer = await this.getBalance(this.web3.accounts[0]);
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
		...mapState(['web3']),
		...mapGetters([
			'getTotalTokens',
			'getRemainingTokensInERC20',
			'getBalance',
		]),
	},
	methods: {
		offerTokenForSale() {
			const price = this.web3.web3.utils.toWei(
				(this.price * Math.pow(10, -3)).toString(),
				'ether'
			);

			this.$store.dispatch('sellTokens', {
				tokens: this.tokensToSell,
				price: price,
			});
			//location.reload();
		},
		progressBarWidth() {
			const maxWidth = Math.floor(
				(this.tokensForTransfer * 100) / this.totalTokens
			);
			this.dataLabel =
				new Intl.NumberFormat('en-US')
					.format(this.tokensForTransfer)
					.toString() + ' tokens';
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
@import '../assets/styles/views/_tokensell.scss';
</style>
