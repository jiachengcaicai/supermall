<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
  </div>
</template>

<script>
  import DetailNavBar from './childcomponents/DetailNavBar.vue'
  import DetailSwiper from './childcomponents/DetailSwiper.vue'

  import {getDetail} from '@/network/detail.js'

  export default {
    name: 'Detail',
    data() {
      return {
        iid: null,
        topImages: []
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper
    },
    created() {
      // 1.保存传入的商品id
      this.iid = this.$route.params.id

      // 2.根据iid请求商品详细数据
      getDetail(this.iid).then(res => {
        // 获取顶部轮播图数据
        console.log(res);
        this.topImages = res.result.itemInfo.topImages
      })
    }
  }

</script>

<style scoped>
</style>
