<template>
  <div id="nav">
    <el-row type="flex" justify="space-between">
      <el-col :span="22">
        <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item v-if="!$route.meta.navShow" index="/stocks">股票</el-menu-item>
          <el-menu-item v-if="!$route.meta.navShow" index="/shares">分红</el-menu-item>
          <el-menu-item v-if="!$route.meta.navShow&&user" index="/test">权限界面</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="2" class="auth">
        <template v-if="user">
          <el-dropdown>
            <div @click="userSpace">
              <el-avatar>{{user.username[0].toUpperCase()}}</el-avatar>
            </div>
            <el-dropdown-menu slot="dropdown">
              <p>Hello，{{user.username}}</p>
              <el-link class="info" :underline="false" @click="logout">注销</el-link>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template v-else>
          <el-button icon="el-icon-user-solid" @click="auth" circle></el-button>
          <el-link class="info" :underline="false" @click="auth">登录</el-link>
        </template>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "AppNav",
  data() {
    return {
      circleUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    }
  },
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
    auth() {
      this.$router.push('/authenticate')
    },
    userSpace(){
      console.log('user space');
      this.$router.push('/user_space')
    }
  }
}
</script>

<style scoped>
.auth {
  display: flex;
  justify-content: center;
  align-items: center;
}

.info {
  margin-left: 5px;
}

.el-dropdown-menu{
  width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
