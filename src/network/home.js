//导入reques网络封装
import {request} from "@/network/request";

//封装多个数据
export function getHomeMultidata(){
  return request({
    url:'/home/multidata',
  })
}
