<template>
	<div
		v-if="offersRecieved"
		v-for="(offer, index) in offersList"
		:key="offer._id"
	>
		<TokenSellCard
			:tokens="offer.tokens"
			:price="offer.price"
			:cardId="index"
			:seller="offer.seller"
			:index="offer.index"
		/>
	</div>
</template>

<script>
import contractInstance from '../getWeb3Instance';
import { mapGetters, mapState } from 'vuex';
import * as transactionService from '../service/transaction.service.js';
import TokenSellCard from '../components/TokenMarket/TokenSellCard.vue';
export default {
	name: 'TokenMarket',
	components: { TokenSellCard },
	data() {
		return { offersList: [], offersRecieved: false };
	},
	async mounted() {
		try {
			const state = await contractInstance();
			this.$store.dispatch('setAllState', state);
			const offers = await transactionService.fetchAllOffers();
			let calledSellers = [];
			for (var i = 0; i < offers.length; i++) {
				//We want to loop through the offers of a seller only one time
				//check if this seller has been called
				if (!calledSellers.includes(offers[i].seller)) {
					//if not we initiate the call
					calledSellers.push(offers[i].seller);
					//we count the number of offers
					const numberOfOffers = this.countNumberOfOffer(
						offers,
						offers[i].seller
					);
					//we iterate through a call to the smart contract by index
					for (let j = 0; j < numberOfOffers; j++) {
						const offer = await this.getOffer(offers[i].seller, j);
						const priceInWei = offer.price.toString();
						//we push it to the list of offers
						this.offersList.push({
							tokens: parseInt(offer.amount),
							price: priceInWei,
							seller: offers[i].seller,
							_id: offers[i]._id,
							index: j,
						});
					}
				}
			}

			this.offersRecieved = true;
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(
				`Failed to load web3, accounts, or contract. Check console for details.`
			);
			console.error(error);
		}
	},
	computed: { ...mapState(['web3']), ...mapGetters(['getOffer']) },
	methods: {
		countNumberOfOffer(offers, address) {
			let numberOfOffers = 0;
			for (var i = 0; i < offers.length; i++) {
				if (offers[i].seller === address) {
					numberOfOffers++;
				}
			}
			return numberOfOffers;
		},
	},
};
</script>

<style lang="scss" scoped></style>
