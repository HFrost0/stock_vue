<template>
  <div>
    <h1>用户登录</h1>
    <form @submit.prevent="login">
      <label for="username">
        Username:
      </label>
      <input v-model="username" type="text" id="username" value>
      <label for="password">
        Password:
      </label>
      <input v-model="password" type="password" id="password" name value>
      <p v-if="status === 400">
        Invalid login info.
      </p>
      <button type="submit" name="button">
        Login
      </button>
    </form>

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
