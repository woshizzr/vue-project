import axios from "axios";
import { ElMessage } from "element-plus";
import config from "../config";
const service = axios.create({
    baseURL: config.baseApi
})
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器  在请求之后要干什么
service.interceptors.response.use(function (res) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const { code, data, msg } = res.data
    if (code === 200) {
        return data
    } else {
        const NETWORK_ERROR = '网络错误...'
        ElMessage.error(msg || NETWORK_ERROR)
        return Promise.reject(error)
    }
});


function request(options) {
    options.method = options.method || 'get'
    // 关于get参数进行调整
    if (options.method.toLowerCase() === 'get') {
        options.params = options.data
    }
    // 对mock开关做一个处理
    let isMock = config.mock

    if (typeof options.mock !== 'undefined') {
        isMock = options.mock
    }
    // 针对环境做一个处理
    if (config.env === 'prod') {
        service.defaults.baseURL = config.baseApi
    } else {
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
    }

    return service(options)
}
export default request