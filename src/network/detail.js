import {request} from "./request";

//网络请求 获取详情页的数据
export function getDetail(iid){
  return request({
    //请求路径
    url : '/detail',
    //传入的iid
    params : {
      iid
    }
  })
}

//获取数据
export class Goods{
  constructor(itemInfo,columns,services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.rrice
    this.oldPrice = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

//获取商家信息
export class Shop{
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

//获取介绍信息
export class GoodsParam{
  constructor(info,rule) {
    //判断  image 中可能没有值(某些商品有值，某些商品没值)
    this.image = info.image ? info.image[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
