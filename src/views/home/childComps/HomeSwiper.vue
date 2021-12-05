<template>
  <!-- <div>
    <el-carousel indicator-position="outside" arrow="always" :interval="2000" height="195px">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" :alt="item.title" width="100%" @load="imageLoad">
        </a>
      </el-carousel-item>
    </el-carousel>
  </div> -->
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" :alt="item.title" width="100%" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from '@/components/common/swiper/index.js'

  export default {
    name: 'HomeSwiper',
    data() {
      return {
        isLoad: false
      }
    },
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imageLoad() {
        // 经检测轮播图是最影响加载时间的，所以检测轮播图的加载，从而操作Home的tabOffsetTop
        if(!this.isLoad) {
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
      }
    }
  }

</script>

<style scoped>
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }
    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
</style>
