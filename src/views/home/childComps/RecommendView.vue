<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" class="recommend-item" :key="index">
      <a :href="item.link">
        <img :src="item.image" :alt="item.title" @load="recommendImageLoad">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RecommendView',
    data() {
      return {
        isLoad: false
      }
    },
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      recommendImageLoad() {
        if(!this.isLoad) {
          this.$emit('recommendImageLoad')
          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    justify-content: space-around;
    font-size: 0.8rem;
    padding: 10px 0 20px;
    border-bottom: 10px solid #eee;
    text-align: center;
  }
  .recommend-item {
    flex: 1;
  }
  .recommend-item img {
    width: 80%;
    margin-bottom: 10px;
  }
</style>
