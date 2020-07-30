<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6"><el-button type="primary" plain @click="prev" icon="el-icon-d-arrow-left" circle></el-button></el-col>
      <el-col :span="6" :offset="3"><stock-info :stock="stock" align="center"></stock-info></el-col>
    </el-row>

    <el-tabs :tab-position="left" v-model="activeName" type="border-card" style="margin-bottom: 30px;">
      <el-tab-pane name="first" :key="'first'">
        <span slot="label"><i class="el-icon-date"></i> 每日指标</span>
        <daily-list
                ref="daily_list"
                :total="daily_total"
                :daily_basics="daily_basics"
                @pageChange="daily_pageChange"
                @sortChange="daily_sortChange"
        ></daily-list>
      </el-tab-pane>
      <el-tab-pane name="second" :key="'second'">
        <span slot="label"><i class="el-icon-s-marketing"></i> 分红配股</span>
        <share-list
                ref="share_list"
                :total="share_total"
                :shares="shares"
                @filterChange="share_filterChange"
                @pageChange="share_pageChange"
                @sortChange="share_sortChange"
        ></share-list>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
  import {getStock, getStockDaily} from "../network/stock_daily";
  import StockInfo from "../components/StockInfo";
  import DailyList from "../components/DailyList";
  import ShareList from "../components/ShareList";
  import {getShareList} from "../network/stock_detail";
  export default {
    name: "StockMerge",
    components: {ShareList, DailyList, StockInfo},
    props: {},
    data() {
      return {
        stock: {},
        activeName: "first",
        daily_total: 0,
        daily_basics: [],
        daily_context: {
          ts_code: '',
          prop: 'trade_date',
          order: 'descending',
          offset: 0,
          page_size: 10,
        },
        share_total: 0,
        shares: [],
        share_context: {
          ts_code: '',
          prop: 'imp_ann_date',
          order: 'descending',
          offset: 0,
          page_size: 10,
          proc_filter: [],
        }
      };
    },
    mounted(){

    },
    methods: {
      prev(){
        this.$router.go(-1)
      },
      daily_sortChange(prop, order) {
        this.daily_context.prop = prop
        this.daily_context.order = order
      },
      //仅在pageChange中进行请求
      daily_pageChange(offset, PageSize) {
        this.daily_context['offset'] = offset
        this.daily_context['page_size'] = PageSize
        this.$refs.daily_list.loading = true
        getStockDaily(this.daily_context).then(res => {
          this.daily_total = res.data['total']
          this.daily_basics = res.data['daily_basics']
          this.$refs.daily_list.loading = false
        })
      },
      share_filterChange(proc_filter) {
        this.share_context.proc_filter = proc_filter
      },
      share_sortChange(prop, order) {
        this.share_context.prop = prop
        this.share_context.order = order
      },
      //仅在pageChange中进行请求
      share_pageChange(offset, PageSize) {
        this.share_context['offset'] = offset
        this.share_context['page_size'] = PageSize
        this.$refs.share_list.loading = true
        getShareList(this.share_context).then(res => {
          this.share_total = res.data['total']
          this.shares = res.data['shares']
          this.$refs.share_list.loading = false
        })
      }
    },

    created() {
      this.daily_context.ts_code = this.$route.query.ts_code
      getStock({ts_code: this.daily_context.ts_code}).then(res => {
        this.stock = res.data['stock']
      })
      //并发
      getStockDaily(this.daily_context).then(res => {
        this.daily_total = res.data['total']
        this.daily_basics = res.data['daily_basics']
        this.$refs.daily_list.loading = false
      })
      this.share_context.ts_code = this.$route.query.ts_code
      // getStock({ts_code: this.share_context.ts_code}).then(res => {
      //   this.stock = res.data['stock']
      // })
      getShareList(this.share_context).then(res => {
        console.log(res)
        this.share_total = res.data['total']
        this.shares = res.data['shares']
        this.$refs.share_list.loading = false
      })
    }
  };
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;

  }
  .el-col {
    border-radius: 4px;
  }
  .el-button{
    margin-top: 5%;
    margin-left: 2%;
    font-size: 18px;
    /*color: black;*/
  }

</style>