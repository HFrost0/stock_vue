<!--针对share的全部进行后端分页-->
<template>
  <div class="share_list">
    <el-table
            @sort-change="sortChange"
            @filter-change="filterChange"
            :data="shares_back"
            style="width: 100%"
            stripe>
      <el-table-column
              prop="ts_code_id"
              label="股票代码">
        <template slot-scope="scope">
          <el-link type="primary" @click="stockDetail(scope.row)">{{scope.row['ts_code_id']}}</el-link>
        </template>
      </el-table-column>
      <el-table-column
              prop="name"
              label="名称">
      </el-table-column>
      <el-table-column
              sortable="custom"
              prop="end_date"
              label="分红年度">
      </el-table-column>
      <el-table-column
              sortable="custom"
              prop="ann_date"
              label="预案公告日">
      </el-table-column>
      <el-table-column
              prop="div_proc"
              label="实施进度"
              :column-key="'div_proc'"
              :filters="[
                { text: '实施', value: '实施' },
                { text: '预案', value: '预案' },
                { text: '股东大会通过', value: '股东大会通过' },
                { text: '股东提议', value: '股东提议' },]"
      >
      </el-table-column>
      <el-table-column
              sortable="custom"
              prop="stk_div"
              label="每股转送">
      </el-table-column>
      <el-table-column
              sortable="custom"
              prop="stk_bo_rate"
              label="每股转送比例">
      </el-table-column>
      <el-table-column
              sortable="custom"
              prop="stk_co_rate"
              label="每股转增比例">
      </el-table-column>
      <el-table-column
              sortable="custom"
              prop="cash_div"
              label="每股分红（税后）">
      </el-table-column>
      <el-table-column
              sortable="custom"
              prop="cash_div_tax"
              label="每股分红（税前）">
      </el-table-column>
      <el-table-column
              sortable="custom"
              prop="record_date"
              label="股权登记日">
      </el-table-column>
      <el-table-column
              sortable="custom"
              prop="ex_date"
              label="除权登记日">
      </el-table-column>
      <el-table-column
              sortable="custom"
              prop="pay_date"
              label="派息日">
      </el-table-column>
      <el-table-column
              sortable="custom"
              prop="div_listdate"
              label="红股上市日">
      </el-table-column>
      <el-table-column
              sortable="custom"
              prop="imp_ann_date"
              label="实施公告日">
      </el-table-column>
      <el-table-column
              sortable="custom"
              prop="base_date"
              label="基准日">
      </el-table-column>
      <el-table-column
              sortable="custom"
              prop="base_share"
              label="基准股本（万">
      </el-table-column>
    </el-table>
    <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="total_back">
      >
    </el-pagination>
  </div>
</template>

<script>

  import {formatDate} from "../common/utils";

  export default {
    name: "ShareList",
    components: {},
    props: {
      total: {
        type: Number,
      },
      shares: {
        type: Array,
      }
    },
    data() {
      return {
        total_back: this.total,
        shares_back: this.shares.map(formatDate),
        currentPage: 1,
        pageSize: 10,
      }
    },
    watch: {
      total() {
        this.total_back = this.total
      },
      shares() {
        //必须监听父组件的变化，可能此变量只在初始化的时候获得一次赋值
        this.shares_back = this.shares.map(formatDate)
      }
    },
    methods: {
      filterChange(filters) {
        // console.log(filters['div_proc'])
        this.$emit('filterChange', filters['div_proc'])
        this.handleCurrentChange(1)
      },
      stockDetail(row) {
        this.$router.push({
          path: '/stock_detail',
          query: {
            ts_code: row['ts_code_id']
          }
        })
      },
      handleCurrentChange(currentPage) {
        console.log('page change')
        this.currentPage = currentPage
        // 请求服务端刷新数据
        const offset = (currentPage - 1) * this.pageSize
        this.$emit('pageChange', offset, this.pageSize)
      },
      //bug：在搜索后排序图标仍然保持高亮，但已经恢复默认排序
      sortChange(context) {
        if (context.order === 'ascending' || context.order === 'descending') {
          this.$emit('sortChange', context.prop, context.order)
          this.handleCurrentChange(1)
        }
      }
    }
  }
</script>

<style scoped>

</style>