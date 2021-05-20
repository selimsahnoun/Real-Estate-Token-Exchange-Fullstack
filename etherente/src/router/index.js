import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import MarketPlace from '../views/MarketPlace.vue';
import HousePage from '../views/HousePage.vue';
import RegisterUser from '../views/RegisterUser.vue';
import LoginUser from '../views/LoginUser.vue';
import UserBoard from '../views/UserBoard.vue';

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
		meta: { requiresAuth: true },
	},
	{
		path: '/user/login',
		name: 'LoginUser',
		component: LoginUser,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
	const loggedIn = localStorage.getItem('user');
	if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
		next('/');
	}
	next();
});

export default router;
