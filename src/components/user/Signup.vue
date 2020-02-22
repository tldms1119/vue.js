<template>
    <div>
        <template v-if="isProcess">
            <div class="alert alert-danger"><h3>회원 가입 처리 중...</h3></div>
        </template>
        <template v-else>
            <div id="join" class="container p-3">
                <h1 class="text-center">Sign Up</h1>
                <form name="frm" action="join.jsp" @submit.prevent="submit">
                    <div class="row">    
                        <div class="col-md-8 offset-md-2">
                        Name: <input type="text" name="name"
                        placeholder="Name" class="form-control" v-model="user.name">
                        </div>
                    </div>
            
                    <div class="row">    
                        <div class="col-md-8 offset-md-2">
                            User ID: <input type="text" name="id"  class="form-control" placeholder="User ID" 
                            v-model="user.id" @keyup="checkId">
                            <div v-show="idErr" class="text-danger">아이디는 4자이상 6자 이하 입니다.</div>
                        </div>
                    </div>
                    <div class="row"> 
                        <div class="col-md-8 offset-md-2">
                            PASSWORD: <input type="text" name="pwd" 
                            placeholder="Password" class="form-control" v-model="user.pwd" @keyup="checkPwd">
                            <div v-show="pwdErr" class="text-danger">비밀번호는 4자 이상 8자 이내입니다.</div>
                        </div>
                    </div>
                    <div class="row"> 
                        <div class="col-md-8 offset-md-2">
                                PASSWORD Confirm :
                            <input type="text" name="pwd2" placeholder="Password Confirm" class="form-control" v-model="user.pwd2" @keyup="checkRePwd">    
                            <div v-show="pwdErr2" class="text-danger">비밀번호가 일치하지 않아요</div>
                        </div>       
                    </div>  
                    <div class="row"> 
                        <div class="col-md-8 offset-md-2">
                                Email :
                            <input type="text"  name="email" placeholder="Email" class="form-control" v-model="user.email">    
                        </div>       
                    </div> 
        
                    <div class="row  m-2">
                            <div class="col-md-8 offset-md-2 p-1">
                                <button class="btn btn-block btn-outline-success">Sign up</buttoN>
                            </div>
                    </div>
                </form>
            </div>
        </template>    
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        data(){
            return {
                user: {
                    name: '',
                    id: '',
                    pwd: '',
                    pwd2: '',
                    email: ''
                },
                idErr: false,
                pwdErr: false,
                pwdErr2: false,
                isProcess: false
            }
        },
        methods: {
            checkId(){
                var len = this.user.id.length;
                if(len < 4 || len > 6){
                    this.idErr = true;
                } else {
                    this.idErr = false;
                }
            },
             checkPwd(){
                var len = this.user.pwd.length;
                if(len < 4 || len > 8){
                    this.pwdErr = true;
                } else {
                    this.pwdErr = false;
                }
            },
            checkRePwd(){
                if(this.user.pwd != this.user.pwd2){
                    this.pwdErr2 = true;
                } else {
                    this.pwdErr2 = false;
                }
            }, 
            submit(){
                var vm = this;
                if(!this.idErr && !this.pwdErr && !this.pwdErr2){
                    this.isProcess = true;
                    // axios 로 서버에 비동기 요청
                    // 파라미터 데이터를 서버에 보낼 때 URLSearchParams
                    var params = new URLSearchParams();
                    params.append("name", this.user.name);
                    params.append("id", this.user.id);
                    params.append("pwd", this.user.pwd);
                    params.append("email", this.user.email);
                    // 'userAdd.json
                    var url="http://localhost:9090/signup.jsp";
                    axios.post(url, params)
                        .then(function(res){
                            if(res.data.result > 0){
                                alert('Sign Up Success!');
                                vm.$router.push('/');
                            }
                            this.isProcess = false;
                        }.bind(this)) /* 성공일 경우 */ // 익명 함수에 bind()를 이용하면 this 객체 사용가능(vm 에 따로 할당받지 않아도!)
                        .catch(function(err){
                            alert("Sign Up Failed : " + err.message);
                            this.isProcess = false;
                        }) /* 실패일 경우 */
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>