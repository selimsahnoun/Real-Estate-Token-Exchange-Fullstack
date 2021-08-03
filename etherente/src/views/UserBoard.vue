<template>
	<div v-if="user.user" class="board-container">
		<div class="board-wrapper">
			<div class="title-column">
				<ul>
					<li>first name</li>
					<li>last name</li>
					<li>email</li>
					<li>User Address</li>
					<li>balance</li>
					<li>{{ claim }}</li>
					<li class="claim-button" @click="paymentClaim">claim payment</li>
					<li></li>
				</ul>
			</div>
			<div class="info-column">
				<ul>
					<li>{{ user.user.first_name }}</li>
					<li>{{ user.user.last_name }}</li>
					<li>{{ user.user.email }}</li>
					<li>{{ user.user.contract_address }}</li>
					<li class="balance">
						<div v-if="!balance" @click="balanceCheck()">
							click here for balance
						</div>
						<div v-if="balance">{{ balance }} tokens</div>
					</li>
					<li class="claim-input">
						<div class="claim-input-container">
							<input type="text" required v-model="claimAmountText" />
							<div class="underline"></div>
							<label>Copy amount here</label>
						</div>
					</li>
					<li class="claim-input">
						<div class="claim-input-container">
							<input type="text" required v-model="claimNonceText" />
							<div class="underline"></div>
							<label>Copy nonce here</label>
						</div>
					</li>
					<li class="claim-input">
						<div class="claim-input-container">
							<input type="text" required v-model="claimSignatureText" />
							<div class="underline"></div>
							<label>Copy signature here</label>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import contractInstance from '../getWeb3Instance';
import * as paimentHelpers from '../paimentHelpers';
import { mapState, mapGetters } from 'vuex';
export default {
	name: 'UserBoard',
	data() {
		return {
			balance: null,
			claimText: null,
			claimSignatureText: null,
			claimAmountText: null,
			claimNonceText: null,
			claim: null,
		};
	},
	computed: {
		...mapGetters(['getBalance', 'claimPayment']),
		...mapState(['user', 'web3']),
	},
	async created() {
		try {
			const state = await contractInstance();
			this.$store.dispatch('setAllState', state);
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(
				`Failed to load web3, accounts, or contract. Check console for details.`
			);
			console.error(error);
		}
	},
	methods: {
		async balanceCheck() {
			const balance = await this.getBalance(this.user.user.contract_address);
			this.balance = balance;
		},
		async paymentClaim() {
			const claimAmount = await this.web3.web3.utils.toWei(
				this.claimAmountText.toString(),
				'ether'
			);
			const claim = await this.claimPayment({
				amount: claimAmount,
				nonce: this.claimNonceText,
				signature: this.claimSignatureText,
			});
			console.log(claim);
		},
	},
};
</script>

<style lang="scss" scoped>
@import './../assets/styles/views/_user_board.scss';
</style>
