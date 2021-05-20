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
		<div class="register-button" @click="register">register</div>
		<div v-if="listOfErrors" class="errors-container">
			<li v-for="error in listOfErrors">{{ error }}</li>
		</div>
	</div>
</template>

<script>
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
		};
	},
	methods: {
		async register() {
			const ip_address = await this.$store.dispatch('getIpAddress');
			if (this.password === this.confirmPassword) {
				this.$store
					.dispatch('register', {
						first_name: this.first_name,
						last_name: this.last_name,
						email: this.email,
						password: this.password,
						ip_address: ip_address,
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
