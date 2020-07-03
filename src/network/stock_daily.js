import {request} from "./request";

export function getStock(params) {
  return request({
    url:'/get_stock',
    params
  })
}

export function getStockDaily(params) {
  return request({
    url:'/get_daily_basics',
    params
  })
}