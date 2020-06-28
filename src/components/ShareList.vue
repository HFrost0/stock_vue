<template>
  <div class="share_list">
    <el-table
            @sort-change="sortChange"
            :data="shares_back.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            style="width: 100%"
            stripe>
      <el-table-column
              prop="ts_code_id"
              label="股票代码">
      </el-table-column>
      <el-table-column
              prop="end_date"
              label="分红年度">
      </el-table-column>
      <el-table-column
              prop="ann_date"
              label="预案公告日">
      </el-table-column>
      <el-table-column
              prop="div_proc"
              label="实施进度">
      </el-table-column>
      <el-table-column
              prop="stk_div"
              label="每股转送">
      </el-table-column>
      <el-table-column
              prop="stk_bo_rate"
              label="每股转送比例">
      </el-table-column>
      <el-table-column
              prop="stk_co_rate"
              label="每股转增比例">
      </el-table-column>
      <el-table-column
              prop="cash_div"
              label="每股分红（税后）">
      </el-table-column>
      <el-table-column
              prop="cash_div_tax"
              label="每股分红（税前）">
      </el-table-column>
      <el-table-column
              prop="record_date"
              label="股权登记日">
      </el-table-column>
      <el-table-column
              prop="ex_date"
              label="除权登记日">
      </el-table-column>
      <el-table-column
              prop="pay_date"
              label="派息日">
      </el-table-column>
      <el-table-column
              prop="div_listdate"
              label="红股上市日">
      </el-table-column><el-table-column
            prop="imp_ann_date"
            label="实施公告日">
    </el-table-column><el-table-column
            prop="base_date"
            label="基准日">
    </el-table-column><el-table-column
            prop="base_share"
            label="基准股本（万">
    </el-table-column>
    </el-table>
    <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[20, 100, 200, 400]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="shares_back.length">
      >
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "ShareList",
    components: {},
    props: {
      shares: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        shares_back: this.shares,
        search: '',
        currentPage: 1,
        pageSize: 20,
      }
    },
    watch: {
      shares() {
        //必须监听父组件的变化，可能此变量只在初始化的时候获得一次赋值
        // console.log('watch stock');
        this.shares_back = this.shares
      }
    },
    methods: {
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
      },
      handleSizeChange(size) {
        this.pageSize = size;
      },
      //bug：在搜索后排序图标仍然保持高亮，但已经恢复默认排序
      sortChange(context) {
        console.log(context);
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