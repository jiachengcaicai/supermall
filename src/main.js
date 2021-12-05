import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {Carousel, CarouselItem} from 'element-ui'

Vue.config.productionTip = false

Vue.use(Carousel)
Vue.use(CarouselItem)
// $bus用来图片是否加载完的状态管理
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
