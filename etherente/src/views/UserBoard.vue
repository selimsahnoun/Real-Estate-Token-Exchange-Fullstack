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
					<li></li>
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
			stateSet: false,
		};
	},
	computed: {
		...mapGetters(['getBalance', 'claimPayment', 'hashMessage']),
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

			let v = '0x' + this.claimSignatureText.slice(128 + 2, 130 + 2);
			let r = '0x' + this.claimSignatureText.slice(2, 64 + 2);
			let s = '0x' + this.claimSignatureText.slice(64 + 2, 128 + 2);
			//--in some cases with the accounts on Ganach, v is 0 or 1 when it's supposed to be 27 or 28
			if (v == '0x00') {
				v = '0x1b';
			} else if (v == '0x01') {
				v = '0x1c';
			}
			const claim = await this.claimPayment({
				amount: claimAmount,
				nonce: parseInt(this.claimNonceText),
				v,
				r,
				s,
			});
			console.log(claim);
		},
	},
};
</script>

<style lang="scss" scoped>
@import './../assets/styles/views/_user_board.scss';
</style>
