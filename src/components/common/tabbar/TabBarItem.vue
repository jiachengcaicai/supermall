<template>
  <div class="tab-bar-item" @click="itemClick">
    <template v-if="!isActive">
      <slot name="item-icon"></slot>
    </template>
    <!-- 选中时，改变图片样式 -->
    <template v-else>
      <slot name="item-icon-active"></slot>
    </template>

    <!-- <div :class="{active: isActive}"> -->
    <div :style="activeStyle">
      <!-- 不能直接在solt上定义样式，因为是插槽，内容替换进来的时候会替换掉，应当在div上设置 -->
      <!-- <slot :class="{active: isActive}" name="item-text"></slot> -->
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabBarItem',
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'blue'
      }
    },
    data() {
      return {
        // isActive: true
      }
    },
    computed: {
      isActive() {  //判断是否处于活跃，即是否被显示view
        // return this.$route.path.indexOf(this.path) !== -1;
        return this.$route.path === this.path;
      },
      activeStyle() { // 处于活跃的话，就把style修改为组件传进props的activeColor
        return this.isActive ? {color: this.activeColor} : {};
      }
    },
    methods: {
      itemClick() {
        if(this.$route.path === this.path){
          return;
        }
        this.$router.replace(this.path);
        // console.log(this.path);
      }
    }
  }

</script>

<style scoped>
  .tab-bar-item {
    flex: 0 1 50px;
    text-align: center;
    /* 很多开发中一般的高度都是用的49 */
    height: 49px;
    font-size: 13px;
  }
  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
  }
  /* .active {
    color: rgb(205, 70, 110);
  } */
</style>
