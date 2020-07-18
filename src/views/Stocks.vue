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
        context:{
          years: null,
          dv_ratio: null
        }
      }
    },
    created() {
      getStocks().then(res => {
        this.stocks = res.data['stocks']
        this.$refs.stock_list.loading = false
      })
    },
    activated() {
      // 当查询条件变更时重新请求
      if(this.context.years!==this.$route.query.years||this.context.dv_ratio!==this.$route.query.dv_ratio){
        this.$refs.stock_list.loading = true
        this.stocks = []
        // 变更context
        this.context.years=this.$route.query.years
        this.context.dv_ratio=this.$route.query.dv_ratio
        // 请求
        getStocks(this.context).then(res=>{
          this.stocks = res.data['stocks']
          this.$refs.stock_list.loading = false
        })
      }
    }
  }
</script>
