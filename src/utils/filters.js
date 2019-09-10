import i18n from '../languages/lang';

const formatDate = (val) => {
    //补零计算
    let addZero = (val) => {
        if (val < 10) {
            return '0' + val;
        } else {
            return val;
        }
    };

    if (!val) {
        return '无';
    }

    var value = new Date(val);
    var year = value.getFullYear();
    var month = addZero(value.getMonth() + 1);
    var day = addZero(value.getDate());

    return year + '-' + month + '-' + day;
};

const formatWeekDsy = (val) => {
    let arr = [
        i18n.t('day.Sunday'),
        i18n.t('day.Monday'),
        i18n.t('day.Tuesday'),
        i18n.t('day.Wednesday'),
        i18n.t('day.Thursday'),
        i18n.t('day.Friday'),
        i18n.t('day.Saturday'),
    ];
    return arr[val];
};

const formatTime = (val) => {
    //补零计算
    let addZero = (val) => {
        if (val < 10) {
            return '0' + val;
        } else {
            return val;
        }
    };

    if (!val) {
        return '无';
    }

    var value = new Date(val);
    var year = value.getFullYear();
    var month = addZero(value.getMonth() + 1);
    var day = addZero(value.getDate());
    var hour = addZero(value.getHours());
    var minutes = addZero(value.getMinutes());
    var seconds = addZero(value.getSeconds());

    return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
};

// 格式化课程难度等级
const formatCourseLevel = (value) => {
    let courseLevelList = window.APP_CONFIG.levelOptions;
    let courseLevel;

    courseLevelList.forEach((item) => {
        if (item.value === value) {
            courseLevel = item.label;
        }
    });

    return courseLevel;
};

// 格式化课程类型
const formatCourseType = (type) => {
    let courseTypeList = window.APP_CONFIG.courseTypeOptions;
    let courseType;

    courseTypeList.forEach((item) => {
        if (item.value == type) {
            courseType = item.label;
        }
    });

    return courseType;
};

// 格式化系统类型
const formatSystem = (value) => {
    let systemList = window.APP_CONFIG.systemOptions;
    let system;

    systemList.forEach((item) => {
        if (item.value == value) {
            system = item.label;
        }
    });

    return system;
};

export { formatDate, formatWeekDsy, formatTime, formatCourseLevel, formatCourseType, formatSystem };
