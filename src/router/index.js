import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import NotFound from '../components/NotFound.vue'
import SignIn from '../components/SignIn.vue'
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
            path:'/signin',
            name: 'Sign In',
            component: SignIn
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