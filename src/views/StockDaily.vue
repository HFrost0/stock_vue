<template>
  <div>
    <stock-info :stock="stock"></stock-info>
    <h1>每日指标</h1>
    <daily-list
      ref="daily_list"
      :total="total"
      :daily_basics="daily_basics"
      @pageChange="pageChange"
      @sortChange="sortChange"
    ></daily-list>
  </div>
</template>

<script>
  import StockInfo from "../components/StockInfo";
  import DailyList from "../components/DailyList";
  import {getStock, getStockDaily} from "../network/stock_daily";

  export default {
    name: "StockDaily",
    components: {DailyList, StockInfo},
    data() {
      return {
        stock: {},
        total: 0,
        daily_basics: [],
        context: {
          ts_code: '',
          prop: 'trade_date',
          order: 'descending',
          offset: 0,
          page_size: 10,
        }
      }
    },
    methods: {
      sortChange(prop, order) {
        this.context.prop = prop
        this.context.order = order
      },
      //仅在pageChange中进行请求
      pageChange(offset, PageSize) {
        this.context['offset'] = offset
        this.context['page_size'] = PageSize
        this.$refs.daily_list.loading = true
        getStockDaily(this.context).then(res => {
          this.total = res.data['total']
          this.daily_basics = res.data['daily_basics']
          this.$refs.daily_list.loading = false
        })
      }
    },
    activated() {
      this.context.ts_code = this.$route.query.ts_code
      getStock({ts_code: this.context.ts_code}).then(res => {
        this.stock = res.data['stock']
      })
      //并发
      getStockDaily(this.context).then(res => {
        this.total = res.data['total']
        this.daily_basics = res.data['daily_basics']
        this.$refs.daily_list.loading = false
      })
    }
  }
</script>

<style scoped>

</style>