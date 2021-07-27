<template>
	<header>
		<router-link :to="{ name: 'Home' }" :class="'logo-text'"
			>EtheRente.</router-link
		>
		<nav id="homepage-navbar">
			<ul id="homepage-navlinks">
				<li>
					<router-link :to="{ name: 'Marketplace' }" :class="'navlinks'"
						>RE Marketplace</router-link
					>
				</li>
				<li>
					<router-link
						v-if="loggedIn"
						:to="{ name: 'TokenSell' }"
						:class="'navlinks'"
						>Sell Tokens</router-link
					>
				</li>
				<li>
					<router-link :to="{ name: 'TokenMarket' }" :class="'navlinks'"
						>Tokens for sale</router-link
					>
				</li>
				<li v-if="loggedIn">
					<router-link
						v-if="admin"
						:to="{ name: 'AdminBoard' }"
						:class="'navlinks'"
						>Admin Board</router-link
					>
					<router-link v-else :to="{ name: 'UserBoard' }" :class="'navlinks'"
						>User Board</router-link
					>
				</li>
			</ul>
		</nav>
		<a v-if="!loggedIn" class="etherestate-button-1">
			<router-link
				:to="{ name: 'LoginUser' }"
				style="text-decoration: none; color: inherit;"
				>LOG IN</router-link
			>
		</a>
		<a v-else class="etherestate-button-1" @click="logout">
			<router-link
				:to="{ name: 'Home' }"
				style="text-decoration: none; color: inherit;"
				>LOG OUT</router-link
			>
		</a>
	</header>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'NavBar',
	computed: { ...mapGetters(['loggedIn', 'admin']) },
	setup() {},
	methods: {
		logout() {
			this.$store.dispatch('logout');
			this.$router.push({ name: 'Home' });
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/main.scss';
@import '../assets/styles/components/_navbar.scss';
</style>
