import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import MarketPlace from '../views/MarketPlace.vue';
import HousePage from '../views/HousePage.vue';
import RegisterUser from '../views/RegisterUser.vue';
import LoginUser from '../views/LoginUser.vue';
import UserBoard from '../views/UserBoard.vue';
import TokenSell from '../views/TokenSell.vue';
import AdminBoard from '../views/AdminBoard.vue';
import TokenMarket from '../views/TokenMarket.vue';
const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/marketplace',
		name: 'Marketplace',
		component: MarketPlace,
	},
	{
		path: '/housepage/:id',
		name: 'HousePage',
		props: true,
		component: HousePage,
	},

	{
		path: '/user/register',
		name: 'Register',
		component: RegisterUser,
	},
	{
		path: '/user/board',
		name: 'UserBoard',
		component: UserBoard,
	},
	{
		path: '/user/login',
		name: 'LoginUser',
		component: LoginUser,
	},
	{
		path: '/token/sell',
		name: 'TokenSell',
		component: TokenSell,
	},
	{
		path: '/token/market',
		name: 'TokenMarket',
		component: TokenMarket,
	},
	{
		path: '/user/adminboard',
		name: 'AdminBoard',
		component: AdminBoard,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
	// redirect to login page if user is not logged in and trying to access a restricted page
	const publicPages = [
		'/token/market',
		'/',
		'/marketplace',
		'/user/login',
		'/user/register',
	];
	const authRequired = !publicPages.includes(to.path);
	const adminRequired = to.path === '/user/adminboard' ? true : false;
	const loggedIn = localStorage.getItem('user');

	if (authRequired && !loggedIn) {
		return next('/user/login');
	}
	if (adminRequired && !JSON.parse(loggedIn).admin) {
		return next('/');
	}

	next();
});

export default router;
