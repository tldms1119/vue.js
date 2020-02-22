<template>
    <div class="col-md-3 mt-4">
        <h1 class="text-center">Login</h1>
        <template v-if="!isLogin">
            <div class="text-danger"></div>
            <form name="loginF" method="POST" @submit.prevent="loginCheck" >
                <div class="row">    
                    <div class="col-md-10 offset-md-1">
                        User ID: <input type="text" name="id" 
                        v-model="tmpUser.id" ref="uid"
                        placeholder="User ID" class="form-control">    
                    </div>
                </div>
                <div class="row"> 
                    <div class="col-md-10 offset-md-1">
                        PASSWORD: <input type="password" name="pwd" 
                        v-model="tmpUser.pwd" ref="upwd"
                        placeholder="Password" class="form-control">    
                    </div>
                </div>
                <div class="col-md-10 offset-md-1 p-1">
                        <button class="btn btn-block btn-primary mt-3">Login</button>
                </div>        
            </form>
        </template>
        <template v-else>
            <div class="alert alert-primary m-4">
                <h4 class="text-primary">{{user.uid}}님 로그인 중...</h4>
                <a href="#" @click.prevent="logout">Logout</a>
            </div>
        </template>  
</div>
</template>

<script>
import axios from 'axios';
    export default {
        data(){
            return {
                tmpUser: { // 로그인 시도를 하는 사람의 id, pwd 담을 데이터
                    id: '',
                    pwd: ''
                },
                user: {  // 로그인한 사람의 정보를 담은 데이터
                    uidx: '',
                    uname: '',
                    uid: ''
                },
                isLogin: false
            }
        }, methods: {
            logout(event){
                //alert("Logout");
                event.preventDefault();
                var url = "http://localhost:9090/logout.jsp";
                axios.get(url)
                    .then((res) => {
                        if(res.status == 200){
                            // 서버쪽에서 로그아웃 처리를 마쳤다면
                            // 세션 스토리지를 비워주기
                            sessionStorage.clear();
                            this.isLogin = false;
                        }
                    })
                    .catch((err) => {
                        alert("Error : " + err.message);
                        this.isLogin = true;
                    })
            },
            loginCheck() {
               if(this.tmpUser.id == ''){
                   alert("Input your ID");
                   this.$refs.uid.focus();
                   return;
               }
               if(this.tmpUser.pwd == ''){
                   alert("Input your password");
                   this.$refs.upwd.focus();
                   return;
               }
                this.requestLogin(); // 서버에 로그인 데이터 전송
            },
            requestLogin(){
                var url = "http://localhost:9090/loginCheck.jsp";
                var params = new URLSearchParams();
                params.append("id", this.tmpUser.id);
                params.append("pwd", this.tmpUser.pwd);
                axios.post(url, params)
                    .then((res) => {
                        //alert(JSON.stringify(res));
                        this.user = res.data.user;
                        if(!this.user.uidx){
                            alert("Check your ID & password");
                            this.tmpUser.id = '';
                            this.tmpUser.pwd = '';
                            this.$refs.uid.focus();
                        } else {
                            alert("Login Success!");
                            // 로그인 인증을 받으면 세션에 저장
                            sessionStorage.setItem('uname', this.user.uname);
                            sessionStorage.setItem('uid', this.user.uid);
                            sessionStorage.setItem('uidx', this.user.uidx);
                            this.isLogin = true;
                        }
                    })
                    .catch((err) => {
                        alert("Error : " + err.message);
                    });
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>