<template>
	<div class="login-container">
		<h1>Login</h1>
		<div>
			<input
				v-model="email"
				type="email"
				name="email"
				value
				placeholder="E-mail"
			/>

			<input
				v-model="password"
				type="password"
				name="password"
				value
				placeholder="Password"
			/>
		</div>
		<div class="login-button" @click="login">Login</div>
		<div class="register-change">
			if not registered please register
			<a
				><router-link :to="{ name: 'Register' }" style="text-decoration: none;"
					>here</router-link
				>
			</a>
		</div>
		<div v-if="listOfErrors" class="errors-container">
			<li v-for="error in listOfErrors">{{ error }}</li>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'LoginUser',
	computed: { ...mapState(['user']) },
	data() {
		return {
			email: '',
			password: '',
			listOfErrors: null,
		};
	},
	methods: {
		login() {
			this.$store
				.dispatch('login', {
					email: this.email,
					password: this.password,
				})
				.then(() => {
					if (this.user.loginErrors) {
						this.listOfErrors = this.user.loginErrors;
						this.email = '';
						this.password = '';
					} else {
						this.$router.push({ name: 'UserBoard' });
					}
				});
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/views/_login.scss';
</style>
