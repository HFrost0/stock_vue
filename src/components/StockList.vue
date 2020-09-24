<template>
  <div>
    <el-input class="input_style"
      v-model="search"
      size="small"
      placeholder="输入股票代码或名称"/>
    <el-table
      v-loading="loading"
      @sort-change="sortChange"
      :data="stocks_back.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      style="width: 100%"
      stripe
      :header-cell-style="{color: '#545c64'}">
      <el-table-column
        v-for="(value, key) in show_dict"
        :prop="key"
        :label="value"
        :sortable="['symbol', 'name', 'area', 'industry'].indexOf(key)===-1"
      >
        <template
          slot-scope="scope">
          <el-link class="link_color" v-if="key==='ts_code'" type="primary" @click="stockDetail(scope.row)">{{scope.row['ts_code']}}
          </el-link>
          <span v-else>{{scope.row[key]}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[20, 100, 200, 400]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="stocks_back.length">
      >
    </el-pagination>
  </div>
</template>

<script>

import {formatDate} from "../common/utils";
import {stock_dict, query_dict} from "../common/static";


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
      stocks_back: this.stocks.map(formatDate),
      search: '',
      currentPage: 1,
      pageSize: 20,
      loading: true
    }
  },
  computed: {
    show_dict() {
      let s_dict = Object.assign({}, stock_dict, query_dict)
      let show_dict = {}
      if (this.stocks_back.length > 0) {
        for (let key in this.stocks_back[0]) {
          if (key in s_dict)
            show_dict[key] = s_dict[key]
          else {
            let temp = key.split('-')
            let label = ''
            if (temp[0] === 'current_level')
              label += s_dict[temp[1]] + "历史水平（过去" + temp[2].toString() + "个月)"
            show_dict[key] = label
          }
        }
      }
      return show_dict
    }
  },
  watch: {
    search(val, oldVal) {
      this.stocks_back = this.stocks.filter(item => {
        // console.log(item['ts_code'].indexOf(val) !== -1)
        return item['ts_code'].indexOf(val) !== -1 || item['name'].indexOf(val) !== -1 || item['area'].indexOf(val) !== -1 || item['industry'].indexOf(val) !== -1
      })
      this.currentPage = 1
    },
    stocks() {
      //必须监听父组件的变化，可能此变量只在初始化的时候获得一次赋值
      // console.log('watch stock');
      this.stocks_back = this.stocks.map(formatDate)
    }
  },
  methods: {
    stockDetail(row) {
      this.$router.push({
        path: '/stock_detail',
        query: {
          ts_code: row['ts_code'],
          myTab: "first"
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
  .el-link.link_color:hover{
    font-weight: bold;
  }
  .el-link.link_color:active{
    font-weight: bold;
  }
</style>
<style>
  .el-pager li.active,.el-pager li:hover,
  .el-pagination button:hover {
    color: #EEB422;
  }

</style>