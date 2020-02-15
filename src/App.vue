<template>
  <div class="container">
    <header-comp></header-comp>
    <nav-comp></nav-comp>
    <div class="row">
      <!-- 로그인 -->
      <div class="col-md-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Nav from './components/Nav.vue'
  export default {
    data(){
      return {
        msg: 'Hello VueJS'
      }
    },
    components: {
      'header-comp': Header,
      'nav-comp': Nav
    }
  }
</script>

<style lang="scss" scoped>

</style>