<template>
	<div class="house-slider-wrapper">
		<!-- Image Slider start -->
		<div class="house-slider">
			<div class="house-slides">
				<!-- radio buttons start -->
				<input
					v-for="(pictureUrl, index) in picturesArray"
					type="radio"
					name="house-pic-radio-button"
					:id="`radio${index}`"
					:key="index"
					:value="`${index}`"
					@change="changeFirstImage"
				/>
				<!-- radio buttons end -->
				<!-- slide images start -->
				<div class="slide">
					<img :src="firstImage" alt="" />
				</div>
				<!-- slide images end -->
				<!-- automatic navigation start -->
				<div class="navigation-auto">
					<div
						v-for="(pictureUrl, index) in picturesArray"
						:key="index"
						:class="[`auto-btn${index}`]"
					></div>
				</div>
				<!-- automatic navigation end -->
				<!-- manual navigation start -->
				<div class="navigation-manual">
					<label
						v-for="(pictureUrl, index) in picturesArray"
						:for="`radio${index}`"
						:key="index"
						class="manual-btn"
					></label>
				</div>
				<!-- manual navigation end -->
			</div>
		</div>
		<!-- Image Slider end -->
	</div>
</template>

<script>
import { ref } from 'vue';
export default {
	name: 'HousePictures',
	props: {
		pictures: {
			type: Array,
			required: true,
			default: ['../../assets/pictures/DummyHouse.jpg'],
		},
	},
	setup(props) {
		let picturesArray = [...props.pictures];
		const firstImage = ref(picturesArray[0]);
		function changeFirstImage(event) {
			firstImage.value = picturesArray[event.target.value];
		}
		return { picturesArray, firstImage, changeFirstImage };
	},
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/components/_house_pictures.scss';
</style>
