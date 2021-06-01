<template>
	<div></div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
	name: 'TransactionList',
	computed: {
		...mapGetters(['getTransactionList']),
	},
};
</script>

<style lang="scss" scoped></style>
