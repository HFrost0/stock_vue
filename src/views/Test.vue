<template>
  <div>
    <h1>权限界面</h1>
    <h2>{{ msg }}</h2>
  </div>
</template>

<script>
import {test_auth} from "@/network/test";

export default {
  name: "Test",
  data() {
    return {
      msg: ''
    }
  },
  created() {
    test_auth().then(res => {
      this.msg = res.data['msg']
    })
  }
}
</script>

<style scoped>

</style>
