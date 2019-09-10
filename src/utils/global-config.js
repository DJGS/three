/*
 * 定义全局变量
 */
import i18n from '../languages/lang';

let APP_CONFIG = {
    userInfo: {
        role: undefined,
        username: undefined,
    },

    // 难易程度候选项
    levelOptions: [
        {
            value: undefined,
            label: i18n.t('common.all'),
        },
        {
            value: 1,
            label: i18n.t('common.easy'),
        },
        {
            value: 2,
            label: i18n.t('common.middle'),
        },
        {
            value: 3,
            label: i18n.t('common.difficult'),
        },
    ],

    // 课程分类候选项
    courseTypeOptions: [
        {
            value: undefined,
            label: i18n.t('common.all'),
        },
        {
            value: '1',
            label: i18n.t('onlineRange.networkSafe'),
        },
        {
            value: '2',
            label: i18n.t('onlineRange.systemSafe'),
        },
        {
            value: '3',
            label: i18n.t('onlineRange.appSafe'),
        },
        {
            value: '4',
            label: i18n.t('onlineRange.tools'),
        },
    ],

    // 模板类型
    templateOptions: [
        {
            value: true,
            label: i18n.t('common.templateMachine'),
        },
        {
            value: false,
            label: i18n.t('common.notTemplateMachine'),
        },
    ],

    // 系统候选项
    systemOptions: [
        {
            value: undefined,
            label: i18n.t('common.all'),
        },
        {
            value: '1',
            label: 'windows',
        },
        {
            value: '2',
            label: 'linux',
        },
    ],

    // cpu候选项
    cpuOptions: [
        {
            value: undefined,
            label: i18n.t('common.all'),
        },
        {
            value: '1',
            label: '单核',
        },
        {
            value: '2',
            label: '双核',
        },
    ],

    // 内存候选项
    memoryOptions: [
        {
            value: undefined,
            label: i18n.t('common.all'),
        },
        {
            value: '1',
            label: '1G',
        },
        {
            value: '2',
            label: '2G',
        },
    ],
};

export default APP_CONFIG;
