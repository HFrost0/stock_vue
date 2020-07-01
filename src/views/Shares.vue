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
            ref="share_list"
            :total="total"
            :shares="shares"
            @pageChange="pageChange"
            @sortChange="sortChange"
            @filterChange="filterChange"
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
        dates: ['', ''],
      }
    },
    computed: {
      context() {
        return {
          //排序的属性
          prop: 'ann_date',
          //排序的顺序
          order: 'descending',
          //分页偏移
          offset: 0,
          //页长度
          page_size: 10,
          //预案公告日start
          start_date: this.dates[0],
          //预案公告日end
          end_date: this.dates[1],
        }
      },
    },
    watch:{
      //加一个这玩意防止爆炸，坑啊，我就没搞懂为啥我按个x你就给我设置成null，可能用原生的办法有可能解决
      dates(){
        if(this.dates==null){
          this.dates = ['','']
        }
      }
    },
    methods: {
      filterChange() {

      },
      dateRange() {
        //向子组件通知改变一次page
        this.$refs.share_list.handleCurrentChange(1)
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
      },
      sortChange(prop, order) {
        this.context.prop = prop
        this.context.order = order
        //不用请求了，交给pageChange处理
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