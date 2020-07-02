<template>
  <stock-list ref="stock_list" :stocks="stocks"/>
</template>

<script>
  // @ is an alias to /src

  import StockList from "../components/StockList";
  import {request} from "../network/request";

  export default {
    name: 'Stocks',
    components: {StockList},
    data() {
      return {
        stocks: [],
      }
    },
    created() {
      request({
        url: '/get_stocks'
      }).then(res => {
        this.stocks = res.data['stocks']
        this.$refs.stock_list.loading = false
      })
    },
  }
</script>
