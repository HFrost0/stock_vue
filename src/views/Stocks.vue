<template>
  <div>
    <el-divider content-position="left"><i class="el-icon-edit"></i>添加一个条件</el-divider>
    <query-selector
      @addQuery="addQuery"
    ></query-selector>
    <el-divider content-position="left"><i class="el-icon-search"></i>当前条件</el-divider>

    <div class="item-container">
      <query-item
        v-for="(query,index) in queries"
        :query="query"
        @dropItem="dropItem(index)"
      ></query-item>
      <!--当query为空时不显示按钮-->
      <span v-if="queries.length>0" class="button">
        <el-button @click="submitQuery">筛选</el-button>
        <el-button @click="queries=[]">重置</el-button>
      </span>
      <div v-else class="without"><p>当前没有条件</p></div>
    </div>

    <stock-list
      ref="stock_list"
      :stocks="stocks"
    ></stock-list>

  </div>
</template>

<script>
  import QuerySelector from "../components/QuerySelector";
  import QueryItem from "../components/QueryItem";
  import StockList from "../components/StockList";
  import {getStocks} from "../network/stocks";

  export default {
    name: "Stocks",
    components: {StockList, QueryItem, QuerySelector},
    data() {
      return {
        stocks: [],
        queries: []
      }
    },
    watch:{
      queries(){
        if(this.queries.length === 0){
          this.submitQuery()
        }
      }
    },
    methods: {
      dropItem(index) {
        this.queries.splice(index, 1)
      },
      addQuery(query) {
        this.queries.push(query)
      },
      // 提交Query重新请求
      submitQuery() {
        this.stocks = []
        this.$refs.stock_list.loading = true
        getStocks({queries: this.queries}).then(res => {
          this.stocks = res.data['stocks']
          this.$refs.stock_list.loading = false
          // 当条件变更后重置子组件的页码
          this.$refs.stock_list.currentPage = 1
        })
      }
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

</style>
