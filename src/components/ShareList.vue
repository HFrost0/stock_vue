<!--针对share的全部进行后端分页-->
<template>
  <div>
    <el-table
      v-loading="loading"
      @sort-change="sortChange"
      @filter-change="filterChange"
      :data="shares_back"
      style="width: 100%; font-size: 13px;"
      stripe
      :header-cell-style="{color: '#545c64'}"
    >
      <el-table-column
              align="center"
        prop="ts_code_id"
        label="股票代码">
        <template slot-scope="scope">
          <el-link class="link_color" v-if="!state" type="primary" @click="stockDetail(scope.row)">{{scope.row['ts_code_id']}}</el-link>
          <span v-else>{{scope.row['ts_code_id']}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        align="center">
      </el-table-column>
      <el-table-column
        sortable="custom"
        prop="end_date"
        label="分红年度"
        align="center">
      </el-table-column>
      <el-table-column
        sortable="custom"
        prop="ann_date"
        label="预案公告日"
        align="center">
      </el-table-column>
      <el-table-column
        sortable="custom"
        prop="imp_ann_date"
        label="实施公告日"
        align="center">
      </el-table-column>
      <el-table-column
        prop="div_proc"
        label="实施进度"
        align="center"
        :column-key="'div_proc'"
        :filters="[
                { text: '实施', value: '实施' },
                { text: '预案', value: '预案' },
                { text: '股东大会通过', value: '股东大会通过' },
                { text: '股东提议', value: '股东提议' },
                { text: '未通过', value: '未通过' },
                ]"
      >
      </el-table-column>
      <el-table-column
        sortable="custom"
        prop="stk_div"
        label="每股转送"
        align="center">
      </el-table-column>
      <el-table-column
        sortable="custom"
        prop="stk_bo_rate"
        label="每股转送比例"
        align="center">
      </el-table-column>
      <el-table-column
        sortable="custom"
        prop="stk_co_rate"
        label="每股转增比例"
        align="center">
      </el-table-column>
      <el-table-column
        sortable="custom"
        prop="cash_div"
        label="每股分红（税后）"
        align="center">
      </el-table-column>
      <el-table-column
        sortable="custom"
        prop="cash_div_tax"
        label="每股分红（税前）"
        align="center">
      </el-table-column>
      <el-table-column
        sortable="custom"
        prop="record_date"
        label="股权登记日"
        align="center">
      </el-table-column>
      <el-table-column
        sortable="custom"
        prop="ex_date"
        label="除权登记日"
        align="center">
      </el-table-column>
      <el-table-column
        sortable="custom"
        prop="pay_date"
        label="派息日"
        align="center">
      </el-table-column>
      <el-table-column
        sortable="custom"
        prop="div_listdate"
        label="红股上市日"
        align="center">
      </el-table-column>
      <el-table-column
        sortable="custom"
        prop="base_date"
        label="基准日"
        align="center">
      </el-table-column>
      <el-table-column
        sortable="custom"
        prop="base_share"
        label="基准股本（万）"
        align="center">
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

  import {formatDate} from "@/common/utils";

  export default {
    name: "ShareList",
    components: {},
    props: {
      total: {
        type: Number,
      },
      shares: {
        type: Array,
      },
      // 该组件是在详情页面还是分红页面被引用的状态
      state: {
        type: Boolean
      }
    },
    computed: {
      shares_back() {
        return this.shares.map(formatDate)
      },
      total_back() {
        return this.total
      }
    },
    data() {
      return {
        loading: true,
        currentPage: 1,
        pageSize: 15,
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
            ts_code: row['ts_code_id'],
            myTab: "second"
          }
        })
      },
      handleCurrentChange(currentPage) {
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
  .link_color{
    font-size: 13px;
    color: #0366D6;
  }
  .el-link.link_color:hover{
    /*font-weight: bold;*/
    color: #0366D6;
  }
  .el-link.link_color:active{
    /*font-weight: bold;*/
    color: #0366D6;
  }

</style>
<style>
  .el-pager li.active,.el-pager li:hover,
  .el-pagination button:hover {
    color: #0366D6;
  }

</style>
