<template>
    <div class="container mt-5 mb-3">
        <div class="row">
            <div class="col-md-12 p-4" style="border:1px solid seagreen">    
                <h1>Board POST</h1>            
                <form id="bf" class="form" method="post" @submit.prevent="write">                    
                    <input type="text" name="subject" id="subject" v-model="board.subject" 
                     class="form-control m-1" placeholder="Subject">
                    <textarea name="content" placeholder="Content" v-model="board.content"
                      class="form-control m-1"></textarea>
                    <input type="file" ref="file" v-on:change="handlePreview" name="filename" id="filename"                   
                     class="form-control m-1">
                    <div class="col-md-6 offset-md-3 text-center">
                    <img :src="preview" class="img img-thumbnail"></div>
                    <button v-show="!loading" class="btn btn-outline-danger m-1">글쓰기</button>
                    <button v-show="loading" class="btn btn-danger m-1">Loading...</button>
                </form>    
            </div> 
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import eventBus from '@/components/eventBus/index.js';
    export default {
        data(){
            return {
                board: {
                    idx: '',
                    name: '',
                    subject: '',
                    content: '',
                    filename: '',
                    wdate: ''
                },
                preview: '', /* 업로드 파일(이미지) 미리보기 */
                loading: false,
                result: false
            }
        },
        methods: {
            write(){
                var uname = sessionStorage.getItem('uname');
                if(!uname){
                    alert('로그인을 해주세요');
                    return;
                }
                this.board.name = uname;

                // 업로드 파일이 있을 경우 FormData 객체를 사용하여 파라미터 등록
                var url = 'http://localhost:9090/boardAdd.jsp';
                var params = new FormData();
                params.append('name', this.board.name);
                params.append('subject', this.board.subject);
                params.append('content', this.board.content);
                params.append('filename', this.board.filename);
                /* 
                    파일 업로드 시 요청방식은 반드시 post 방식으로 지정해야 한다.
                    또한, enctype 은 'multipart/form-data' 로 지정되어야
                    파일 데이터가 서버에 함께 전송된다. 그렇지 않으면 첨부 파일이름만 전송됨.
                */
                this.loading = true;
                axios.post(url, params, {
                    headers: {
                        'Content-Type':'multipart/form-data'
                        }
                    })
                    .then((res) => {
                        if(res.data.result > 0){
                            alert("등록되었습니다.");
                            this.result = true;
                        } else {
                            alert("등록이 실패했습니다.");
                            this.result = false;
                        }
                        this.loading = false;
                    })
                    .catch((err) => {
                        alert("Error : " + err.message);
                        this.loading = false;    
                    })
            },
            handlePreview(){
                // 업로드 이미지 파일 미리보기
                this.board.filename = this.$refs.file.files[0];
                var file = this.board.filename;
                // 해당 파일이 png/jpeg 이면 미리보기 처리하자
                // image/png, image/jpeg 정규식 체크
                if(file && file.type.match(/^image\/(png|jpeg)$/)){
                    this.preview = window.URL.createObjectURL(file);
                }
            }
        },
        watch: {
            // 글쓰기가 완료되면 result 데이터 값이 변동되는데 이를 감지하여
            // 이벤트 버스에 이벤트를 전달
            result: function(newVal){
                if(newVal){
                    eventBus.$emit('write-ok');
                    this.board.subject = '';
                    this.board.content = '';
                    this.$refs.file.value = '';
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>