<template>
	<header>
		<router-link :to="{ name: 'Home' }" :class="'logo-text'"
			>EtheRente.</router-link
		>
		<nav id="homepage-navbar">
			<ul id="homepage-navlinks">
				<li>
					<router-link :to="{ name: 'Marketplace' }" :class="'navlinks'"
						>Marketplace</router-link
					>
				</li>
				<li>
					<router-link :to="{ name: 'Marketplace' }" :class="'navlinks'"
						>About Tokens</router-link
					>
				</li>
				<li>
					<router-link :to="{ name: 'Marketplace' }" :class="'navlinks'"
						>Contact</router-link
					>
				</li>
				<li>
					<router-link :to="{ name: 'Marketplace' }" :class="'navlinks'"
						>FAQ</router-link
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
	computed: { ...mapGetters(['loggedIn']) },
	setup() {
		// function logout() {
		// }
		// return { logout };
	},
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
#homepage-navbar {
	width: 40%;
}
#homepage-navlinks {
	display: -webkit-flex;
	display: -moz-flex;
	display: -ms-flex;
	display: -o-flex;
	display: flex;
	justify-content: space-between;
	align-items: stretch;
	list-style: none;
	margin: 2vh auto 0 auto;
}

.navlinks {
	cursor: pointer;
	transition: all 0.3s ease 0s;
	color: #578688;
}
.navlinks:visited {
	color: #578688;
}
.navlinks:hover {
	color: white;

	&::after {
		content: ' ';
		border-bottom: 5px solid #578688;
		border-radius: 10px;
		display: block;
	}
}
</style>
