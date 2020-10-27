<template>
  <div id="nav">
    <el-row>
      <el-col :span="3">
        <div style="height: 60.4px; background-color: #545c64">
          <el-image style="width: 120px;  margin-top: 10px; margin-left: 10px"
                    :src="logourl">
          </el-image>
        </div>
      </el-col>
      <el-col  :span="19">
        <el-menu v-if="!$route.meta.navHide" :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b">
          <el-menu-item index="/stocks">股票</el-menu-item>
          <el-menu-item  index="/shares">分红</el-menu-item>
          <el-menu-item v-if="user" index="/test">权限界面</el-menu-item>
        </el-menu>
      </el-col>
      <el-col  class="auth" style="height: 60.4px" :span="2">
        <template v-if="user">
          <el-dropdown>
            <div @click="userSpace">
              <el-avatar>{{user.username[0].toUpperCase()}}</el-avatar>
            </div>
            <el-dropdown-menu slot="dropdown">
              <p>Hello，{{user.username}}</p>
              <el-link class="info2" :underline="false" @click="logout">注销</el-link>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template v-else>
          <el-button class="info1" icon="el-icon-user-solid" @click="auth" circle></el-button>
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
      circleUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      logourl: require('../assets/logo.png'),
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
  background-color:#545c64;
}

.el-link.info {
  color: #fff;
  margin-left: 5px;
}

.el-dropdown-menu{
  width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.el-link.info:hover{
  color: #ffd04b;
}
.el-link.info:active{
  color: #ffd04b;
}
.el-link.info2:hover{
  color: #545c64;
  font-weight: bold;
}
.el-link.info2:active{
  color: #545c64;
  font-weight: bold;
}
.info1{
  color: #545c64;
  border-color:#545c64;
}
.el-button.info1:hover{
  color: #ffd04b;
  border-color:#545c64;
}
.el-button.info1:active{
  color: #ffd04b;
  border-color:#545c64;
}
.el-icon .info1{
    color: #545c64;
}
/*.item_color.el-menu-item.is-active {*/
/*  border-bottom: none;*/
/*}*/

</style>
