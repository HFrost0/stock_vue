<template>
  <div>
    <stock-info :stock="stock"></stock-info>
    <share-list
            ref="share_list"
            :total="total"
            :shares="shares"
            @filterChange="filterChange"
            @pageChange="pageChange"
            @sortChange="sortChange"
    ></share-list>
  </div>
</template>

<script>
  import ShareList from "../components/ShareList";
  import StockInfo from "../components/StockInfo";

  import {getStock,getShareList} from "../network/stock_detail";

  export default {
    name: "StockDetail",
    components: {StockInfo, ShareList},
    data() {
      return {
        stock: {},
        total: 0,
        shares: [],
        context: {
          ts_code: '',
          prop: 'imp_ann_date',
          order: 'descending',
          offset: 0,
          page_size: 10,
          proc_filter: [],
        }
      }
    },
    methods: {
      filterChange(proc_filter) {
        this.context.proc_filter = proc_filter
      },
      sortChange(prop, order) {
        this.context.prop = prop
        this.context.order = order
      },
      //仅在pageChange中进行请求
      pageChange(offset, PageSize) {
        this.context['offset'] = offset
        this.context['page_size'] = PageSize
        this.$refs.share_list.loading = true
        getShareList(this.context).then(res => {
          this.total = res.data['total']
          this.shares = res.data['shares']
          this.$refs.share_list.loading = false
        })
      }
    },
    activated() {
      this.context.ts_code = this.$route.query.ts_code
      getStock({ts_code: this.context.ts_code}).then(res => {
        this.stock = res.data['stock']
      })
      //并发
      getShareList(this.context).then(res => {
        console.log(res)
        this.total = res.data['total']
        this.shares = res.data['shares']
        this.$refs.share_list.loading = false
      })
    }
  }
</script>

<style scoped>

</style>