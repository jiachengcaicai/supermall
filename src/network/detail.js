import {request} from './request'

/**
 * 根据商品ID请求商品详细数据
 * @param {String} iid
 * @returns
 */
export function getDetail(iid) {
  return request({
    url: '/detail',
    method: "GET",
    params: {
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url: '/recommend',
    method: 'GET'
  })
}

/**
 * 加工处理商品的基本信息
 */
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

/**
 * 加工处理商品店铺信息
 */
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}

/**
 * 获取商品参数
 */
export class GoodsParam {
  constructor(info, rule) {
    // image可能没有值（某些商品有值，某些没有值)
    this.image = info.images ? info.images[0] : ''
    this.infoKey = info.key
    this.infos = info.set
    this.sizeKey = rule.key
    this.sizes = rule.tables
  }
}
