<template>
  <!--  希望是一个信息卡片的形式，之后再说-->
  <div class="info_style">
    {{stock['ts_code']}}
    &#12288;
    {{stock['name']}}
    <!--<p>{{stock['industry']}}</p>-->
<!--    {{stock['name']}}-->
<!--    &#12288;-->
<!--    &#40;{{stock['ts_code']}}&#41;-->
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
  .info_style{
    font-size: 28px;
    margin-top: 6%;
    /*font-family: Helvetica;*/
    color: #545c64;font-weight: bold;
  }

</style>