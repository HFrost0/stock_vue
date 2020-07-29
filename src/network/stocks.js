import {request} from "./request";

export function getStocks(data) {
  return request({
    url:'/get_stocks',
    method: 'POST',
    data: data,
  })
}