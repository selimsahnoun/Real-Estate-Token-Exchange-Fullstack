<template>
	<div class="register-container">
		<h1>Register</h1>
		<div>
			<input
				v-model="first_name"
				type="text"
				name="first_name"
				placeholder="First Name"
			/>
			<input
				v-model="last_name"
				type="text"
				name="last_name"
				placeholder="Last Name"
			/>
			<input v-model="email" type="email" name="email" placeholder="E-mail" />
			<input
				v-model="password"
				type="password"
				name="password"
				placeholder="Password"
			/>
			<input
				v-model="confirmPassword"
				type="password"
				name="password"
				placeholder="Confirm Password"
			/>
		</div>
		<div class="user-address">
			<div class="label">Your contract address</div>
			<div class="contract">{{ userContract }}</div>
		</div>
		<div class="register-button" @click="register">register</div>
		<div v-if="listOfErrors" class="errors-container">
			<li v-for="error in listOfErrors">{{ error }}</li>
		</div>
	</div>
</template>

<script>
import contractInstance from '../getWeb3Instance';
import { mapState } from 'vuex';
export default {
	name: 'RegisterUser',
	computed: { ...mapState(['user']) },
	data() {
		return {
			first_name: '',
			last_name: '',
			email: '',
			password: '',
			confirmPassword: '',
			listOfErrors: null,
			userContract: null,
		};
	},
	async mounted() {
		try {
			const state = await contractInstance();
			this.userContract = state.accounts[0];
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(
				`Failed to load web3, accounts, or contract. Check console for details.`
			);
			console.error(error);
		}
	},
	methods: {
		async register() {
			if (this.password === this.confirmPassword) {
				this.$store
					.dispatch('register', {
						first_name: this.first_name,
						last_name: this.last_name,
						email: this.email,
						password: this.password,
						contract_address: this.userContract,
					})
					.then(() => {
						if (this.user.registerErrors) {
							this.listOfErrors = this.user.registerErrors;
						} else {
							this.$router.push({ name: 'UserBoard' });
						}
					});
			} else {
				this.listOfErrors = ['Password confirmation failed. Try again.'];
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/views/_register.scss';
</style>
