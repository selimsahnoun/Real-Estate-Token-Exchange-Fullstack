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
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import contractInstance from '../getWeb3Instance';
import { mapState, mapGetters } from 'vuex';
import { stat } from 'fs';
export default {
	name: 'UserBoard',
	data() {
		return {
			balance: null,
		};
	},
	computed: { ...mapGetters(['getBalance']), ...mapState(['user', 'web3']) },
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
	},
};
</script>

<style lang="scss" scoped>
@import './../assets/styles/views/_user_board.scss';
</style>
