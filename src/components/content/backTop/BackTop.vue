<template>
  <div class="back-top">
    <img src="@/assets/img/common/top.png" alt="上移到顶部">
  </div>
</template>

<script>
  export default {
    name: 'BackTop'
  }

</script>

<style scoped>
  .back-top {
    position: fixed;
    right: 5vw;
    bottom: 10vh;
    z-index: 9;
  }
  .back-top img {
    width: 12vw;
    max-width: 70px;
  }
</style>
