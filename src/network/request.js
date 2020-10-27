import axios from 'axios'
import qs from "qs";
import store from '../store'
import router from '../router'

const instance = axios.create({
  // baseURL: 'http://127.0.0.1:8000/stock/api',
  baseURL: 'https://csubigdata.com/stock_web/stock/api',
  paramsSerializer: params => {
    return qs.stringify(params, {indices: false})
  }
})

export function request(config) {
  //请求拦截器
  //1. 当config中的请求不符合服务器的要求时需要拦截
  //2. 当请求的时候显示一个圆圈转啊转
  //3. 某些网络请求（登录）携带特殊的东西（token）提示用户登录
  instance.interceptors.request.use(config => {
    // config.headers.common['Authorization'] = localStorage.getItem('user') ? 'Bearer ' + JSON.parse(localStorage.user).token : ''
    config.headers.common['Authorization'] = store.state.user ? 'Bearer ' + store.state.user.token : ''
    return config
  }, error => {
    //发送都没发送出去，进入下面
    console.log(error)
  })
  //回应拦截器
  instance.interceptors.response.use(res => {
    //当应答中包含token时刷新token
    if (res.data.token) {
      const token = res.data.token
      store.dispatch('refreshToken', token)
    }
    return res
  }, error => {
    // invalid token
    if (error.response.status === 401) {
      router.push('/')
      store.dispatch('logout')
    }
    return Promise.reject(error)
  })
  return instance(config)
}
