<template>
  <div>
    <el-card>
      <i class="el-icon-paperclip"></i>
      <span class="val">
        {{val_dict[query.val]}}
      </span>
      <span class="con">
        {{con_dict[query.con]}}
        <span v-if="query.con === 'continues'">
          {{query.years}}年
        </span>
      </span>
      <span>
        大于
      </span>
      <span class="number">
        {{query.min}}
      </span>
      <span>
       小于
      </span>
      <span class="number">
        {{query.max}}
      </span>

      <span class="button">
        <el-button type="danger" plain size="small" @click="dropItem">删除</el-button>
      </span>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "QueryItem",
    props: {
      query: Object
    },
    methods: {
      dropItem() {
        this.$emit('dropItem')
      }
    },
    data() {
      return {
        val_dict: {
          'close': '股价',
          'dv_ratio': '股息率（%）',
          'pe': '市盈率',
          'pe_ttm': '市盈率（TTM）'
        },
        con_dict: {
          'current': '当前',
          'continues': '连续'
        }
      }
    },
  }
</script>

<style scoped>
  .button {
    float: right;
  }
  .val,.number{
    color: #409EFF;
  }
  .con{
    color: #E6A23C;
  }
  .el-icon-paperclip{
    font-size: 20px;
    margin-right: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
</style>