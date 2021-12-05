<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
  import mainTabBar from '@/components/content/mainTabBar/MainTabBar.vue'

  export default {
    name: 'App',
    components: {
      mainTabBar
    }
  }
</script>


<style>
@import url('./assets/css/base.css');
/*
  导入式 ：在页面加载完成后再装载CSS
*/
/*
  链接式：在页面装载前装载CSS，写在<head></head>中
  <link href="./assets/css/base.css" type="text/css" rel="stylesheet">
*/

</style>
