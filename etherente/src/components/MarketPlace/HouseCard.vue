<template>
	<div class="house-card">
		<div
			class="house-card-image"
			:style="
				`background: url(${houseInfos.pictures[0].url}) no-repeat 50% 50%`
			"
		></div>
		<div class="house-card-text">
			<span class="date">4 days ago</span>
			<h2>{{ houseInfos.propertyHighlights.city }}</h2>
			<p>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo sapiente
				optio assumenda, necessitatibus molestiae temporibus fuga est vitae.
			</p>
		</div>
		<div class="house-card-stats">
			<div class="stat right-border">
				<div class="type">Part minimum</div>
				<div class="value">
					€ {{ houseInfos.propertyHighlights.tokenPrice }}
				</div>
			</div>
			<div class="stat">
				<div class="type">Rentabilité</div>
				<div class="value">
					% {{ houseInfos.propertyHighlights.expectedYield }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HouseCard',
	props: ['houseInfos'],
};
</script>

<style lang="scss" scoped>
@import url('../../assets/styles/components/_house_card.scss');
</style>
