<template>
  <div class="detail-param" v-if="Object.keys(paramInfo).length != 0">
    <div class="table-name">{{paramInfo.sizeKey}}</div>
    <table class="size-info" v-for="(table,t_index) in paramInfo.sizes" :key="t_index">
      <tr v-for="(tr,r_index) in table" :key="r_index">
        <td v-for="(td,d_index) in tr" :key="d_index">{{td}}</td>
      </tr>
    </table>
    <div class="table-name">{{paramInfo.infoKey}}</div>
    <table class="param-info">
      <tr v-for="(info,index) in paramInfo.infos" :key="index">
        <td class="param-info-key">{{info.key}}</td>
        <td class="param-value">{{info.value}}</td>
      </tr>
    </table>
    <div class="img-info" v-if="paramInfo.image.length != 0">
      <img :src="paramInfo.image" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailPramaInfo',
    props: {
      paramInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }

</script>

<style scoped>
  .detail-param {
    padding: 20px 15px;
    font-size: 0.7rem;
    background-color: white;
  }
  .table-name {
    color: black;
    font-size: 1rem;
    text-align: center;
    margin: 2rem 0 1rem;
  }
  .detail-param table {
    width: 80%;
    margin: 0 auto;
    border-collapse: collapse;
  }
  .detail-param table tr {
    height: 2.5rem;
  }
  .detail-param table tr td {
    border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  }
  .param-info {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
  .param-info-key {
    /* 当value的数据比较大的时候，会挤到key，所以给一个固定宽度 */
    width: 6rem;
  }
  .param-value {
    color: #eb4868;
  }
  .img-info img {
    width: 100%;
  }
</style>
