<template>
  <div class="cart-list-item">
    <div class="item-selector">
      <check-button class="check-button" ref="itemSelectedRef" :item-selected="itemInfo.select" @click.native="selectItem" />
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{itemInfo.price}}</div>
        <div class="item-count right">x{{itemInfo.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton.vue'
  import { CLICK_GOODS_SELECTION_BOX } from 'store/mutation-types'

  export default {
    name: 'CartListItem',
    props: {
      itemInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    components: {
      CheckButton
    },
    methods: {
      selectItem() {
        // 这里会直接修改state中cartlist商品的选中情况
        this.$store.commit(CLICK_GOODS_SELECTION_BOX, this.itemInfo)
        // this.itemInfo.select = !this.itemInfo.select
        // this.$refs.itemSelectedRef.itemSelected = this.itemInfo.select
      }
    },
  }

</script>

<style scoped>
  .cart-list-item {
    width: 100%;
    height: 150px;
    background-color: white;
    border-radius: 10px;
    margin: 8px auto;
    display: flex;
    font-size: 0;
    padding: 10px 5px;
  }
  .item-selector {
    width: 22px;
    padding: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .check-button {
    width: 18px;
    height: 18px;
  }
  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .item-desc {
    background-color: rgba(240, 240, 240, 0.1);
  }
  .item-img {
    padding: 5px;
  }
  .item-img img {
    width: 75px;
    display: block;
    border-radius: 5px;
  }
  .item-info {
    font-size: 15px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }
  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }
  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }
  .info-bottom .item-price {
    color: orangered;
  }
  .item-count {
    /* width: 20px;
    height: 20px; */
    padding: 2px;
    font-size: 10px;
    border: 1px solid rgb(185, 185, 185);
    border-radius: 5px;
  }
</style>
