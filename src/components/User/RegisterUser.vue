<template>
  <div>
    <h1>用户注册</h1>
    <label for="username">
      Username:
    </label>
    <input type="text" id="username" v-model="username">
    <label for="password">
      password:
    </label>
    <input type="text" id="password" v-model="password">
    <p v-if="status === 400">
      Please enter different info.
    </p>
    <button @click="registry">注册</button>
  </div>
</template>

<script>
export default {
  name: "RegisterUser",
  data() {
    return {
      username: '',
      password: '',
      status: null,
    }
  },
  methods: {
    registry() {
      this.$store.dispatch('registry', {
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
