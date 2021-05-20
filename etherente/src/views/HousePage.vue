<template>
	<div>
		<div><HousePictures :pictures="pictures" /></div>
		<div>
			<HouseDetails
				:houseId="houseId"
				:propertyHighlights="propertyHighlights"
				:financialHighlights="financialHighlights"
				@buyTokenClick="showModal"
			/>
		</div>
	</div>
	<div class="token-modal">
		<div v-if="showBuyTokenModal" class="buy-token-container">
			<BuyToken />
		</div>
		<div id="overlay" @click="hideModal"></div>
	</div>
</template>

<script>
import HousePictures from '../components/HousePage/HousePictures.vue';
import HouseDetails from '../components/HousePage/HouseDetails.vue';
import BuyToken from '../components/HousePage/BuyToken.vue';
import * as houseService from '../service/houses.service.js';

export default {
	name: 'HousePage',
	components: { HousePictures, HouseDetails, BuyToken },
	props: {
		id: { type: String, required: true, default: '60a234124e064b11c549ac70' },
	},
	async setup(props) {
		let { data: houseInfos } = await houseService.getHouseDetails(props.id);
		let picturesArray = [];
		for (var i = 0; i < houseInfos.pictures.length; i++) {
			picturesArray.push(houseInfos.pictures[i].url);
		}
		return {
			houseId: houseInfos.id,
			pictures: picturesArray,
			propertyHighlights: houseInfos.propertyHighlights,
			financialHighlights: houseInfos.financialHighlights,
		};
	},
	data() {
		return { showBuyTokenModal: false };
	},
	methods: {
		showModal() {
			this.showBuyTokenModal = true;
			const overlay = document.getElementById('overlay');
			overlay.classList.add('active-overlay');
		},
		hideModal() {
			this.showBuyTokenModal = false;
			const overlay = document.getElementById('overlay');
			overlay.classList.remove('active-overlay');
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/views/_house_page.scss';
</style>
