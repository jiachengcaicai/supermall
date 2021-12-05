<template>
    <div id="tab-bar">
      <slot></slot>
    </div>
</template>

<script>
  export default {
    name: 'TabBar'
  }
</script>

<style scoped>
  #tab-bar {
    display: flex;
    justify-content: space-around;
    background-color: #f6f6f6;
    /*
      fixed生成绝对定位的元素，相对于浏览器窗口进行定位，
      和absoute的区别是fixed不会跟随屏幕滚动(常见的各种贴屏广告)
      元素的位置通过top、right、bottom、left
      控制，top、left的定位起点是包含块左上角，
      right、bottom的定位起点是包含块右下角
    */
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0px;
    z-index: 9;
    box-shadow: 0 -3px 10px rgba(100, 100, 100, 0.3);
  }
</style>
