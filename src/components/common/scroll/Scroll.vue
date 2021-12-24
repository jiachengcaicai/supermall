<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'Scroll',
    props: {
      // 因为不是所有的地方都需要用到这些操作，所以在这取值确认是否开启这部分的功能
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null,
        timer: null
      }
    },
    mounted() {
      // 1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        click: true,
        mouseWheel: true,
        observeDOM: true,
        observeImage: true,
      })

      // 2.监听滚动的位置
      if(this.probeType == 2 || this.probeType == 3) {
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position)
          // console.log(position);
        })
      }

      // 3.监听scroll滚动到底部，即上拉加载更多
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      scrollTo(x, y, time = 300) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      refresh() {
        // 调用 bs.refresh() 来确保得到正确的图片高度之后再计算可滚动的高度
        this.scroll && this.scroll.refresh()
        // console.log('scroll refresh');
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      scrollToElement(el, time = 300) {
         this.scroll && this.scroll.scrollToElement(el, time)
      },
      scrollStop() {
        // 立即停止当前运行的滚动动画，防止滚动中切换到其他视图position还在不断更改的问题
        // 如：home在滚动画面还没停下的时候，切换到分类，检测到position还在无尽地刷新
        this.scroll && this.scroll.stop()
      }
    },
  }

</script>

<style scoped>
</style>
