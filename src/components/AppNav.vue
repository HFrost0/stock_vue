<template>
  <div id="nav">
    <el-row  type="flex" justify="space-between">
      <el-col :span="20">
        <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item v-if="!$route.meta.navShow" index="/stocks">股票</el-menu-item>
          <el-menu-item v-if="!$route.meta.navShow" index="/shares">分红</el-menu-item>
          <el-menu-item v-if="!$route.meta.navShow&&user" index="/test">权限界面</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="4" class="auth">
        <template v-if="user">
          <span class="nav-welcome">Hello, {{ user.username}}.</span>
          <el-button @click="logout">
            Log out
          </el-button>
        </template>
        <template v-else>
          <el-button @click="login">Login</el-button>
        </template>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "AppNav",
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push(key)
    },
    logout() {
      this.$store.dispatch('logout')
    },
    login(){
      this.$router.push('/authenticate')
    }
  }
}
</script>

<style scoped>
.auth{
  display: flex;
  justify-content: flex-end;
}
</style>
