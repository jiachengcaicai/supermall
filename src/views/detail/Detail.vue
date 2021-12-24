<template>
  <div>
    <loading v-show="!showDetail" :show-loading="!showDetail" />
    <detail-nav-bar v-show="showDetail" @titleClick="titleClick" ref="navbarRef" />
    <div class="detail" v-show="showDetail">
      <scroll class="content" @scroll="contentScroll" :probe-type="3" ref="scroll">
        <detail-swiper :top-images="topImages" ref="swiperRef" />
        <detail-base-info :goods="goods" />
        <detail-comment-info :comment-info="commentInfo" ref="commentRef" />
        <detail-shop-info :shop="shop" />
        <detail-goods-info :detail-info="detailInfo" @goodsImgLoadOk="loadImgOk" ref="goodsDetailRef" />
        <detail-param-info class="param-info" :param-info="paramInfo" />
        <div class="recommend-title" ref="recommendTitleRef">— 看了又看 —</div>
        <goods-list :goods="recommend" class="goods-list" ref="recommendRef" />
      </scroll>
      <detail-bottom-bar class="bottom-bar" @addToCart="addToCart" />
      <back-top @click.native="backToTop" v-show="isShowBackTop" />
    </div>
    <!-- <toast :toast-message="toastMessage" v-show="showToast" /> -->
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailSwiper from './childComps/DetailSwiper.vue'
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailParamInfo from './childComps/DetailParamInfo.vue'
  import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
  import DetailBottomBar from './childComps/DetailBottomBar.vue'

  import Loading from 'components/common/loading/Loading.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'
  // import Toast from 'components/common/toast/Toast.vue'

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail.js'
  import {debounce} from 'common/utils.js'
  import {itemListenerMixin, backTopMixin} from 'common/mixin.js'

  import { mapActions } from 'vuex'

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
        themeTopYs: [0], // tabBar跳转的scroll高度区间
        getThemeTopY: null,
        currentIndex: 0,
        isShowBackTop: false,
        showDetail: false,  // 是否显示Detail
        refreshCount: 5, //updated刷新跳转高度的次数
        // showToast: false,
        // toastMessage: '',  //弹窗内容
      }
    },
    mixins: [itemListenerMixin, backTopMixin],  // 混入
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Loading,
      Scroll,
      GoodsList,
      // Toast
    },
    created() {
      // 1.保存传入的商品id
      this.iid = this.$route.params.id
      // 2.根据iid请求商品详细数据
      this.getDetail(this.iid)
      // 3.请求推荐数据
      this.getDetailRecommend()
    },
    mounted() {
      // 图片加载完成的事件监听,itemImgLoadListener在mixin中
      this.$bus.$on('itemImageLoad', () => {
        this.itemImgLoadListener()
        this.showDetail = true
      })

      // 获取tabBar跳转的scroll高度
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.commentRef.$el.offsetTop)
        this.themeTopYs.push(this.$refs.goodsDetailRef.$el.offsetTop )
        this.themeTopYs.push(this.$refs.recommendTitleRef.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        console.log(this.themeTopYs);
      }, 100)
    },
    updated() {
      if(this.refreshCount) {
        // 为了获取准确的ThemeTopY，避免多次加载，所以想了这个笨方法
        this.refreshCount--
        this.getThemeTopY()
      }
    },
    beforedestroyed() {
      // 取消Detail对itemImageLoad的监听
      this.$bus.$off('itemImageLoad', this.itemImgLoadListener)
    },
    methods: {
      /**
       * 各类事件
       */
      ...mapActions(['addCart']),
      loadImgOk() {
        this.itemImgLoadListener()
        this.getThemeTopY() // 再次获取跳转高度
      },
      titleClick(index) {
        this.currentIndex = index
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 0)
      },
      contentScroll(position) {
        // 1.判断滚动位置，修改navBar的当前选项
        const positionY = -position.y
        let length = this.themeTopYs.length
        for(let i = 0; i < length - 1; i++) {
          if(this.currentIndex !== i &&
           (i < length - 1 && positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i
            this.$refs.navbarRef.currentIndex = i
            // console.log(this.currentIndex)
          }
        }
        // 2.是否显示回到顶部
        this.isShowBackTop = (-position.y) > 1000
      },
      addToCart() {
        // 1.加入购物车的商品的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        // 2.将商品添加到购物车(1.promise 2.mapActions)
        // this.$store.dispatch('addCart', product).then(res => {
        //   // 3.添加成功弹窗
        //   this.popupMessage(res)
        // })
        this.addCart(product).then(res => {
          // 3.添加成功弹窗
          // this.popupMessage(res) //elementUI弹窗

          this.$toast.show(res, 1500)
        })
      },
      popupMessage(text) {
        // elementUI，添加购物车弹窗
        this.$message({
          message: text,
          center: true,
          offset: 5,
          duration: 1000
        })
      },

      /**
       * 获取网络数据
       */
      async getDetail(iid) {
        let res = await getDetail(iid)
        if(res) {
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
        }
      },
      async getDetailRecommend() {
        let res = await getRecommend()
        this.recommend = res.data.list
      }
    }
  }

</script>

<style scoped>
  .detail {
    position: relative;
    z-index: 10;
    background-color: rgb(240, 240, 240);
    overflow: hidden;
    height: calc(100vh - 44px - 49px);
  }
  .content {
    height: 100%;
  }
  .recommend-title {
    font-size: 16px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: rgb(150, 105, 20);
    background-color: rgb(240, 240, 240);
  }
  .goods-list {
    background-color: rgb(240, 240, 240);
  }
  .bottom-bar {
     overflow: hidden;
  }
</style>
