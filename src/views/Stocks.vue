<template>
  <div class="block">
    <el-divider content-position="left"><i class="el-icon-edit"></i><span class="font">添加一个条件</span></el-divider>
    <query-selector
            ref="query_selector"
            @filter="filter"
            @reset="reset"
    ></query-selector>
    <el-divider content-position="left"><i class="el-icon-circle-check"></i><span class="font">符合条件的股票</span></el-divider>
    <el-card>
      <stock-list
              ref="stock_list"
              :stocks="stocks"
      ></stock-list>
    </el-card>

  </div>
</template>

<script>
  import QuerySelector from "../components/QuerySelector";
  import QueryItem from "../components/QueryItem";
  import StockList from "../components/StockList";
  import {getStocks} from "@/network/stocks";

  export default {
    name: "Stocks",
    components: {StockList, QueryItem, QuerySelector},
    data() {
      return {
        stocks: [],
        queries: []
      }
    },
    watch: {
      queries() {
        if (this.queries.length === 0) {
          this.stocks = []
          this.$refs.stock_list.loading = true
          getStocks({queries: this.queries}).then(res => {
            this.stocks = res.data['stocks']
            this.$refs.stock_list.loading = false
            // 当条件变更后重置子组件的页码
            this.$refs.stock_list.currentPage = 1
          })
        }
      }
    },
    methods: {
      reset() {
        this.queries = []
      },
      dropItem(index) {
        this.queries.splice(index, 1)
      },
      filter(queries) {
        this.queries = queries
        this.stocks = []
        this.$refs.stock_list.loading = true
        this.$refs.query_selector.loading = true
        getStocks({queries: this.queries}).then(res => {
          this.stocks = res.data['stocks']
          this.$refs.stock_list.loading = false
          this.$refs.query_selector.loading = false
          // 当条件变更后重置子组件的页码
          this.$refs.stock_list.currentPage = 1
        })
      },
      // 提交Query重新请求
      // submitQuery() {
      //   this.stocks = []
      //   this.$refs.stock_list.loading = true
      //   getStocks({queries: this.queries}).then(res => {
      //     this.stocks = res.data['stocks']
      //     this.$refs.stock_list.loading = false
      //     // 当条件变更后重置子组件的页码
      //     this.$refs.stock_list.currentPage = 1
      //   })
      // }
    },
    created() {
      getStocks({queries: this.queries}).then(res => {
        this.stocks = res.data['stocks']
        this.$refs.stock_list.loading = false
      }).catch(err=>{
        console.log(err)
      })
    },

  }
</script>

<style scoped>
  .el-input {
    width: 300px;
  }

  .item-container {
    min-height: 100px;
  }

  .button {
    margin-top: 15px;
    margin-bottom: 15px;
    float: right;
  }

  .without {
    width: 100px;
    margin: 0 auto;
    color: #909399;
  }

  [class^="el-icon"] {
    margin-right: 10px;
  }
  .block {
    margin-left: 80px; margin-right: 80px;
  }
  .font{
    font-weight: bold;
    font-size: 13px;
    color: #545c64;
  }

</style>
