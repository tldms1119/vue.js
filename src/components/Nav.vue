<template>
    <!-- nav 는 전체를 감싸는 태그 하나만 있어야해요 -->
    <nav class="navbar navbar-expand-sm bg-warning navbar-dark">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav">
        
            <li v-for="(menu, index) in menus" :key="index" class="nav-item">
                <router-link :to="menu.link" class="nav-link">{{menu.title}}</router-link>
                <!-- <a class="nav-link" :href="menu.link">{{menu.title}}</a> -->
            </li>
            </ul>
         </div>  
    </nav>
</template>

<script>
    export default {
        data(){
            return {
                menus: [
                    {title: 'Home', link: '/'},
                    {title: 'Sign up', link: '/signup'},
                    {title: 'Memo', link: '/memo'},
                    {title: 'Board', link: '/board'}
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>