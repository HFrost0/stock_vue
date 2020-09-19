<template>
<div>
  <h1>用户名：{{user.username}}</h1>
  <p>id：{{user.user_id}}</p>
</div>
</template>

<script>
export default {
  name: "UserSpace",
  computed:{
    user(){
      return this.$store.state.user
    }
  }
}
</script>

<style scoped>

</style>
