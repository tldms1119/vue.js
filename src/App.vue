<template>
  <div class="container">
    <header-comp></header-comp>
    <nav-comp></nav-comp>
    <div class="row">
      <!-- 로그인 -->
      <login-comp></login-comp>
      <div class="col-md-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Nav from './components/Nav.vue'
import Login from './components/user/Login.vue'
  export default {
    data(){
      return {
        msg: 'Hello VueJS'
      }
    },
    components: {
      'header-comp': Header,
      'nav-comp': Nav,
      'login-comp': Login
    }
  }
</script>

<style lang="scss" scoped>

</style>