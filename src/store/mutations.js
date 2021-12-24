import {
  ADD_CART_COUNT,
  ADD_TO_CART,
  CLICK_GOODS_SELECTION_BOX,
  SELECT_ALL_ITEM,
  REMOVE_SELECT_ALL_ITEM,
} from './mutation-types'

export default {
  // mutations唯一的目的就是修改state中状态,mutations中的每个方法尽可能完成的事件比较单一
  /**
   * 增加购物车中某商品的数量
   */
  [ADD_CART_COUNT](state, payload) {
    payload.count ++
  },
  /**
   * 往购物车加入新商品
   */
  [ADD_TO_CART](state, payload) {
    payload.count = 1       // 商品数量初始化
    payload.select = false  // 商品是否选中
    state.cartList.push(payload)
  },
  /**
   * 点击购物车商品选中按钮
   */
  [CLICK_GOODS_SELECTION_BOX](state, payload) {
    let product = state.cartList.find(item => item.iid === payload.iid)
    product.select = !product.select  // 修改选中情况
  },
  /**
   * 点击购物车全选
   */
  [SELECT_ALL_ITEM](state, payload) {
    state.cartList.map(item => item.select = true)
  },
  /**
   * 取消购物车全选
   */
  [REMOVE_SELECT_ALL_ITEM](state, payload) {
    state.cartList.map(item => item.select = false)
  },
}
