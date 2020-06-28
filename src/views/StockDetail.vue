<template>
  <div>
    <stock-info :stock="stock"></stock-info>
    <share-list :shares="shares"></share-list>
  </div>
</template>

<script>
  import ShareList from "../components/ShareList";
  import StockInfo from "../components/StockInfo";
  import {request} from "../network/request";

  export default {
    name: "StockDetail",
    components: {StockInfo, ShareList},
    data() {
      return {
        stock: '',
        shares: []
      }
    },
    created() {
      console.log(this.$route.query.ts_code);
      request({
        url: '/get_stock_detail',
        params: {
          ts_code: this.$route.query.ts_code
        }
      }).then(res=>{
        this.stock = res.data['stock']
        this.shares = res.data['shares']
      })
    }
  }
</script>

<style scoped>

</style>