<template>
  <div>
     <a-modal
      title="呼叫流程列表"
      :dialog-style="{ top: '20px' }"
      :visible="show"
      :keyboard = "false"
      :maskClosable="false"
      @cancel="show= false"
    >

    <template slot="footer">
        <a-button type="primary"  @click="Exit"> 退出登录 </a-button>
        <a-button type="primary" @click="createFlow">  创建DCE流程  </a-button>
        <a-button type="primary" @click="importFlow">  导入DCE流程  </a-button>
    </template>

    <a-table
    :columns="columns"
    :data-source="vectors"
    :scroll="{ y: 400 }"
    :bordered="false"
    class="menuTab"
    />
      <span slot="action" slot-scope="name, id, index">

      <a-button type="primary" icon="edit" size="large" @click="edit(index)" />
      <a-button type="danger" icon="delete" size="large" @click="deleteItem(id, name)" />
      <a-button type="info" icon="question" size="large" @click="seeSatate(id)" />
      <!-- <a-button type="primary" icon="download" size="large" @click="download(id)" /> -->
    </span>
    </a-modal>
  </div>
</template>

<script>
import state from '@/state/master';
import { errorHandler, successNotify } from '@/utils/tool';
import API from '@/config/http.js';
import { start, exit } from '@/state/defaultG6Node';
import { initVector } from '@/utils/computed';

export default {
  name: 'menuModal',
  data(){
    return {
      columns:[
        { title: '流程号码', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
        { title: '流程描述', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
        {
          title: '操作',
          key: 'action',
          width: 100,
          scopedSlots: { customRender: 'action' },
      }],

      vectors: state.vectors,
      show: false,
      graph: null
    }
  },
  methods:{
    download(id){

    },
    deleteItem(id, name){
      API.deleteVector.fire({ id })
      .then(()=>{ 
        successNotify(`删除流程号  ${name}  成功! `)
        this.getVector()
      })
      .catch(errorHandler)
    },
    edit(index){
      state.current = this.vectors[index];
      this.renderG6()
    },
    seeSatate(){
      console.log(state)
    },
    getVector(){
      API.getVectors.fire({
         domain: state.domain
      })
      .then(res=>{
          this.vector = res.data || []
          state.vectors = this.vector
      })
      .catch(errorHandler)
    },
    Exit(){
      API.logout.fire({})
      .then(()=>{
        this.show = false
        this.$EventBus.$emit('has-Login', false)
      })
      .catch(errorHandler)
    },
    createFlow(){
      if(this.graph){
         let defaultNode = [];
         defaultNode.push(start);
         defaultNode.push(exit);

        console.log(defaultNode);

        this.show = false;
        this.renderG6(defaultNode);
        initVector()
       }
      },
    renderG6(nodes) {
      this.graph.data({ nodes });  // 加载数据
      this.graph.render();
    },
    importFlow(){
      
    },
    bindEvent(){
      this.$EventBus.$on('has-menu',()=>{
        this.show = true
      })

      this.$EventBus.$on("initGraph", page => {
         this.graph = page.graph;
       });
    }
  },
  props:{

  },
  mounted(){
    this.bindEvent()
  }
}
</script>

<style>
 div.menuTab > .ant-table-content > .ant-table-scroll > .ant-table-placeholder{
   border-bottom: 1px solid #fff;
 }

</style>