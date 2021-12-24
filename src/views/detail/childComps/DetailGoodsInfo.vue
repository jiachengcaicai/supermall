<template>
  <div v-if="Object.keys(detailInfo).length != 0" class="detail-goods-info">
    <div class="goods-info-desc">
      <div style="float: left;" class="desc-line">
        <i class="desc-dot"></i>
      </div>

      <div class="desc-text">{{detailInfo.desc}}</div>

      <div style="float: right;" class="desc-line">
        <i style="right: 0px;" class="desc-dot"></i>
      </div>
    </div>

    <div class="goods-info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="goods-info-imgs">
      <img v-for="(item,index) in detailInfo.detailImage[0].list"
      :src="item" :key="index" @load="imageLoad" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailGoodsInfo',
    props: {
      detailInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        imagesLength: 0,
        loadCount: 0
      }
    },
    methods: {
      imageLoad() {
        // 所有图片都加载完后发送事件，刷新滚动高度
        this.loadCount++
        if(this.loadCount === this.imagesLength) {
          this.$emit('goodsImgLoadOk')
        }
      }
    },
    watch: {
      detailInfo() {
        this.imagesLength = this.detailInfo.detailImage[0].list.length
      }
    }
  }

</script>

<style scoped>
  .detail-goods-info {
    font-size: 0.68rem;
  }
  .goods-info-desc {
    font-size: 0.6rem;
    padding: 0.42rem 0.34rem;
  }
  .desc-line {
    width: 3.5rem;
    height: 1px;
    background-color: gray;
    position: relative;
  }
  .desc-dot {
    position: absolute;
    top: -1.5px;
    display: inline-block;
    width: 0.21rem;
    height: 0.21rem;
    background-color: black;
    border-radius: 50%;
  }
  .desc-text {
    padding: 0.85rem 0;
    color: gray;
    text-align: center;
  }
  .goods-info-key {
    padding: 0.42rem 0.34rem;
    text-align: center;
  }
  .goods-info-imgs img {
    width: 100%;
  }
</style>
