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
	background: url('https://firebasestorage.googleapis.com/v0/b/etherente.appspot.com/o/background.png?alt=media&token=97aba1b1-f09b-43c2-ac98-1e8b85f9cc0c')
		no-repeat 50% 50%;
	height: 100vh;
	background-size: cover;
	position: absolute;
}
</style>
