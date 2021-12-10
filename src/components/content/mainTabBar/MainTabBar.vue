<template>
  <div class="main-tab-bar">
    <tab-bar class="tab-bar">

      <tab-bar-item path="/home" activeColor="rgb(205, 70, 110)">
        <template v-slot:item-icon>
          <img src="@/assets/img/tabbar/home.png" alt="">
        </template>
        <template v-slot:item-icon-active>
          <img src="@/assets/img/tabbar/home_active.png" alt="">
        </template>
        <template v-slot:item-text>首页</template>
      </tab-bar-item>

      <tab-bar-item path="/category" activeColor="rgb(205, 70, 110)">
        <template v-slot:item-icon>
          <img src="@/assets/img/tabbar/category.png" alt="">
        </template>
        <template v-slot:item-icon-active>
          <img src="@/assets/img/tabbar/category_active.png" alt="">
        </template>
        <template v-slot:item-text>分类</template>
      </tab-bar-item>

      <tab-bar-item path="/cart" activeColor="rgb(205, 70, 110)">
        <template v-slot:item-icon>
          <img src="@/assets/img/tabbar/shopcart.png" alt="">
        </template>
        <template v-slot:item-icon-active>
          <img src="@/assets/img/tabbar/shopcart_active.png" alt="">
        </template>
        <template v-slot:item-text>购物车</template>
      </tab-bar-item>

      <tab-bar-item path="/profile" activeColor="rgb(205, 70, 110)">
        <template v-slot:item-icon>
          <img src="@/assets/img/tabbar/profile.png" alt="">
        </template>
        <template v-slot:item-icon-active>
          <img src="@/assets/img/tabbar/profile_active.png" alt="">
        </template>
        <template v-slot:item-text>我的</template>
      </tab-bar-item>

    </tab-bar>
  </div>
</template>

<script>
// 这里的 @ 是在webpack.base.conf.js中起的别名'@': resolve('src'),
// 另外我们还起了别名'assets': resolve('src/assets'),
// 使用在上面img的src中
// 不同的是，import可以直接使用别名，而html标签中需要在前面加上~
  import TabBar from '@/components/common/tabbar/TabBar.vue';
  import TabBarItem from '@/components/common/tabbar/TabBarItem.vue'

  export default {
    name: 'MainTabBar',
    components: {
      TabBar,
      TabBarItem
    }
  }

</script>

<style scoped>
  .main-tab-bar {
    /* 防止上下话都不敢时被tabControl覆盖 */
    z-index: 9;
    background-color: white;
  }
  .tab-bar {
    max-width: 600px;
    margin: auto;
  }
</style>
