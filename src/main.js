import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from '@/components/common/toast'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

// import {Carousel, CarouselItem, Loading, Message} from 'element-ui'
// Vue.use(Carousel);Vue.use(CarouselItem);Vue.use(Loading)
// Vue.prototype.$message = Message

// 添加事件总线对象，$bus在这主要用来监听图片是否加载完
Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast)
// 解决移动端300ms延迟
FastClick.attach(document.body)
// 使用懒加载插件
Vue.use(VueLazyLoad, {
  loading: require('assets/img/common/loading.jpg')

})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
