import Vue from 'vue';
import { Message } from 'element-ui';
import App from './App.vue';
import './plugins/element.js';
import router from '@routers/router';
import i18n from './languages/lang';
import APP_CONFIG from '@utils/global-config';
import eventBus from '@utils/event-bus';

// 引入基础样式文件
import '@scss/reset.scss';
import '@scss/element-variables.scss';

// 注册全局变量
window.APP_CONFIG = APP_CONFIG;

// 注入全局message
Vue.prototype.$eventBus = eventBus;

// 注入全局message
Vue.prototype.$message = Message;

import * as filters from '@utils/filters';
Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key]);
});

/* eslint-disable */
new Vue({
    i18n,
    router,
    render(h) {
        return h(App);
    },
}).$mount('#app');
