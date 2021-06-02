<template>
	<div class="buy-token">
		<div class="progress-container">
			<div class="progress-title">Tokens remaining in the ERC 20</div>
			<div
				class="progress-bar"
				:data-label="dataLabel"
				style="--token-bar-width: 1"
				:total-tokens="totalTokens"
			></div>
		</div>
		<div class="buy-token-input-container">
			<div class="number-tokens">
				<input name="token-input" type="number" v-model="tokensToTransfer" />
			</div>
			<span class="previous" @click="tokensToTransfer--"></span>
			<span class="next" @click="tokensToTransfer++"></span>
		</div>

		<div class="validate-purchase" @click="sendTokensFromERC20">validate</div>
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
	name: 'BuyToken',
	data() {
		return {
			tokensForTransfer: null,
			totalTokens: null,
			tokensToTransfer: 0,
			totalAmount: 0,
			progressBar: '',
			dataLabel: '',
		};
	},
	async mounted() {
		try {
			this.progressBar = document.getElementsByClassName('progress-bar')[0];
			if (this.web3.erc20Contract) {
				this.totalTokens = await this.getTotalTokens;
				this.tokensForTransfer = await this.getRemainingTokensInERC20;
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
		...mapGetters(['getTotalTokens', 'getRemainingTokensInERC20']),
	},
	methods: {
		async sendTokensFromERC20() {
			const transferStatus = await this.web3.erc20Contract.methods
				.transfer(this.web3.saleContract.options.address, this.tokensToTransfer)
				.send({ from: this.web3.accounts[0] });
			location.reload();
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
@import '../../assets/styles/components/_buy_tokens.scss';
</style>
