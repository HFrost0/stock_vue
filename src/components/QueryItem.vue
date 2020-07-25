<template>
  <div>
    <el-card>
      <span>
        {{query_text}}
      </span>
      <span class="button">
        <el-button slot="reference" @click="dropItem">删除</el-button>
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
    computed: {
      query_text() {
        let text = this.val_dict[this.query.val] + this.con_dict[this.query.con]
        text += this.query.con === 'continues' ? this.query.years + '年' : ''
        text += '大于' + this.query.min + '小于' + this.query.max
        return text
      }
    }
  }
</script>

<style scoped>
  .button {
    float: right;
  }
</style>