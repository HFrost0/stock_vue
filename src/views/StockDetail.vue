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
        context:{
          prop:'ann_date',
          order:'descending'
        }
      }
    },
    methods: {
      //考虑是否下放到子组件？
      sortChange(context) {
        this.context = context
        request({
          url: 'get_shares',
          params: {
            ts_code: this.$route.query.ts_code,
            prop: context.prop,
            order: context.order
          }
        }).then(res => {
          this.total = res.data['total']
          this.shares = res.data['shares']
        })
      },
      pageChange(offset, PageSize) {
        console.log(offset)
        request({
          url: '/get_shares',
          params: {
            ts_code: this.$route.query.ts_code,
            offset: offset,
            page_size: PageSize,
            prop: this.context.prop,
            order: this.context.order
          }
        }).then(res=>{
          this.total = res.data['total']
          this.shares = res.data['shares']
        })
      }
    },
    created() {
      request({
        url: '/get_stock',
        params: {ts_code: this.$route.query.ts_code}
      }).then(res => {
        this.stock = res.data['stock']
      })
      //并发
      request({
        url: '/get_shares',
        params: {ts_code: this.$route.query.ts_code}
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