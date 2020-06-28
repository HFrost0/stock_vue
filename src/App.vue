<template>
  <div id="app">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="/stocks">股票列表</el-menu-item>
      <el-submenu index="2">
        <template slot="title">分红</template>
        <el-menu-item index="/shares">近期分红</el-menu-item>
        <el-menu-item index="/">查询</el-menu-item>
      </el-submenu>
    </el-menu>
    <router-view></router-view>
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
