<template>
  <div>
    <stock-info :stock="stock"></stock-info>
    <share-list
            :total="total"
            :shares="shares"
            @pageChange="pageChange"
            @sortChange="sortChange"
    ></share-list>
  </div>
</template>

<script>
  import ShareList from "../components/ShareList";
  import StockInfo from "../components/StockInfo";
  import {request} from "../network/request";

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
          prop: 'ann_date',
          order: 'descending',
          offset: 0
        }
      }
    },
    methods: {
      sortChange(prop, order) {
        this.context.prop = prop
        this.context.order = order
      },
      //仅在pageChange中进行请求
      pageChange(offset, PageSize) {
        this.context['offset'] = offset
        this.context['page_size'] = PageSize
        request({
          url: '/get_shares',
          params: this.context
        }).then(res => {
          this.total = res.data['total']
          this.shares = res.data['shares']
        })
      }
    },
    activated() {
      this.context.ts_code = this.$route.query.ts_code
      request({
        url: '/get_stock',
        params: {ts_code: this.context.ts_code}
      }).then(res => {
        this.stock = res.data['stock']
      })
      //并发
      request({
        url: '/get_shares',
        params: this.context
      }).then(res => {
        console.log(res)
        this.total = res.data['total']
        this.shares = res.data['shares']
      })
    }
  }
</script>

<style scoped>

</style>