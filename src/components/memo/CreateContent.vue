<template>
    <div class="col-md-4 col-sm-12 col-xs-12 p-3">
     <div class="card" style="height: 350px">
         <div class="card-header text-center">
            <h3 class="text-center text-success">♣한줄 Memo♣</h3>
         </div>
         <div class="card-body text-center">
            <form action="memoAdd.jsp" method="post" @submit.prevent="save">
                <input type="text"
                name="title" placeholder="제  목" class="form-control" v-model="memo.title" ref="mytitle">
                <p>
                <textarea name="msg" placeholder="메모 내용" class="form-control" v-model="memo.msg"></textarea>
                </p>
                <!-- 기본적으로 form 안에 버튼은 submit 속성을 가지고 있음, 그건 동기 방식이기 때문에 그거 막아야함 @submit="save.prevent -->
                <button class="btn btn-outline-success">글쓰기</button>
            </form> 
         </div>
     </div> 
 </div>
</template>

<script>
    export default {
        data(){
            return {
                memo: {
                    no: 0,
                    title: '',
                    msg: '',
                    wdate: ''
                },
                memoArr: []
            }
        },
        methods: {
            save(){
                // submit의 기본 동작 방식 방어
                //event.preventDefault();
                var d = new Date();
                var today = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

                var memos = JSON.parse(localStorage.getItem('memos'));
                if(memos != undefined){
                    this.memo.no = memos.length + 1;
                } else {
                    this.memo.no += 1;
                }
                
                this.memo.wdate = today;

                // 부모 컴포넌트(MemoApp)에 방금 작성한 메모 전달
                // 이벤트로 전달($emit('이벤트 이름', '데이터'))
                // 전달할 때는 객체의 사본을 만들어서 전달하는게 좋음(v-model로 인해 원본이 바뀌면 나머지 배열도 바뀔수 있음)
                var tmpMemo = {...this.memo}; // 객체 copy
                this.$emit('add-memo', tmpMemo);
                this.memo.title = '';
                this.memo.msg = '';
                this.$refs.mytitle.focus();
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>