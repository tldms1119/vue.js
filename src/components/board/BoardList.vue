<template>
    <div class="container">
    <link href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
            
	<!--여기에 글쓰기 폼 컴포넌트 삽입-->
    <div class="row">        
	<div class="col-md-12 p-4 text-info" v-show="!loading">Loading Board...</div>        
            <div  class="col-md-12 p-4" style="height:600px;overflow-y:auto">        
                <ul class="media-list p-3" style="border:1px solid silver">
                <li class="media m-2 p-2" style="border-bottom:1px solid silver;background:#e9ecef"  v-for="board in boards" :key="board.idx">
                    <a class="pull-left mr-5" href="#"> {{board.filename}}
                        <img v-if="board.filename == 'noimage.png'" src="http://pingendo.github.io/pingendo-bootstrap/assets/user_placeholder.png" 
                        height="64" width="64" class="media-object center-block img-circle img-responsive">
                        
                        <img v-else :src="board.imagePath" height="64" width="64" class="media-object center-block img-circle img-responsive">
                        <br>
                        <span>{{board.name}}</span>
                    </a>  
                    <div class="media-body text-left">
                    <h4 class="media-heading">{{board.subject}}</h4>
                    <p>{{board.content}}</p>
                    <span class="badge badge-success">{{board.wdate}}</span>
                    <span><a><i class="fa fa-1x fa-fw fa-heart"></i></a></span>
                    <span><a><i class="fa fa-1x fa-fw fa-hand-o-down"></i></a></span>
                    <span><a><i class="fa fa-1x fa-fw fa-edit"></i></a></span>
                    <span><a><i class="fa fa-1x fa-fw fa-trash-o"></i></a></span>
                    </div>
                </li>              
                </ul>
            </div> 
        </div> <!-- row end-->
    </div><!-- container end-->
</template>

<script>
    import axios from 'axios';
    import eventBus from '@/components/eventBus/';
    export default {
        created(){
            this.getBoardData();
        },
        mounted(){
            eventBus.$on('write-ok', () => { 
                this.getBoardData();
            });
        },
        methods: {
            getBoardData(){
                //var url = 'http://localhost:9090/boardList.jsp'
                var url = '/boardList.jsp'; /* 배포 파일일 경우는 서버가 같은 서버라서.. */
                axios.get(url)
                    .then((res) => {
                        this.boards = res.data.boards;
                        this.loading = true;
                    })
                    .catch((err) => {
                        alert("Error : " + err.message);
                        this.loading = false;
                    })
            }
        },
        data(){
            return {
                boards: [],
                loading: false
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>