<template>
  <div id="home">
    <nav-bar class="home-nav"><template v-slot:center>购物街</template></nav-bar>
    <tab-control :title="['流行','新款','精选']" ref="tabControl1"
      class="tab-control" v-show="tabControlToTop"
      @tabClick="tabClick"
    />
    <scroll class="content ignore" ref="scroll" :probe-type="3"
      :pull-up-load="true" @scroll="contentScroll" @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad.once="LoadImgOk"/>
      <recommend-view :recommends="recommends" @recommendImageLoad.once="LoadImgOk"/>
      <featura-view/>
      <tab-control :title="['流行','新款','精选']" ref="tabControl2" @tabClick="tabClick"/>
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backToTop" v-show="isShowBackTop" />
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import FeaturaView from './childComps/FeaturaView.vue'

  import NavBar from 'components/common/navbar/NavBar.vue'
  import TabControl from 'components/content/tabControl/TabControl.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'

  import {getHomeMultidata, getHomeGoods} from 'network/home.js'
  import {debounce} from 'common/utils.js'
  import {itemListenerMixin, backTopMixin} from 'common/mixin.js'

  export default {
    name: 'Home',
    data() {
      return {
        banners: [],  //轮播图
        recommends: [], //推荐页
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentTabType: 'pop', // 当前正在显示的tabControl的选项
        tabOffsetTop: 0,  // tabControl到Home顶部的距离
        tabControlToTop: false,  // 控制tabControl吸顶效果
        scrollY : {
          'pop': 0,
          'new': 0,
          'sell': 0
        },
      }
    },
    mixins: [itemListenerMixin, backTopMixin],
    components: {
      HomeSwiper,
      RecommendView,
      FeaturaView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata()
      // 2.请求商品数据，初始请求一页的数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
    },
    computed: {
      showGoods() {
        // 通过currentTabType获取当前选中的是那个tabControl，传递对应选项卡的数据 list
        return this.goods[this.currentTabType].list
      }
    },
    activated() {
      // 图片加载完成的事件监听
      this.$bus.$on('itemImageLoad', this.itemImgLoadListener)
      // 解决切换view后自动回到pisition:0位置的bug
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.scrollY[this.currentTabType], 0)
    },
    deactivated() {
      // 保存离开时的滚动位置
      this.saveScrollPosition(this.currentTabType)
      // 停止滚动,stop赢在save之后
      this.$refs.scroll.scrollStop()
      // 离开时取消对goodsItem组件事件的监听，itemImgLoadListener在mixin中
      this.$bus.$off('itemImageLoad', this.itemImgLoadListener)
    },
    methods: {
      /**
       * 事件监听相关的方法
       */
      tabClick(index) {
        // 保存当前tabControl选项卡的滚动位置
        if(this.tabControlToTop) {
          this.saveScrollPosition(this.currentTabType)
        }

        // 修改当前正在显示的选项，同时让 Home 传递需要 goods 到 goods-list
        this.currentTabType = Object.keys(this.goods)[index]
        // 同步两个tabContrl的选项
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index

        if(this.tabControlToTop) {
          this.$refs.scroll.scrollTo(0, this.scrollY[this.currentTabType], 0)
          this.$refs.scroll.scrollStop()  // 这句话是为了解决无法滚动到正确位置的bug
        }

      },
      contentScroll(position) {
        // 1.判断BackTop是否显示，下拉当 y 小于 -1000 时显示
        this.isShowBackTop = (-position.y) > 1000

        // 2.判断tabControl是否吸顶
        this.tabControlToTop = ((-position.y) >= this.tabOffsetTop)
      },
      loadMore() {
        this.getHomeGoods(this.currentTabType)
        // 结束上拉加载行为，且2秒后才能继续上拉和重新发送网络请求
        const finishPullUp = debounce(this.$refs.scroll.finishPullUp, 2000)
        finishPullUp()
      },
      LoadImgOk() {
        this.$refs.scroll.refresh()
        // 获取tabControl距离Home顶部的距离offsetTop
        // 所有组件都有一个属性$el，用于获取组件中的元素
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop

        // 初始化tabControl高度，用于记住tabcontrol其他选项卡的初始位置
        for(let yType in this.scrollY) {
          this.scrollY[yType] = - this.tabOffsetTop
        }
      },
      saveScrollPosition(type, offset) {
        // 保存滚动位置
        this.scrollY[type] = offset ? this.$refs.scroll.scroll.y + offset : this.$refs.scroll.scroll.y
      },

      /**
       * 网络请求的相关方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        if(type === undefined) {
          return
        }
        // 对应 商品 的 页数 + 1，请求新的数据
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // ...语法会把数组中的元素逐个取出
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page ++
        }).catch((err) => {
          console.log("type: "+ type + "\npage: " + page + "\n" + err)
        })
      }
    }
  }

</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  .tab-control {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    overflow: hidden;
    position: absolute;
    /* top: 44px;
    bottom: 49px; */
    left: 0;
    right: 0;
  }
  /* 该类是为了px转化vm时避免被转化 */
  .ignore {
    top: 44px;
    bottom: 49px;
  }

  /* .content { */
    /*
    calc是c3中的一个属性，可以用来计算
    calc()使用通用的数学运算规则，但是也提供更智能的功能：
      使用“+”、“-”、“*” 和 “/”四则运算；
      可以使用百分比、px、em、rem等单位；
      可以混合使用各种单位进行计算；
      表达式中有“+”和“-”时，其前后必须要有空格，如"widht: calc(12%+5em)"这种没有空格的写法是错误的；
      表达式中有“*”和“/”时，其前后可以没有空格，但建议留有空格
    */
    /* height: calc(100% - 49px); */
    /* overflow: hidden; */
  /* } */
</style>
