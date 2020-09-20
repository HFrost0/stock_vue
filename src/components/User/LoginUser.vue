<template>
  <div class="login">
    <div>
      <h3>用户登录</h3>
    </div>
    <el-form>
      <p v-if="status === 400">
        Invalid login.
      </p>
      <el-form-item label="用户名">
        <el-input v-model="username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "LoginUser",
  data() {
    return {
      username: '',
      password: '',
      status: null,
    }
  },
  methods: {
    login() {
      this.$store.dispatch('login', {
        username: this.username,
        password: this.password
      }).then(() => {
        this.$router.push({name: 'Test'})
      }).catch(err => {
        this.status = err.response.status
      })
    }
  }
}
</script>

<style scoped>

</style>
