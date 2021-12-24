import {
  ADD_CART_COUNT,
  ADD_TO_CART
} from './mutation-types'

export default {
  addCart(context, payload) {
    return new Promise((resolve,reject) => {
      // 1.查找购物车中是否有该商品
      let product = context.state.cartList.find(goods => goods.iid === payload.iid)
      // 2.判断Product
      if(product) {
        context.commit(ADD_CART_COUNT, product)
        resolve('商品*' + product.count)
      }
      else {
        context.commit(ADD_TO_CART, payload)
        resolve('成功添加新商品')
      }
    })
  }
}
