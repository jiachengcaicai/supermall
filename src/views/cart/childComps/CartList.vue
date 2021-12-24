<template>
  <div class="cart-list">
    <scroll class="content" :probe-type="3" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :item-info="item" :key="index" />
    </scroll>
  </div>
</template>

<script>
  import CartListItem from './CartListItem.vue'

  import Scroll from 'components/common/scroll/Scroll.vue'

  import { mapGetters } from 'vuex'

  export default {
    name: 'CartList',
    components: {
      CartListItem,
      Scroll
    },
    computed: {
      ...mapGetters({
        cartList: 'getCartList'
      })
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }

</script>

<style scoped>
  .cart-list {
    height: 100%;
    background-color: rgb(245, 245, 245);
    padding: 8px 8px 0;
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
