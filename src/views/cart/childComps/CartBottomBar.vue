<template>
  <div class="bottom-bar">
    <div class="check-content" @click="checkClick">
      <check-button class="check-button" :is-select-all="isSelectAll" />
      <span class="check-title">全选</span>
    </div>
    <div class="bottom-right">
      <div class="total-price">
        <span>合计:￥{{totalPrice}}</span>
      </div>
      <div class="calculate" @click="calcClick">结算</div>
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton.vue'

  import { mapGetters } from 'vuex'

  import { SELECT_ALL_ITEM, REMOVE_SELECT_ALL_ITEM } from 'store/mutation-types'

  export default {
    name: 'CartBottomBar',
    computed: {
      ...mapGetters({
        cartList: 'getCartList'
      }),
      totalPrice() {
        return this.cartList.filter(item => {
          return item.select
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      isSelectAll() {
        if(this.cartList.length == 0) return false
        // 有一个false，则表达式为false，都满足则为true
        return this.cartList.every(item => item.select)
        // return !this.cartList.some(item => !item.select)
      }
    },
    components: {
      CheckButton
    },
    methods: {
      checkClick() {
        if(this.isSelectAll) {  // 全部选中
          this.$store.commit(REMOVE_SELECT_ALL_ITEM)
        }
        else {  // 未全部选中
          this.$store.commit(SELECT_ALL_ITEM)
        }
      },
      calcClick() {
        let goods = []
        this.cartList.forEach(item => {
          if(item.select) goods.push(item)
        })

        if(goods.length) {
          this.$toast.show('您选中了 ' + goods.length + ' 件商品', 2000)
        }
        else {
          this.$toast.show('您未选中任何商品', 2000)
        }
      }
    },
  }

</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    position: relative;
    line-height: 40px;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    font-size: 13px;
    width: 30%;
  }
  .check-button {
    width: 18px;
    height: 18px;
    margin-right: 5px;
  }
  .bottom-right {
    width: 70%;
    float: right;
    position: relative;
    top: -40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .total-price {
    text-align: end;
    flex: 1;
    width: 40%;
    font-size: 15px;
  }
  .calculate {
    width: 65px;
    height: 30px;
    line-height: 31px;
    text-align: center;
    margin: auto 10px;
    font-size: 14px;
    color: white;
    border-radius: 10px;
    background-color: var(--color-tint);
  }
</style>
