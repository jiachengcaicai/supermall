<template>
  <div id="shop-info" v-if="Object.keys(shop).length != 0">
    <div class="shop-top">
      <img :src="shop.logo"/>
      <span class="shop-name">{{shop.name}}</span>
    </div>

    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">
            {{shopSells}}
          </div>
          <div class="sell-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">
            {{shop.goodsCount}}
          </div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item,index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better' : item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more' : item.isBetter}">
              <span>{{item.isBetter ? '高' : '低'}}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailShopInfo',
    props: {
      shop: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      shopSells() {
        if(this.shop.sells < 10000) return this.shop.sells
        return (this.shop.sells / 10000).toFixed(2) + '万'
      }
    }
  }

</script>

<style scoped>
  #shop-info {
    padding: 1rem 0.5rem;
    border-bottom: 0.3rem solid rgb(245, 245, 245);
    background-color: white;
    color: black;
  }
  .shop-top {
    line-height: 45px;
    display: flex;
    align-items: center;
  }
  .shop-top img {
    width: 4rem;
    height: 4rem;
    margin-left: 1rem;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.3);
  }
  .shop-top .shop-name {
    margin-left: 1rem;
    vertical-align: center;
  }
  .shop-middle {
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .shop-middle-left {
    width: 45%;
    display: flex;
    justify-content: space-evenly;
    color: #333;
    text-align: center;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }
  .sell-text, .goods-text {
    margin-top: 10px;
    font-size: 12px;
  }
  .shop-middle-right {
    width: 45%;
    font-size: 13px;
    color: #333;
  }
  .shop-middle-right table {
    width: 120px;
    margin-left: 30px;
  }
  .shop-middle-right table td {
    padding: 5px 0;
  }
  .shop-middle-right .score {
    color: #5ea732;
  }
  .shop-middle-right .score-better {
    color: #f13e3a;
  }
  .shop-middle-right .better span {
    background-color: #5ea732;
    color: #fff;
    text-align: center;
  }
  .shop-middle-right .better-more span {
    background-color: #f13e3a;
  }
  .shop-bottom {
    width: 6.5rem;
    height: 1.7rem;
    line-height: 1.7rem;
    text-align: center;
    border-radius: 20px;
    background-color: rgba(128, 128, 128, 0.2);
    margin: 0.5rem auto 0;
  }

</style>
