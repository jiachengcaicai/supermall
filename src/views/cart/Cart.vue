<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <template v-slot:center>购物车({{cartLength}})</template>
    </nav-bar>
    <!-- <div>{{this.$store.state.cartList}}</div> -->
    <!-- 商品的列表 -->
    <cart-list class="cart-list" ref="cartListRef" />
    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
  import CartList from './childComps/CartList.vue'
  import CartBottomBar from './childComps/CartBottomBar.vue'

  import NavBar from 'components/common/navbar/NavBar.vue'

  import  { mapGetters } from 'vuex'

  export default {
    name: 'Cart',
    components: {
      CartList,
      CartBottomBar,
      NavBar,
    },
    computed: {
      // 两种语法
      // ...mapGetters(['getCartLength', 'getCartList'])
      ...mapGetters({
        cartLength: 'getCartLength'
      })
    },
  }

</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
  .cart-list {
    height: calc(100% - 44px - 40px - 49px);
  }
</style>
