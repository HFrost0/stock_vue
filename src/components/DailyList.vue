<template>
  <div>
    <el-table
      v-loading="loading"
      @sort-change="sortChange"
      :data="daily_basics_back"
      style="width: 100%; font-size: 13px"
      stripe
      :header-cell-style="{color: '#545c64'}">
      <el-table-column
        prop="ts_code_id"
        label="股票代码"
        align="center">
      </el-table-column>
      <el-table-column
        prop="trade_date"
        label="交易日期"
        align="center">
      </el-table-column>
      <el-table-column
        prop="close"
        label="收盘价"
        align="center">
      </el-table-column>
      <el-table-column
        prop="turnover_rate"
        label="换手率(%)"
        align="center">
      </el-table-column>
      <el-table-column
        prop="turnover_rate_f"
        label="换手率(自由流通股)"
        align="center">
      </el-table-column>
      <el-table-column
        prop="volume_ratio"
        label="量比"
        align="center">
      </el-table-column>
      <el-table-column
        prop="pe"
        label="市盈率"
        align="center">
      </el-table-column>
      <el-table-column
        prop="pe_ttm"
        label="市盈率(TTM)"
        align="center">
      </el-table-column>
      <el-table-column
        prop="pb"
        label="市净率"
        align="center">
      </el-table-column>
      <el-table-column
        prop="ps"
        label="市销率"
        align="center">
      </el-table-column>
      <el-table-column
        prop="ps_ttm"
        label="市销率(TTM)"
        align="center">
      </el-table-column>
      <el-table-column
        prop="dv_ratio"
        label="股息率(%)"
        align="center">
      </el-table-column>
      <el-table-column
        prop="dv_ttm"
        label="股息率(TTM)"
        align="center">
      </el-table-column>
      <el-table-column
        prop="total_share"
        label="总股本(万股)"
        align="center">
      </el-table-column>
      <el-table-column
        prop="float_share"
        label="流通股本(万股)"
        align="center">
      </el-table-column>
      <el-table-column
        prop="free_share"
        label="自由流通股本(万股)"
        align="center">
      </el-table-column>
      <el-table-column
        prop="total_mv"
        label="总市值(万元)"
        align="center">
      </el-table-column>
      <el-table-column
        prop="circ_mv"
        label="流通市值(万元)"
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

  import {formatDate} from "../common/utils";

  export default {
    name: "DailyList",
    components: {},
    props: {
      total: {
        type: Number,
      },
      daily_basics: {
        type: Array,
      }
    },
    data() {
      return {
        loading: true,
        currentPage: 1,
        pageSize: 10,
      }
    },
    computed: {
      total_back() {
        return this.total
      },
      daily_basics_back() {
        return this.daily_basics.map(formatDate)
      }
    },
    methods: {
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