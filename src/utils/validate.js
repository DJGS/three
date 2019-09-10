/**
 * 校验用户名
 */
const validateUsername = (rule, value, callback) => {
    let rex = /^\w{2,16}$/;
    if (!rex.test(value)) {
        callback(new Error("请输入2-16位字母数字下划线!"));
    } else {
        callback();
    }
};

/**
 * 校验姓名
 */
const validateName = (rule, value, callback) => {
    let rex = /^([\u4e00-\u9fa5]|[\\·]){2,16}$|^([a-zA-Z]){2,16}$/;
    if (!rex.test(value)) {
        callback(new Error("请输入2-16位中文或英文!"));
    } else {
        callback();
    }
};

/**
 * 校验性别
 */

const validateSex = (rule, value, callback) => {
    if (value != "1" && value != "2") {
        callback(new Error("请选择性别!"));
    } else {
        callback();
    }
};

/**
 * 校验手机号码
 */

const validateMobile = (rule, value, callback) => {
    let rex = /^1[345678]\d{9}$/;
    if (!rex.test(value)) {
        callback(new Error("请输入正确的手机号码!"));
    } else {
        callback();
    }
};

/**
 * 校验邮箱
 */
const validateEmail = (rule, value, callback) => {
    let rex = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (!rex.test(value)) {
        callback(new Error("请输入正确的邮箱地址!"));
    } else {
        callback();
    }
};

/**
 * 校验密码
 */
const validatePassword = (rule, value, callback) => {
    let rex = /^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{6,16}$/;
    if (!rex.test(value)) {
        callback(new Error("请输入6-16位包含大小写字母及数字!"));
    } else {
        callback();
    }
};

export {
    validateUsername,
    validateName,
    validateSex,
    validateMobile,
    validateEmail,
    validatePassword
};
