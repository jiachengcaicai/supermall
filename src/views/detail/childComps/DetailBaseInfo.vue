<template>
  <div v-if="Object.keys(goods).length != 0" class="base-info">
    <div class="info-title">&nbsp;{{goods.title}}</div>
    <div class="info-price">
      <span class="new-price">{{goods.newPrice}}</span>
      <span class="old-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item"
        v-for="index in goods.services.length-1" :key="index"
      >
        <img :src="goods.services[index-1].icon"/>
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailBaseInfo',
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .base-info {
    padding: 10px;
    border-bottom: 5px solid rgb(245, 245, 245);
    background-color: white;
  }
  .info-title {
    line-height: 1.3;
    margin-bottom: 10px;
    color: black;
  }
  .info-price {
    margin: 15px 0;
    position: relative;
  }
  .new-price {
    color: var(--color-high-text);
    font-size: 20px;
  }
  .old-price {
    font-size: 13px;
    color: gray;
    margin-left: 0.3rem;
    text-decoration:line-through
  }
  .discount {
    position: relative;
    top: -0.7rem;
    display: inline-block;
    background-color: var(--color-high-text);
    color: white;
    font-size: 10px;
    padding: 3px;
    border: 1px solid;
    border-radius: 20px;
    margin-left: 0.3rem;
  }
  .info-other {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    padding-bottom: 10px;
    border-bottom: 3px solid #f2f5f8;
  }
  .info-other span {
    color: gray;
  }
  .info-service {
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    color:black;
    padding: 15px 0 5px 0;
  }
  .info-service-item img {
    width: 0.8rem;
  }
</style>
