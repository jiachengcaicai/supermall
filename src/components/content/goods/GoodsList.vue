<template>
  <div class="goods">
    <goods-list-item v-for="(item,id) in goods" :goods-item="item" :key="id"/>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'

  export default {
    name: 'GoodsList',
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      GoodsListItem
    },
  }

</script>

<style scoped>
  .goods {
    display: flex;
    /* 让弹性盒元素在必要的时候拆行 */
    flex-wrap: wrap;
    /* 间隔为两边的两倍 */
    justify-content: space-around;

    padding: 5px;
  }
</style>
