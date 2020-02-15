<template>
    <div class="row mt-4">
    <!-- 여기에 컴포넌트들 들어갈 예정-->
        <create-content @add-memo="saveMemo"></create-content>
        <list-content :memo-list="memoArr"></list-content>
        <view-content v-on:edit-end="update"></view-content>
    </div>
</template>

<script>
import CreateContent from './memo/CreateContent.vue'
import ListContent from './memo/ListContent.vue'
import ViewContent from './memo/ViewContent.vue'

    export default {
        name: 'Memo',
        components: {
            'create-content': CreateContent,
            'list-content': ListContent,
            ViewContent
        },
        data(){
            return {
                memoArr: []
            }
        },
        methods: {
            saveMemo(memo){
                this.memoArr.push(memo);
                // console.log(JSON.stringify(memo));
                //localStorage.setItem('key', value);
                localStorage.setItem('memos', JSON.stringify(this.memoArr));
            }, 
            update(memo){
                for(var i in this.memoArr){
                    if(memo.no == this.memoArr[i].no){
                        // this.memoArr[i] = memo;      // 배열을 이렇게 직접 접근하는건 좋지않아(렌더링이 안되거든)
                        this.$set(this.memoArr, i, memo);
                        var d = new Date();
                        var today = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
                        this.memoArr[i].wdate = today;
                        break;
                    }
                }
                localStorage.setItem('memos', JSON.stringify(this.memoArr));
            }
        }, 
        created(){
            var memos = JSON.parse(localStorage.getItem('memos'));
            //alert(typeof memos);
            if(memos != null){
                this.memoArr = memos;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>