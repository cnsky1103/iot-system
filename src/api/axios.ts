import axios from 'axios'
import { APIURL } from '../settings'
import Qs from 'qs'

const request = axios.create({
    baseURL: APIURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})

request.interceptors.request.use(
    config => {
        // 表单化传递参数 (只有post才会有data属性)
        if (config.data) {
            config.data = Qs.stringify(config.data)
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        }
        return config
    },
    error => Promise.reject(error.toString())
)

export default request;