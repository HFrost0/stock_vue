<template>
  <!--  希望是一个信息卡片的形式，之后再说-->
  <div>
    <h1>{{stock['ts_code']}}</h1>
    <h2>{{stock['name']}}</h2>
<!--    <p>{{stock['industry']}}</p>-->
  </div>
</template>

<script>
  export default {
    name: "StockInfo",
    props: {
      stock: {
        type: Object,
        default: null
      },
    },
  }
</script>

<style scoped>

</style>