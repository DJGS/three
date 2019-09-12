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

export { formatDate, formatWeekDsy, formatTime };
