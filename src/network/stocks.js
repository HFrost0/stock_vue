import {request} from "./request";

export function getStocks(params) {
  return request({
    url:'/get_stocks',
    params
  })
}