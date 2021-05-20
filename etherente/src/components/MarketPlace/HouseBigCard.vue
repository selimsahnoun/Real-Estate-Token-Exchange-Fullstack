<template>
	<div class="house-big-card">
		<div
			class="house-big-card-image"
			:style="`background: url(${picture}) no-repeat 50% 50%`"
		></div>
		<div class="house-big-card-text">
			<div class="address">
				<h2>{{ propertyHighlights.address }}</h2>
			</div>
			<div class="prices">
				<div class="total-price">
					<h2>Total Price</h2>
					<span>€ {{ financialHighlights.totalInvestment }}</span>
				</div>
				<div class="token-price">
					<h2>Token Price</h2>
					<span>€ {{ propertyHighlights.tokenPrice }}</span>
				</div>
			</div>
			<div class="details">
				<div class="expected-yld detail-row">
					<div class="row-text">Expected Yield</div>
					<div class="row-value">{{ financialHighlights.expectedYield }} %</div>
				</div>
				<div class="detail-row">
					<div class="row-text">Gross Rent</div>
					<div class="row-value">
						€ {{ financialHighlights.grossRentPerYear }} / year
					</div>
				</div>
				<div class="detail-row">
					<div class="row-text">Rent Per Token</div>
					<div class="row-value">
						€ {{ propertyHighlights.rentperToken }} / year
					</div>
				</div>
			</div>
			<div class="buy-button ">
				<router-link :to="{ name: 'HousePage', params: { id: id } }"
					><button class="etherestate-button-1">
						view property
					</button></router-link
				>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HouseBigCard',
	props: {
		houseInfos: {
			propertyHighlights: {
				type: Object,
				required: true,
				default: {
					address: 'will be released soon',
					expectedYield: 'will be released soon',
					rentStartDate: 'will be released soon',
					rentperToken: 'will be released soon',
					tokenPrice: 'will be released soon',
					totalTokens: 'will be released soon',
					propertyType: 'will be released soon',
					neighborhood: 'will be released soon',
					squareFeet: 'will be released soon',
					lotSize: 'will be released soon',
					'bedroom/Bath': 'will be released soon',
					rented: 'will be released soon',
					section8: 'will be released soon',
				},
			},
			financialHighlights: {
				type: Object,
				required: true,
				default: {
					grossRentPerYear: 'will be released soon',
					grossRentPerMonth: 'will be released soon',
					monthlyCosts: 'will be released soon',
					netRentPerMonth: 'will be released soon',
					netRentPerYear: 'will be released soon',
					totalInvestment: 'will be released soon',
					expectedYield: 'will be released soon',
					maintenanceReserve: 'will be released soon',
					totalPrice: 'will be released soon',
				},
			},
		},
	},
	setup(props) {
		return {
			id: props.houseInfos._id,
			propertyHighlights: props.houseInfos.propertyHighlights,
			financialHighlights: props.houseInfos.financialHighlights,
			picture: props.houseInfos.pictures[0].url,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/components/_house_big_card.scss';
</style>
