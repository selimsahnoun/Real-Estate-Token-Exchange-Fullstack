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
				v-model="recieverAddress"
				type="text"
				name="recieverAddress"
				value
				placeholder="Reciever Address"
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
import * as paimentHelpers from './../../paimentHelpers.js';
import { mapGetters, mapState } from 'vuex';
export default {
	name: 'SendRent',
	computed: {
		...mapState(['web3']),
		...mapGetters(['hashMessage']),
	},
	data() {
		return {
			rentToSend: null,
			messageToSign: null,
			recieverAddress: null,
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
				this.$store.dispatch('sendRentToContract', { rentAmount: rentAmount });
			} catch (error) {
				// Catch any errors for any of the above operations.
				alert(`Send Rent Failed. Check console for details.`);
				console.error(error);
			}
		},
		async signRent() {
			try {
				// 	'0x7dC1E9bb0D4cC9D013c347f8Df427Dbf4c3377C9',
				const amount = await this.web3.web3.utils.toWei(
					this.amount.toString(),
					'ether'
				);
				const hash = await this.hashMessage({
					reciever: this.recieverAddress,
					amount,
					nonce: this.nonce,
				});
				// const hash = await this.web3.web3.utils.soliditySha3(
				// 	{
				// 		t: 'address',
				// 		v: this.recieverAddress,
				// 	},
				// 	{
				// 		t: 'uint256',
				// 		v: amount,
				// 	},
				// 	{
				// 		t: 'uint256',
				// 		v: this.nonce,
				// 	}
				// );
				console.log('hash : ', hash);
				// var signature = await this.web3.web3.eth.personal.sign(
				// 	hash,
				// 	this.web3.accounts[0]
				// );
				var signature = await this.web3.web3.eth.accounts.sign(
					hash,
					'3ea16358ae049a131968351949b1dbf43248b6175e4e26e24bb18bad363809ea'
				);
				// signature =
				// 	signature.substr(0, 130) +
				// 	(signature.substr(130) == '00' ? '1b' : '1c');
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
