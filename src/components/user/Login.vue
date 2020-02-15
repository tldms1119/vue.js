<template>
    <div class="col-md-3 mt-4">
        <h1 class="text-center">Login</h1>
        <div class="text-danger"></div>
        <form name="loginF" method="POST" @submit.prevent="logIn" >
            <div class="row">    
                <div class="col-md-10 offset-md-1">
                    User ID: <input type="text" name="id" 
                    placeholder="User ID" class="form-control" v-model="user.id" >    
                </div>
            </div>
            <div class="row"> 
                <div class="col-md-10 offset-md-1">
                    PASSWORD: <input type="password" name="pwd" 
                    placeholder="Password" class="form-control" v-model="user.pwd">    
                </div>
            </div>
            <div class="col-md-10 offset-md-1 p-1">
                    <button class="btn btn-block btn-primary mt-3">Login</button>
            </div>        
        </form>  
</div>
</template>

<script>
    export default {
        data(){
            return {
                user: {
                    id: '',
                    pwd: ''
                },
                userArr: []
            }
        }, methods: {
            logIn() {
                var isMember = false;
                if(this.userArr.id == this.user.id && this.userArr.pwd == this.user.pwd){
                    this.$router.push('/');
                    isMember = true;
                }
                if(!isMember){
                    alert('회원이 아니예요');
                }
            }
        }, 
        created(){
            var users = JSON.parse(localStorage.getItem('vue-user'));
            if(users != null){
                this.userArr = users;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>