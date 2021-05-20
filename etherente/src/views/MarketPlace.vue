<template>
	<Suspense>
		<template #default>
			<div>
				<HouseBigCardList />
				<HouseCardList /></div
		></template>
		<template #fallback> Loading ... </template>
	</Suspense>
</template>

<script>
import HouseCardList from '../components/MarketPlace/HouseCardList.vue';
import HouseBigCardList from '../components/MarketPlace/HouseBigCardList.vue';
export default {
	name: 'MarketPlace',
	components: { HouseCardList, HouseBigCardList },
};
</script>

<style lang="scss" scoped></style>
