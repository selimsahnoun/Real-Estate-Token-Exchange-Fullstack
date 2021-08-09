<template>
	<div class="send-rent-container">
		<h1>Send rent</h1>
		<div>
			<input
				v-model="rentToSend"
				type="number"
				name="rentToSend"
				value
				placeholder="Rent To Send"
			/>
		</div>
		<div class="send-rent-button" @click="sendRent">Send</div>
	</div>
	<div class="send-rent-container">
		<h1>Sign rent</h1>
		<div>
			<input
				v-model="receiverAddress"
				type="text"
				name="receiverAddress"
				value
				placeholder="Receiver Address"
			/>

			<input
				v-model="amount"
				type="number"
				name="amount"
				value
				placeholder="Amount"
			/>
			<input
				v-model="nonce"
				type="number"
				name="nonce"
				value
				placeholder="Nonce"
			/>
		</div>
		<div class="send-rent-button" @click="signRent">Sign</div>
		<div class="signature">{{ signature }}</div>
	</div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
export default {
	name: 'SendRent',
	computed: {
		...mapState(['web3']),
		...mapGetters(['hashMessage', 'getSignature']),
	},
	data() {
		return {
			rentToSend: null,
			messageToSign: null,
			receiverAddress: null,
			amount: null,
			nonce: null,
			signature: null,
		};
	},
	methods: {
		async sendRent() {
			try {
				const rentAmount = await this.web3.web3.utils.toWei(
					this.rentToSend.toString(),
					'ether'
				);
				this.$store.dispatch('sendRentToContract', {
					rentAmount: rentAmount,
				});
			} catch (error) {
				// Catch any errors for any of the above operations.
				alert(`Send Rent Failed. Check console for details.`);
				console.error(error);
			}
		},
		async signRent() {
			try {
				//0xB88a277eB6E9ADb6D86751D2E3bA23059d08B275
				const amount = await this.web3.web3.utils.toWei(
					this.amount.toString(),
					'ether'
				);
				const hash = await this.hashMessage({
					receiver: this.receiverAddress,
					amount,
					nonce: parseInt(this.nonce),
				});
				const { signature } = this.getSignature({ hash: hash });
				this.signature = signature;
			} catch (error) {
				// Catch any errors for any of the above operations.
				alert(`Sign Rent Failed. Check console for details.`);
				console.error(error);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/components/_send_rent.scss';
</style>
