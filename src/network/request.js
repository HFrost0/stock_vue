import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://101.132.132.225:8000/stock/api',
})

export function request(config) {
  //请求拦截器
  //1. 当config中的请求不符合服务器的要求时需要拦截
  //2. 当请求的时候显示一个圆圈转啊转
  //3. 某些网络请求（登录）携带特殊的东西（token）提示用户登录
  instance.interceptors.request.use(config=>{
    return config
  },error => {
    //发送都没发送出去，进入下面
    console.log(error)
  })
  //回应拦截器
  instance.interceptors.response.use(res=>{
    return res
  },error => {
    console.log(error);
  })
  console.log(config)
  return instance(config)
}