<template>
  <div id="detailNavBar">
    <nav-bar>
      <template v-slot:left>
        <div class="back" @click="backClick">
          <img src="@/assets/img/common/back.svg" alt="">
        </div>
      </template>
      <template v-slot:center>
        <div class="title">
          <div v-for="(item,index) in titles" class="title-item" @click="titleClick(index)"
           :class="{active: index === currentIndex}" :key="index"
          >
            {{item}}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from '@/components/common/navbar/NavBar.vue'

  export default {
    name: 'DetailNavbar',
    data(){
      return {
        titles: ['宝贝','评论','详细','推荐'],
        currentIndex: 0
      }
    },
    components: {
      NavBar
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index
      },
      backClick() {
        // this.$router.go(-1)
        this.$router.back()
      }
    }
  }

</script>

<style scoped>
  #detailNavBar {
    background-color: white;
    position: relative;
    z-index: 11;
  }
  .title {
    display: flex;
    font-size: 0.9em;
  }
  .title-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
  .back img{
    vertical-align: middle;
  }
</style>
