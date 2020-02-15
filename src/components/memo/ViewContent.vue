<template>
    <div class="col-md-4 col-sm-12 col-xs-12 p-3" >
    <div class="card"  style="height: 350px">
        <img src="images/memo02.png"  class="card-img-top img img-thumbnail"  style="height: 100%" />
        <div class="card-img-overlay text-center">
			<form action="memoEdit.jsp" method="post" class="mt-2" @submit.prevent="editEnd">
				<input type="hidden" name="no" v-model="memo.no"><p></p>
				<input type="text" name="title" placeholder="제목"  class="form-control" v-model="memo.title">
				<p></p>
				<textarea name="msg" placeholder="메모내용" class="form-control mt-2" v-model="memo.msg"></textarea>
				<span class="badge badge-success">작성일: {{memo.wdate}}	</span><p></p>
				<button type="submit" class="btn btn-outline-info">글수정</button>
			</form> 
		</div>
    </div> 
</div>
</template>

<script>
import eventBus from '../eventBus/index.js'
    export default {
        data(){
            return {
                memo: {
                    no: '',
                    title: '',
                    msg: '',
                    wdate: ''
                }
            }
        },
        // 이벤트 버스는 컴포넌트 태그에서 듣는게 아니라 라이프사이클 훅에서 받음
        created(){
            var vm = this;
            eventBus.$on('show-view', function(tmpMemo){
                // alert('tmpMemo.title' + tmpMemo.title);
                vm.memo = {...tmpMemo};
            })
        },
        methods: {
            editEnd(){
                var tmpMemo = {...this.memo};
                this.$emit('edit-end', tmpMemo);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>