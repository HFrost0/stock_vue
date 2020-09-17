<template>
  <div id="nav">
    <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item v-if="!$route.meta.navShow" index="/stocks">股票</el-menu-item>
      <el-menu-item v-if="!$route.meta.navShow" index="/shares">分红</el-menu-item>
    </el-menu>
<!--    暂时引用别人的模板-->
    <template v-if="user">
      <router-link to="test">
        Test Auth
      </router-link>

      <span class="nav-welcome">Hello, {{ user.code }}.</span>

      <button type="button" class="logoutButton" @click="logout">
        Log out
      </button>
    </template>
    <template v-else>
      <router-link to="authenticate" class="button">
        Login
      </router-link>
    </template>
  </div>
</template>

<script>
export default {
  name: "AppNav",
  computed:{
    user(){
      return this.$store.state.user
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push(key)
    },
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style lang="scss" scoped>
#nav {
  display: flex;
  align-items: center;
  min-height: 50px;
  padding: 0.2em 1em;
  background: linear-gradient(to right, #16c0b0, #84cf6a);
}

.nav-welcome {
  margin-left: auto;
  margin-right: 1rem;
  color: white;
}

a {
  font-weight: bold;
  color: #2c3e50;
  margin: auto 0.8em auto 0.4em;
  text-decoration: none;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
}

.router-link-exact-active {
  color: white;
  border-bottom: 2px solid #fff;
}

button,
.button {
  margin-left: auto;
  background: white;
  text-decoration: none;
  color: #2c3e50;

  &.router-link-active {
    color: #2c3e50;
  }
}

.logoutButton {
  cursor: pointer;
}

.nav-welcome + button {
  margin-left: 0;
}
</style>
