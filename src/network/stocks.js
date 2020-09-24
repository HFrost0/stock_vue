import {request} from "./request";

export function getStocks(data) {
  return request({
    url:'/get_stocks',
    method: 'POST',
    data: data,
  })
}

export function getCollections(data) {
  return request({
      url:'/get_user_queries',
      method: 'POST',
      data: data,
  })
}
