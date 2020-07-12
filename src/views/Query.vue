<template>
  <div>
    <span>连续</span>
    <el-input
            placeholder="请输入年数"
            v-model="years"
            clearable>
    </el-input>
    <span>年，分红率（%）大于</span>
    <el-input
            placeholder="请输入分红率（%）"
            v-model="dv_ratio"
            clearable>
    </el-input>
    <el-button @click="stockQuery">GO</el-button>
  </div>
</template>

<script>
  export default {
    name: "Query",
    data() {
      return {
        years: null,
        dv_ratio: null
      }
    },
    methods: {
      stockQuery() {
        this.$router.push({
          path: '/stocks',
          query: {
            years: this.years,
            dv_ratio: this.dv_ratio
          }
        })
      },
    }
  }
</script>

<style scoped>
  .el-input {
    width: 300px;
  }
</style>