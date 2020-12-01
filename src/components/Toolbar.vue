<template>
    <div ref="toolbar" class="toolbar">
        <span class="separator"/>
        <a-tooltip :title="this.i18n['tooltip.copy']" placement="bottom">
            <a-button :disabled="butt.canCopy" type="link" @click="copy" shape="circle" icon="copy" />
            <!-- <span class="command" data-command="copy">
               <span class="iconfont "> <a-icon type="copy" /></span>
             </span> -->
        </a-tooltip>
        <a-tooltip :title="this.i18n['tooltip.paste']" placement="bottom">
             <a-button :disabled="butt.canPaste" type="link" @click="paste" shape="circle" icon="snippets" />
            <!-- <span class="command" data-command="paste">
                <span class="iconfont "> <a-icon type="snippets" /></span>
            </span> -->
        </a-tooltip>
        <a-tooltip :title="this.i18n['tooltip.delete']" placement="bottom">
            <a-button :disabled="butt.canDelete" type="link" @click="deleteItem" shape="circle" icon="delete" />
            <!-- <span class="command" data-command="delete">
                 <span class="iconfont "> <a-icon type="delete" /></span>
            </span> -->
        </a-tooltip>
        <span class="separator"/>
        <a-tooltip :title="this.i18n['tooltip.zoomIn']" placement="bottom">
            <a-button :disabled="butt.canZoomIn" type="link" @click="zoomIn" shape="circle" icon="zoom-in" />
            <!-- <span class="command" data-command="zoomIn">
                 <span class="iconfont "> <a-icon type="zoom-in" /></span>
            </span> -->
        </a-tooltip>
        <a-tooltip :title="this.i18n['tooltip.zoomOut']" placement="bottom">
            <a-button :disabled="butt.canZoomOut" type="link" @click="zoomOut" shape="circle" icon="zoom-out" />
            <!-- <span class="command" data-command="zoomOut">
                <span class="iconfont "> <a-icon type="zoom-out" /></span>
            </span> -->
        </a-tooltip>
        <a-tooltip :title="this.i18n['tooltip.zoomReset']" placement="bottom">
            <a-button :disabled="butt.canZoomReset" type="link" @click="zoomReset" icon="border-inner" />
            <!-- <span class="command" data-command="resetZoom">
                <span class="iconfont "> <a-icon type="border-inner" /></span>
            </span> -->
        </a-tooltip>
        

        <a-tooltip :title="this.i18n['tooltip.autoFit']" placement="bottom">
             <a-button :disabled="butt.canAutoFit" type="link" @click="autoFit" icon="border-outer" />
            <!-- <span class="command" data-command="autoFit">
                <span class="iconfont "> <a-icon type="border-outer" /></span> 
            </span> -->
        </a-tooltip>
        <span class="separator"/>

        <!-- <Nodes ref="addNode" @create="handleCreate" :visible="visible" /> -->


      <a-button type="primary" style="float:right;margin-right:6px;" @click="save">保存</a-button>
      <a-button type="default" style="float:right;margin-right:6px;" @click="showMenu">菜单栏</a-button>

    </div>

   
</template>

<script>
import state from '@/state/master';
import { ErrorNotify } from '@/utils/tool';
import newDce from '@/utils/Node/save/toDceNodes';

export default {
  inject: ['i18n'],
  data(){
     return {
        graph: null,
        visible: false,

        items: [],

        butt:{
          canCopy: true,
          canPaste: true,
          canDelete: true,
          canZoomIn: false,
          canZoomOut: false,
          canZoomReset: false,
          canAutoFit: false
        }
     }
  },
  methods:{
    bindEvent() {
      this.$EventBus.$on("initGraph", page => {
        this.graph = page.graph;

        this.bindGraphEvent()
      });
    },
    bindGraphEvent(){
        this.graph.on('afteritemselected', items=> this.items = items)
    },
    copy(){
      if(this.graph.executeCommand) {
         this.graph.executeCommand('copy', {});
         this.butt.canPaste = false;
      }
    },
    paste(){
      if(this.graph.executeCommand) {
         this.graph.executeCommand('paste', {});
         this.butt.canPaste = true;
      }
    },
    deleteItem(){
      if(this.graph.executeCommand) {
          this.graph.executeCommand('delete', {});
       }else{
         this.graph.remove(items[0]);
       }
       this.graph.set('selectedItems',[]);
       this.graph.emit('afteritemselected',[]);
    },
    zoomIn(){
      if(this.graph.executeCommand) {
         this.graph.executeCommand('zoomIn', {});
      }
    },
    zoomOut(){
      if(this.graph.executeCommand) {
         this.graph.executeCommand('zoomOut', {});
      }
    },
    zoomReset(){
     if(this.graph.executeCommand) {
        this.graph.executeCommand('resetZoom', {});
     }
    },
    autoFit(){
        if(this.graph.executeCommand) {
         this.graph.executeCommand('autoFit', {});
      }
    },
    showMenu (){
      this.$EventBus.$emit('has-menu')
    },
    save(){
      // if(!state.current.code || !state.current.name ){
      //   ErrorNotify('请编辑开始节点，并设置流程编号和流程描述');
      //   return;
      // }

      let data = this.graph.save()
      console.log(data);
      state.nodes = data.nodes || [];
      state.edges = data.edges || [];

      console.log(newDce.init(data));

    },
    handleCreate(payload){
          console.log(payload);

        const form = this.$refs.addNode.form
          
        if(payload){
           form.validateFields((err, values) => {
            if (err) {
              return;
            }
            console.log('Received values of form: ', values);
            // nodeId: "123" nodeType: "externalNumber-node"

            var nodeInfo = getNodeInfo(values.nodeType)
            nodeInfo.id = values.nodeId
            nodeInfo.size = nodeInfo.size.split("*")
            nodeInfo.type = 'node'

            console.log(nodeInfo);

            this.command.executeCommand('add', [nodeInfo])

            form.resetFields();
            this.visible = false
         });
        } else {
            form.resetFields();
            this.visible = false
        }         
    }
   },
    watch:{
      items (newValue){
        if(newValue.length > 0 && newValue[0] !== 'start' && newValue[0] !== 'exit'){ // selected Item
           this.butt.canCopy = false
           this.butt.canDelete = false
           this.butt.canPaste = true
        } else if(newValue.length === 0){ 
            this.butt.canCopy = true
            this.butt.canDelete = true
            this.butt.canPaste = true
        }
      } 
    },
    mounted(){
       this.bindEvent()
    }
  }
</script>

<style scoped>
  .toolbar {
     text-align: left;
     width: 100%;
     padding: 8px 0;
     background-color: #fff;
     border: 1px solid #E9E9E9;
     box-shadow: 0 8px 12px 0 rgba(0, 52, 107, 0.04); }
  .toolbar .command {
      display: inline-block;
      margin: 0 6px;
      line-height: 27px;
      border: 1px solid rgba(2, 2, 2, 0);
      border-radius: 2px; }
   .toolbar .command span {
      margin: 0 6px; 
    }
   .toolbar .command:nth-of-type(1) {
      margin-left: 24px;
    }
   .toolbar .command:hover {
      border: 1px solid #E9E9E9;
      cursor: pointer; 
    }
   .toolbar .separator {
        margin: 4px;
        border-left: 1px solid #E9E9E9; }
   .toolbar .icon-select.disable {
        background: #EEE; 
    }
   .toolbar .disable {
        color: rgba(0, 0, 0, 0.25); 
    }
   .toolbar .disable:hover {
      border: 1px solid rgba(2, 2, 2, 0);
      cursor: default; 
    }


    .iconfont {
        font-family: "iconfont" !important;
        font-size: 16px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

</style>
