<template>
    <div class="col-md-4 col-sm-12 col-xs-12 p-3">
        <div class="card"  style="height: 350px;overflow-y:auto">
            <ul class="list-group">
                <li class="list-group-item active d-flex justify-content-between align-items-center">
                    <span class="badge badge-danger badge-pill">2020-01-01</span>
                </li>        
                <li class="list-group-item d-flex justify-content-between align-items-center"
                v-for="tmpMemo in memoList" :key="tmpMemo.no">                   
                    <a href="#" >{{tmpMemo.title}}</a>
                    <span class="badge badge-danger badge-pill">{{tmpMemo.wdate}}</span>
                </li>         
            </ul>
        </div>                
    </div>
</template>

<script>
    export default {
        props: ['memo-list'],
        data(){
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>

</style>