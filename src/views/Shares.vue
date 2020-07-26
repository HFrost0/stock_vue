<template>
  <div>
    <div class="block">
      <el-input
        @change="textChange"
        placeholder="输入代码或名称后回车"
        v-model="search_text"
        clearable>
      </el-input>
      <el-select v-model="time_type" placeholder="请选择日期筛选类型">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
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
  import {getShareList} from "../network/shares";

  export default {
    name: "Shares",
    components: {ShareList},
    data() {
      return {
        total: 0,
        shares: [],
        dates: ['', ''],
        options: [
          {
            value: 'imp_ann_date',
            label: '实施公告日'
          },
          {
            value: 'ann_date',
            label: '预案公告日'
          },
          {
            value: 'record_date',
            label: '股权登记日'
          },
        ],
        time_type: '',
        search_text: ''
      }
    },
    computed: {
      context() {
        return {
          //排序的属性
          prop: 'imp_ann_date',
          //排序的顺序
          order: 'descending',
          //分页偏移
          offset: 0,
          //页长度
          page_size: 10,
          //时间属性
          time_type: this.time_type,
          //时间开始点 先判断是否为null（在用户点击x后会变成null，不处理将报错）
          start_date: this.dates !== null ? this.dates[0] : '',
          //时间结束点
          end_date: this.dates !== null ? this.dates[1] : '',
          //实施进度过滤器
          proc_filter: [],
          //文本输入内容 去除用户输入的前后空格
          search_text: this.search_text.trim()
        }
      },
    },
    methods: {
      textChange() {
        this.$refs.share_list.handleCurrentChange(1)
      },
      filterChange(proc_filter) {
        this.context.proc_filter = proc_filter
      },
      dateRange() {
        //向子组件通知改变一次page
        this.$refs.share_list.handleCurrentChange(1)
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
      },
      sortChange(prop, order) {
        this.context.prop = prop
        this.context.order = order
        //不用请求了，交给pageChange处理
      }
    },
    created() {
      getShareList(this.context).then(res => {
        this.total = res.data['total']
        this.shares = res.data['shares']
        this.$refs.share_list.loading = false
      })
    }
  }
</script>

<style scoped>
  .el-input {
    width: 300px;
  }

</style>