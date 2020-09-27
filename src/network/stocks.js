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

export function get_range(data) {
    return request({
        url:'/get_range',
        params: data,
    })
}
export function saveCollection(data){
    return request({
        url: "/save_user_queries",
        method:'POST',
        data: data,
    })
}

export function delCollection(params) {
    return request({
        url:'/del_user_queries',
        method:'POST',
        params: params,
    })
}