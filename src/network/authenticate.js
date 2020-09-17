import {request} from "./request";

export function registry(data) {
  return request({
    url:'/registry',
    method: 'POST',
    data: data,
  })
}

export function login(data){
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}
