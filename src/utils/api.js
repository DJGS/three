import axios from "axios";
import qs from "qs";
import { Message, Loading } from "element-ui";
import i18n from "../languages/lang";

// 服务器基础路径
axios.defaults.baseURL = "/cyberange";

// 防止多次打开loading
let num = 0;

const openLoading = () => {
    if (!num) {
        Loading.service({});
    }
    num++;
};

const closeLoading = () => {
    num--;
    if (!num) {
        Loading.service({}).close();
    }
};

// 添加请求拦截器
axios.interceptors.request.use(
    config => {
        openLoading();
        return config;
    },
    error => {
        openLoading();
        return Promise.reject(error);
    }
);

// 添加响应拦截器
axios.interceptors.response.use(
    response => {
        closeLoading();

        if (response) {
            if (response.data.code == "0" || response.data.code == "000000") {
                return Promise.resolve(response);
            } else {
                // 如果未登录
                if (response.data.code == "1") {
                    localStorage.removeItem("userRole");
                    window.APP_CONFIG.userInfo = {
                        role: undefined
                    };
                    window.location.reload();
                }

                Message({
                    message: response.data.msg,
                    type: "error"
                });

                return Promise.reject(response);
            }
        } else {
            return Promise.reject(response);
        }
    },
    () => {
        closeLoading();

        // 接口异常处理 统一报错信息
        let errorConfig = {
            status: 500,
            data: {
                code: "000001",
                msg: i18n.t("common.networkError")
            }
        };

        // closeLoading 会把message关掉 ，所以加个延迟
        setTimeout(() => {
            Message({
                message: i18n.t("common.networkError"),
                type: "error"
            });
        }, 0);

        return Promise.resolve(errorConfig);
    }
);

// 检测接口状态
function checkStatus(response) {
    if (
        response &&
        (response.status === 200 ||
            response.status === 304 ||
            response.status === 400)
    ) {
        return response.data.data;
    }

    return Promise.reject(response);
}

const $api = {};

const getMethod = (method, headers, timeout) => {
    return (url, data) => {
        let newData = data;
        let newmethod = method;

        // post 方法格式化参数
        if (newmethod === "post") {
            newData = qs.stringify(data, {
                indices: false
            });
        }

        // postJson 回归 post 方法
        if (method === "postJson" || method === "postUpload") {
            newmethod = "post";
        }

        return axios({
            method: newmethod,
            url,
            data: newData,
            params: newData,
            timeout: timeout || 60000,
            headers
        }).then(response => {
            return checkStatus(response);
        });
    };
};

$api.get = getMethod("get", { "X-Requested-With": "XMLHttpRequest" });

$api.post = getMethod("post", {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
});

$api.postUpload = getMethod(
    "postUpload",
    {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "multipart/form-data"
    },
    600000
);

$api.postJson = getMethod("postJson", {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json"
});

$api.defaults = axios.defaults;

export default $api;
