/*
 * 多语言配置
 * http://kazupon.github.io/vue-i18n/zh/started.html#html
 */

import Vue from "vue";
import VueI18n from "vue-i18n";

import zhCn from "./zh-cn";
import en from "./english";

Vue.use(VueI18n);

// 多语言
const messages = {
    zhCn,
    en
};

// 设置语言信息
const i18n = new VueI18n({
    // 语言
    locale: "zhCn",
    // 字典
    messages
});

export default i18n;
