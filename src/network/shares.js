import {request} from "./request";

//即使请求有重复，也要每个view对应一个，这样比较好

export function getShareList(params) {
  return request({
    url:'/get_shares',
    params
  })
}