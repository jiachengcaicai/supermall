/**
 * debounce是自己封装的防抖函数
 * itemListenerMixin是为了刷新滚动高度
 */
import {debounce} from '@/common/utils.js'
export const itemListenerMixin = {
  data() {
    return {
      itemImgLoadListener: null
    }
  },
  mounted() {
    // 这个地方img标签确实被挂载，但是其中的图片还没占据高度·
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    this.itemImgLoadListener = () => {
      refresh()
    }
  },
}

/**
 * 回到顶部
 */
import BackTop from '@/components/content/backTop/BackTop.vue'
export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,  // 是否显示回到顶部
    }
  },
  components: {
    BackTop
  },
  methods: {
    backToTop() {
      // 在一个组件的根元素上直接监听一个原生事件，需要使用v-on 的 .native 修饰符。vue3取消.native修饰符了
      // 这里this.$refs.scroll是获取到对应的组件，调用组件内的scrollTo方法
      this.$refs.scroll.scrollTo(0, 0, 300)
    },
  },
}
