import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import NotFound from '../components/NotFound.vue'
import Signup from '../components/user/Signup.vue'
import MemoApp from '../components/MemoApp.vue'
import Board from '../components/Board.vue'
Vue.use(VueRouter);

export default new VueRouter({
    base: '/', 
    mode: 'history',
    routes: [
        {
            path:'/',
            name: 'Home',
            component: Home
        },
        {
            path:'/signup',
            name: 'Sign up',
            component: Signup
        },
        {
            path:'/memo',
            name: 'Memo',
            component: MemoApp
        },
        {
            path:'/board',
            name: 'Board',
            component: Board
        },
        {
            path:'*',
            name: 'NotFound',
            component: NotFound
        }
    ]
})