<template>
  <stock-list ref="stock_list" :stocks="stocks"/>
</template>

<script>
  // @ is an alias to /src

  import StockList from "../components/StockList";
  import {getStocks} from "../network/stocks";

  export default {
    name: 'Stocks',
    components: {StockList},
    data() {
      return {
        stocks: [],
      }
    },
    created() {
      getStocks().then(res => {
        this.stocks = res.data['stocks']
        this.$refs.stock_list.loading = false
      })
    },
    activated() {
      // 当查询条件不为空时
      if(this.$route.query.years && this.$route.query.dv_ratio){
        this.$refs.stock_list.loading = true
        this.stocks = []
        getStocks({years: this.$route.query.years, dv_ratio:this.$route.query.dv_ratio}).then(res=>{
          this.stocks = res.data['stocks']
          this.$refs.stock_list.loading = false
        })
      }
    }
  }
</script>
