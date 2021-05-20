<template>
	<div class="house-details-container">
		<div class="address">{{ propertyHighlights.address }}</div>
		<div class="house-details">
			<!-- Property Highlights Card------------------------------------------------------>
			<div class="house-highlights" id="propertyCard">
				<h1>Property Highlights</h1>
				<div class="highlights-row">
					<div class="row-text"><h3>Expected Yield</h3></div>
					<div class="row-value">
						<h3>{{ propertyHighlights.expectedYield }}%</h3>
					</div>
				</div>
				<div class="highlights-row">
					<div class="row-text"><span>Rent Start Date</span></div>
					<div class="row-value">
						<span>{{ propertyHighlights.rentStartDate }}</span>
					</div>
				</div>
				<div class="highlights-row">
					<div class="row-text"><span>Rent Per Token</span></div>
					<div class="row-value">
						<span>€ {{ propertyHighlights.rentperToken }}</span>
					</div>
				</div>
				<div class="highlights-row">
					<div class="row-text"><span>Token Price</span></div>
					<div class="row-value">
						<span>€ {{ propertyHighlights.tokenPrice }}</span>
					</div>
				</div>
				<div class="highlights-row">
					<div class="row-text"><span>Total Tokens</span></div>
					<div class="row-value">
						<span>{{ propertyHighlights.totalTokens }}</span>
					</div>
				</div>
				<div class="highlights-row prop-type">
					<div class="row-text"><h4>Property Type</h4></div>
					<div class="row-value">
						<h4>{{ propertyHighlights.propertyType }}</h4>
					</div>
				</div>
				<div class="highlights-row">
					<div class="row-text"><span>Neighborhood</span></div>
					<div class="row-value">
						<span>{{ propertyHighlights.neighborhood }}</span>
					</div>
				</div>
				<div class="highlights-row">
					<div class="row-text"><span>Area</span></div>
					<div class="row-value">
						<span>{{ propertyHighlights.area }}m²</span>
					</div>
				</div>
				<div class="highlights-row">
					<div class="row-text"><span>Lot Size</span></div>
					<div class="row-value">
						<span>{{ propertyHighlights.lotSize }}</span>
					</div>
				</div>
				<div class="highlights-row">
					<div class="row-text"><span>Rooms</span></div>
					<div class="row-value">
						<span>{{ propertyHighlights.bedrooms }}</span>
					</div>
				</div>
				<div class="highlights-row">
					<div class="row-text"><span>Status</span></div>
					<div class="row-value">
						<span>{{ propertyHighlights.rented }}</span>
					</div>
				</div>
				<div class="highlights-row">
					<div class="row-text"><span>Legal liability</span></div>
					<div class="row-value">
						<span>{{ propertyHighlights.legalLiability }}</span>
					</div>
				</div>
				<div class="prop-footer">
					We are targeting the above equity multiple for investors; however, no
					assurance can be given that you will obtain any return on investment,
					and there is a risk that you can lose your entire investment.
				</div>
			</div>
			<!-- Financial Highlights Card------------------------------------------------------>
			<div class="house-highlights">
				<h1>Financial Highlights</h1>
				<div class="highlights-row">
					<div class="row-text"><span>Gross Rent / Year</span></div>
					<div class="row-value">
						<span>€ {{ financialHighlights.grossRentPerYear }}</span>
					</div>
				</div>
				<div class="highlights-row">
					<div class="row-text"><span>Gross Rent / Month</span></div>
					<div class="row-value">
						<span>€ {{ financialHighlights.grossRentPerMonth }}</span>
					</div>
				</div>
				<div class="highlights-row">
					<div class="row-text"><span>Monthly Costs</span></div>
					<div class="row-value">
						<span>€ {{ financialHighlights.monthlyCosts }}</span>
					</div>
				</div>
				<div class="highlights-row">
					<div class="row-text"><span>Net Rent / Month</span></div>
					<div class="row-value">
						<span>€ {{ financialHighlights.netRentPerMonth }}</span>
					</div>
				</div>
				<div class="seperator"></div>
				<div class="highlights-row prop-type">
					<div class="row-text"><h4>Net Rent / Year</h4></div>
					<div class="row-value">
						<h4>€ {{ financialHighlights.netRentPerYear }}</h4>
					</div>
				</div>
				<div class="highlights-row ">
					<div class="row-text"><span>Maintenance Reserve</span></div>
					<div class="row-value">
						<span>€ {{ financialHighlights.maintenanceReserve }}</span>
					</div>
				</div>
				<div class="highlights-row ">
					<div class="row-text"><span>Total Investment</span></div>
					<div class="row-value">
						<span>€ {{ financialHighlights.totalInvestment }}</span>
					</div>
				</div>
				<div class="highlights-row">
					<div class="row-text"><h3>Expected Yield</h3></div>
					<div class="row-value">
						<h3>{{ financialHighlights.expectedYield }}%</h3>
					</div>
				</div>
				<div class="prop-footer">
					All financial statements of property yield are best estimates based on
					current conditions, and can change at any time.
				</div>
			</div>
			<!-- Button to buy token------------------------------------------------------>
			<a class="buy-token-btn" @click="buyTokenEvent">
				Buy Tokens
			</a>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HouseDetails',
	props: {
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
			},
		},
	},
	setup(props) {
		return {
			houseId: props.houseId,
			propertyHighlights: props.propertyHighlights,
			financialHighlights: props.financialHighlights,
		};
	},
	methods: {
		buyTokenEvent() {
			this.$emit('buyTokenClick');
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/components/_house_details.scss';
</style>
