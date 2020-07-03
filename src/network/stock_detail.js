import {request} from "./request";

export function getStock(params) {
  return request({
    url:'/get_stock',
    params
  })
}

export function getShareList(params) {
  return request({
    url:'/get_shares',
    params
  })
}