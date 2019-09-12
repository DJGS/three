/*
 * 路由配置
 * https://router.vuejs.org/zh/guide/#html
 */

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
    {
        path: '/',
        component: () => import('@pages/home'),
    },
    {
        path: '/cube',
        component: () => import('@pages/cube'),
    },
];

const Routers = new Router({
    routes,
});

export default Routers;
