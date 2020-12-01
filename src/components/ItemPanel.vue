<template>
  <div ref="addItemPanel"  class="itemPanel" :style="{'height': height+'px'}"> 
    <a-list bordered  item-layout="vertical">
      <a-list-item >
         <img :data-item="ifItem"
          :src="require('../assets/flow/if.svg')" style="width:58px;height:42px" />
          <div>条件节点</div>
      </a-list-item>
      <a-list-item >
         <img data-item="{clazz:'js'}"
          :src="require('../assets/flow/js.svg')" style="width:58px;height:42px" />
          <!-- <div>{{i18n['jsEvent']}}</div> -->
          <div>js节点</div>
      </a-list-item>
      <a-list-item >
         <img data-item="{clazz:'prefix'}"
          :src="require('../assets/flow/Relay.svg')" style="width:58px;height:42px" />
          <div>{{i18n['prefix']}}</div>
      </a-list-item>
      <a-list-item >
         <img data-item="{clazz:'ani'}"
          :src="require('../assets/flow/externalNumber.svg')" style="width:58px;height:42px" />
          <div>{{i18n['ani']}}</div>
      </a-list-item>
      <a-list-item >
         <img data-item="{clazz:'dnis'}"
          :src="require('../assets/flow/dnis.svg')" style="width:58px;height:42px" />
          <div>{{i18n['dnis']}}</div>
      </a-list-item>
      <a-list-item >
         <img data-item="{clazz:'call'}"
          :src="require('../assets/flow/calling.svg')" style="width:58px;height:42px" />
          <div>{{i18n['call']}}</div>
      </a-list-item>
      <a-list-item >
         <img data-item="{clazz:'noCall'}"
          :src="require('../assets/flow/noCall.svg')" style="width:58px;height:42px" />
          <div>{{i18n['noCall']}}</div>
      </a-list-item>

      <a-list-item >
         <img :data-item="dncItem"
          :src="require('../assets/flow/Blacklist.svg')" style="width:58px;height:42px" />
          <div>{{i18n['dnc']}}</div>
      </a-list-item>
      <a-list-item >
         <img :data-item="rankingItem"
          :src="require('../assets/flow/Ranking.svg')" style="width:58px;height:42px" />
          <div>{{i18n['ranking']}}</div>
      </a-list-item>
      <a-list-item >
         <img :data-item="dataItem"
          :src="require('../assets/flow/data.svg')" style="width:58px;height:42px" />
          <div>{{i18n['data']}}</div>
      </a-list-item>


    </a-list>
  </div>
</template>

<script>
import AddItemPanel from '@/graph/plugins/addItemPanel';
import state from '@/state/master';

export default {
  inject: ['i18n'],
  data(){
    return {
      graph: null,
      command: null,
      offsetX: 0,
      offsetY: 0,

      ifItem:  "{clazz:'if', title: '条件节点' }",
      dataItem: "{clazz:'data', title: '接口调用节点' }",
      dncItem: "{clazz:'dnc', title: '黑名单节点' }",
      rankingItem: "{clazz:'ranking', title: '排重节点' }"
    }
  },
  props: {
      height: {
        type: Number,
        default: 800,
    },
 },
 methods:{
    initItem(){
        const addItemPanel = new AddItemPanel({container:this.$refs['addItemPanel']});
        this.graph.addPlugin(addItemPanel);
    },
    bindEvent() {
      this.$EventBus.$on("initGraph", page => {

        // console.log(page);
        this.graph = page.graph;
        this.initItem()
      });
    }
 },
 mounted(){
   this.bindEvent()
 }
}
</script>

<style>
.itemPanel {
    /* float: left; */
    width: 80px;
    position: absolute;
    min-width: 107px;
    background: #f0f2f5;
    overflow-y: auto;
    border-left: 1px solid #E9E9E9;
    border-bottom: 1px solid #E9E9E9; 
    text-align: center;
}
.itemPanel img {
    width: 92px;
    height: 96px;
    padding: 4px;
    border: 1px solid transparent;
    border-radius: 2px; 
}
.itemPanel img:hover {
    border: 1px solid #ccc;
    cursor: move;     
}
.itemPanel .ant-list-footer{
    padding-bottom: 25px;
    font-size: 13px;
    color: #303133;
    line-height: 1.769230769230769;
}
.itemPanel .ant-list{
    font-size:12px;
}
     
</style>