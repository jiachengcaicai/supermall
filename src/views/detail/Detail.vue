<template>
  <div class="detail">
    <detail-nav-bar></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-comment-info :commentInfo="commentInfo" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @goodsInfoImageLoad="goodsInfoImageLoad" />
      <detail-param-info :paramInfo="paramInfo" />
      <div class="recommend-title">- 看了又看 -</div>
      <goods-list :goods="recommend" class="goods-list"/>
      <div class="recommend-end">没有更多啦~</div>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childcomponents/DetailNavBar.vue'
  import DetailSwiper from './childcomponents/DetailSwiper.vue'
  import DetailBaseInfo from './childcomponents/DetailBaseInfo.vue'
  import DetailShopInfo from './childcomponents/DetailShopInfo.vue'
  import DetailGoodsInfo from './childcomponents/DetailGoodsInfo.vue'
  import DetailParamInfo from './childcomponents/DetailParamInfo.vue'
  import DetailCommentInfo from './childcomponents/DetailCommentInfo.vue'
  import GoodsList from '@/components/content/goods/GoodsList.vue'

  import Scroll from '@/components/common/scroll/Scroll.vue'

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from '@/network/detail.js'
  import {itemListenerMixin} from '@/common/mixin.js'

  export default {
    name: 'Detail',
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommend: [],
      }
    },
    mixins: [itemListenerMixin],  // 混入
    components: {
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
    },
    created() {
      // 1.保存传入的商品id
      this.iid = this.$route.params.id

      // 2.根据iid请求商品详细数据
      getDetail(this.iid).then(res => {
        const data = res.result
        // 获取顶部轮播图数据
        // console.log(res);
        this.topImages = data.itemInfo.topImages
        // 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 获取店铺信息
        this.shop = new Shop(data.shopInfo)
        // 获取商品详细数据
        this.detailInfo = data.detailInfo
        // 获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // 获取评论的一条信息
        if(data.rate.cRate != 0) {
          this.commentInfo = data.rate.list[0]
        }
      })

      // 3.请求推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommend = res.data.list
      })
    },
    mounted() {
      // 图片加载完成的事件监听
      this.$bus.$on('itemImageLoad', this.itemImgLoadListener)
    },
    beforedestroyed() {
      // 取消Detail对itemImageLoad的监听
      this.$bus.$off('itemImageLoad', this.itemImgLoadListener)
    },
    methods: {
      goodsInfoImageLoad() {
        this.$refs.scroll.refresh()
      }
    }
  }

</script>

<style scoped>
  .detail {
    position: relative;
    z-index: 11;
    background-color: rgb(240, 240, 240);
    height: 100vh;
  }
  .content {
    height: calc(100% - 44px);
  }
  .recommend-title, .recommend-end {
    font-size: 16px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: rgb(150, 105, 20);
    background-color: rgb(240, 240, 240);
  }
  .goods-list {
    background-color: rgb(240, 240, 240);
  }
</style>
