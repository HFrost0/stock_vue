<template>
  <div class="auth">
    <component :is="loginOrRegister" />
    <a
        v-show="isNewUser"
        class="auth-link"
        @click="toggleComponent"
    >还没有账户？注册</a>
    <a
        v-show="!isNewUser"
        class="auth-link"
        @click="toggleComponent"
    >已经有账户？登录</a>
  </div>
</template>

<script>
import RegisterUser from "@/components/User/RegisterUser";
import LoginUser from "@/components/User/LoginUser";

export default {
  name: "Authenticate",
  components: { RegisterUser, LoginUser},
  computed: {
    isNewUser(){
      return this.$store.state.isNewUser
    },
    loginOrRegister(){
      return this.isNewUser?'LoginUser':'RegisterUser'
    }
  },
  methods:{
    toggleComponent(){
      this.$store.dispatch('isNewUser', !this.isNewUser)
    }
  }

}
</script>

<style scoped>
.auth-link {
  font-size: 0.8em;
  text-decoration: underline;
  color: #2c3e50;
  cursor: pointer;
}
.auth{
  display: flex;
  flex-direction: column;
  align-items: center;

}
</style>
