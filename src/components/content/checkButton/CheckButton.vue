<template>
  <div class="check-button" :class="{isCheck: itemSelected || isSelectAll}">
    <img src="~@/assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: 'CheckButton',
    props: {
      itemSelected: {
        type: Boolean,
        dafault: false
      },
      isSelectAll: {
        type: Boolean,
        dafault: false
      }
    },
    // data() {
    //   return {
    //     itemSelected: false
    //   }
    // },
  }

</script>

<style scoped>
  .check-button {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid #aaa;
    position: relative;
  }
  .check-button img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
  .isCheck {
    background-color: var(--color-tint);
  }
</style>
