<template>
	<Suspense>
		<template #default>
			<div>
				<div class="section-1">
					<div class="rellax parallax-el" data-rellax-speed="4"></div>
					<div class="rellax landing-title" data-rellax-speed="10"></div>
					<div class="rellax landing-sub-title" data-rellax-speed="6"></div>
					<div class="rellax clouds" data-rellax-speed="8"></div>
				</div>
				<div class="section-2">
					<div class="section-2-whitespace"></div>
					<div class="rellax section-2-content" data-rellax-speed="12">
						<h2>Rentier avec 50€</h2>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec
							egestas ex. Nam eget est vel est fringilla placerat. Nullam ac
							vestibulum lectus, quis finibus lorem. Integer rhoncus dolor sem,
							id blandit est mollis ut. Nulla in tortor vitae erat volutpat
							faucibus sed non ex. Phasellus nulla arcu, feugiat eget tellus sit
							amet, hendrerit rutrum nisl. Nam vel ante et mi faucibus faucibus.
							Etiam accumsan fringilla magna sit amet lobortis. Sed feugiat
							augue ut pulvinar luctus. Aliquam ullamcorper eu nibh at
							tincidunt. Pellentesque mollis vel nulla at consectetur.
						</p>
						<HouseCardList />
					</div>
				</div>
			</div>
		</template>
		<template #fallback> Loading ... </template>
	</Suspense>
</template>

<script>
import HouseCardList from '../components/MarketPlace/HouseCardList.vue';
import Rellax from 'rellax';

export default {
	name: 'Home',
	components: { HouseCardList },
	mounted() {
		var rellax = new Rellax('.rellax');
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/views/_home.scss';
</style>
