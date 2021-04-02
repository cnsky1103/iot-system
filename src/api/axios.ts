import axios from 'axios'
import { APIURL } from '../settings'

const request = axios.create({
    baseURL: APIURL,
    timeout: 5000
})

export default request;