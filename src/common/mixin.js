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
    const refresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemImgLoadListener = () => {
      refresh()
    }
  },
}
