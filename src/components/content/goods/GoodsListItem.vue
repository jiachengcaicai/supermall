<template>
  <div class="goods-item" @click="goodsItemClick">
    <img v-lazy="showImage" @load="imageLoad" alt="" :key="showImage"/>
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GoodsListItem',
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showImage() {
        // 复用时传入的位置有差异，所以做一个判断
        // this.goodsItem.image找到goodsItem但找不到image，所以是undefined
        // this.goodsItem.show.img写在前面报错的原因是没有找到show就去找img，所以不是undefined而是报错
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      imageLoad() {
        // 向事件总线发送事件，图片加载完毕重新计算滚动高度
        this.$bus.$emit('itemImageLoad')
      },
      goodsItemClick() {
        if (this.goodsItem.iid == undefined) {
          console.log(this.goodsItem);
          return
        }
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    }
  }

</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
    background-color: white;
    margin-bottom: 10px;
    border-radius: 7px;
  }

  .goods-item img {
    width: 100%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
    padding: 0 5px 0;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 5px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 25px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~@/assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
