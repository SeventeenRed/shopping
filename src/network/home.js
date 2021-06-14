//导入reques网络封装
import {request} from "@/network/request";

//封装多个数据
export function getHomeMultidata(){
  return request({
    url:'/home/multidata',
  })
}

//商品数据内容 请求
export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}
