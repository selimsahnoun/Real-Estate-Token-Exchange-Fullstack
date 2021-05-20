<template>
	<div class="back-image">
		<NavBar />
		<Suspense>
			<template #default>
				<router-view />
			</template>
			<template #fallback>
				<div>Loading ...</div>
			</template>
		</Suspense>
	</div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import MarketPlace from '@/views/MarketPlace.vue';
import HousePage from '@/views/HousePage.vue';
export default {
	components: { NavBar, MarketPlace, HousePage },
	async created() {
		const userString = localStorage.getItem('user');
		if (userString) {
			const userData = JSON.parse(userString);
			this.$store.dispatch('verifySession', userData);
		}
	},
};
</script>

<style lang="scss">
@import url('./assets/styles/main.scss');
.back-image {
	width: 100%;
	background: url('./assets/pictures/background.png') no-repeat 50% 50%;
	height: 100vh;
	background-size: cover;
	position: absolute;
}
</style>
