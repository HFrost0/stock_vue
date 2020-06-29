<template>
  <div>
    <div class="block">
      <span class="demonstration">预案公告日范围</span>
      <el-date-picker
              unlink-panels
              v-model="dates"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
      </el-date-picker>
      <el-button @click="dateRange">GO</el-button>
    </div>
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
  import {request} from "../network/request";

  export default {
    name: "Shares",
    components: {ShareList},
    // 同一context监听 有搞头
    data() {
      return {
        total: 0,
        shares: [],
        dates: ['',''],
        context: {
          prop: 'ann_date',
          order: 'descending'
        }
      }
    },
    computed:{
      start_date(){
        return this.dates[0]
      },
      end_date(){
        return this.dates[1]
      }
    },
    methods: {
      dateRange(){
        request({
          url:'/get_shares',
          params:{
            prop: this.context.prop,
            order: this.context.order,
            end_date:this.end_date,
            start_date:this.start_date
          }
        }).then(res=>{
          this.total = res.data['total']
          this.shares = res.data['shares']
        })
      },
      pageChange(offset, PageSize) {
        request({
          url: '/get_shares',
          params: {
            offset: offset,
            page_size: PageSize,
            prop: this.context.prop,
            order: this.context.order,
            end_date:this.end_date,
            start_date:this.start_date
          }
        }).then(res => {
          this.total = res.data['total']
          this.shares = res.data['shares']
        })
      },
      sortChange(context) {
        this.context = context
        request({
          url: 'get_shares',
          params: {
            prop: context.prop,
            order: context.order,
            end_date:this.end_date,
            start_date:this.start_date
          }
        }).then(res => {
          this.total = res.data['total']
          this.shares = res.data['shares']
        })
      }
    },
    created() {
      request({
        url: '/get_shares',
      }).then(res => {
        this.total = res.data['total']
        this.shares = res.data['shares']
      })
    }
  }
</script>

<style scoped>

</style>