<template>
  <div class="stock_list">
    <el-input
            v-model="search"
            size="mini"
            placeholder="查询"/>
    <el-table
            @sort-change="sortChange"
            :data="stocks_back.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            style="width: 100%"
            stripe>
      <el-table-column
              prop="ts_code"
              label="股票代码">
        <template slot-scope="scope">
          <el-link type="primary" @click="stockDetail(scope.row)">{{scope.row['ts_code']}}</el-link>
        </template>
      </el-table-column>
      <el-table-column
              prop="name"
              label="名称">
      </el-table-column>
      <el-table-column
              prop="area"
              label="地区">
      </el-table-column>
      <el-table-column
              prop="industry"
              label="行业">
      </el-table-column>
      <el-table-column
              sortable="custom"
              prop="list_date"
              label="上市日期">
      </el-table-column>
      <el-table-column
              sortable="custom"
              prop="share_times"
              label="分红次数">
      </el-table-column>
    </el-table>
    <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[50, 100, 200, 400]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="stocks_back.length">
      >
    </el-pagination>
  </div>
</template>

<script>
  import {request} from "../network/request";

  export default {
    name: "StockList",
    components: {},
    props: {
      stocks: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        stocks_back: this.stocks,
        search: '',
        currentPage: 1,
        pageSize: 50,
      }
    },
    watch: {
      search(val, oldVal) {
        this.stocks_back = this.stocks.filter(item => {
          // console.log(item['ts_code'].indexOf(val) !== -1)
          return item['ts_code'].indexOf(val) !== -1 || item['name'].indexOf(val) !== -1 || item['area'].indexOf(val) !== -1 || item['industry'].indexOf(val) !== -1
        })
      },
      stocks() {
        //必须监听父组件的变化，可能此变量只在初始化的时候获得一次赋值
        // console.log('watch stock');
        this.stocks_back = this.stocks
      }
    },
    methods: {
      stockDetail(row) {
        this.$router.push({
          path:'/stock_detail',
          query:{
            ts_code:row['ts_code']
          }
        })
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
      },
      handleSizeChange(size) {
        this.pageSize = size;
      },
      //bug：在搜索后排序图标仍然保持高亮，但已经恢复默认排序
      sortChange(context) {
        if (context.order === 'ascending' || context.order === 'descending') {
          this.stocks_back.sort((a, b) => {
            let result
            if (context.prop === 'list_date') {
              result = new Date(a[context.prop]) - new Date(b[context.prop])
            } else {
              result = a[context.prop] - b[context.prop]
            }
            return context.order === 'ascending' ? result : -result
          })
          this.currentPage = 1
        }
      }
    }
  }
</script>

<style scoped>

</style>