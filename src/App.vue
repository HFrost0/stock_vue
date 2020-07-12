<template>
  <div id="app">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-submenu index="1">
        <template slot="title">股票</template>
        <el-menu-item index="/stocks">股票列表</el-menu-item>
        <el-menu-item index="/query">查询</el-menu-item>
      </el-submenu>
      <el-menu-item index="/shares">分红</el-menu-item>
    </el-menu>
    <keep-alive>
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
