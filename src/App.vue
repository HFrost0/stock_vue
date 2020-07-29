<template>
  <div id="app">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="/stocks">股票</el-menu-item>
      <el-menu-item index="/shares">分红</el-menu-item>
    </el-menu>
    <keep-alive include="Stocks">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

  export default {
    name: 'App',
    components: {},
    data() {
      return {
        activeIndex: '/stocks',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        this.$router.push(key)
      }
    }
  }
</script>
