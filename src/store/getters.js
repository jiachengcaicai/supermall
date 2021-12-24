export default {
  getCartLength(state) {
    return state.cartList.length
  },
  getCartList(state) {
    return state.cartList
    // 因为是引用类型，不进行拷贝的话会直接修改state
    // return JSON.parse(JSON.stringify(state.cartList))
  }
}
