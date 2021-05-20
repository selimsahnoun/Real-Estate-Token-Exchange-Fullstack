<template>
	<Suspense>
		<template #default>
			<div class="house-big-card-list">
				<div v-for="houseInfos in houseListInfos" :style="'width:70%'">
					<HouseBigCard :houseInfos="houseInfos" />
				</div>
			</div>
		</template>
		<template #fallback> Loading ... </template>
	</Suspense>
</template>

<script>
import HouseBigCard from './HouseBigCard.vue';
import * as houseService from '../../service/houses.service.js';

export default {
	name: 'HouseBigCardList',
	components: { HouseBigCard },
	async setup() {
		let { data: houseListInfos } = await houseService.getHousesList();
		return {
			houseListInfos: houseListInfos,
		};
	},
};
</script>

<style lang="scss" scoped>
.house-big-card-list {
	width: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
	margin: 50px;
	padding-top: 50px;
}
</style>
