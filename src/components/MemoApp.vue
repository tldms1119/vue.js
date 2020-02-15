<template>
    <div class="row mt-4">
    <!-- 여기에 컴포넌트들 들어갈 예정-->
        <create-content @add-memo="saveMemo"></create-content>
        <list-content :memo-list="memoArr"></list-content>
        <view-content></view-content>
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
                console.log(JSON.stringify(memo));
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>