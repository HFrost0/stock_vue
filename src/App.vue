<template>
  <div id="app">
    <AppNav/>
    <keep-alive include="Stocks">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

import AppNav from "@/components/AppNav";

export default {
  name: 'App',
  components: {AppNav},
}
</script>
