<template>
	<div class="section-2-house-list">
		<div class="left-switch"></div>
		<div class="house-card-wrapper">
			<div v-for="houseInfos in houseListToRender">
				<router-link
					:to="{ name: 'HousePage', params: { id: houseInfos._id } }"
				>
					<HouseCard :houseInfos="houseInfos"
				/></router-link>
			</div>
		</div>
		<div class="right-switch" @click="toggleRight"></div>
	</div>
</template>

<script>
import HouseCard from './HouseCard.vue';
import * as houseService from '../../service/houses.service.js';
export default {
	name: 'HouseCardList',
	components: { HouseCard },
	async created() {
		let { data: houseListInfos } = await houseService.getHousesList();

		this.houseList = [...houseListInfos];
		this.houseListToRender = [
			houseListInfos[0],
			houseListInfos[1],
			houseListInfos[2],
		];
	},
	data: () => ({
		houseList: [],
		houseListToRender: [],
	}),
	methods: {
		toggleRight: function() {
			this.houseListToRender = [
				this.houseList[3],
				this.houseList[4],
				this.houseList[5],
			];
			console.log('toggle right clicked');
		},
	},
};
</script>

<style lang="scss" scoped>
.section-2-house-list {
	display: grid;
	width: 100%;
	grid-template-columns: 10% 1fr 10%;
}
.house-card-wrapper {
	margin: 0 20px 0 20px;
	display: flex;
	align-items: center;
	justify-content: space-around;
	flex-direction: row;
}

.left-switch {
	background: url('../../assets/pictures/polygone2.png') no-repeat 50% 50%;
	cursor: pointer;
}
.right-switch {
	background: url('../../assets/pictures/polygone1.png') no-repeat 50% 50%;
	cursor: pointer;
}
</style>
