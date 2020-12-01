<template>
   <div>
    <a-drawer
      :title="title"
      :placement="placement"
      :closable="false"
      :width="420"
      :visible="visible"
      @close="onClose"
    >
     <Start v-if="nodeModel.clazz === 'start'" :mode="nodeModel" @close-Panel="onClose" />
     <NoCall v-if="nodeModel.clazz === 'noCall'" :mode="nodeModel" :graph="graph" @update-item="updatePanel" />
     <Ani v-if="nodeModel.clazz === 'ani'" :mode="nodeModel" :graph="graph" @update-item="updatePanel" />
     <Dnis v-if="nodeModel.clazz === 'dnis'" :mode="nodeModel" :graph="graph" @update-item="updatePanel" />
     <Prefix v-if="nodeModel.clazz === 'prefix'" :mode="nodeModel" :graph="graph"  @update-item="updatePanel" />
     <JS v-if="nodeModel.clazz === 'js'" :nodeModel="nodeModel" :init="visible" :graph="graph" @update-item="updatePanel" />

     <Dnc v-if="nodeModel.clazz === 'dnc'" :mode="nodeModel" :graph="graph" @update-item="updatePanel" />
     <Ranking v-if="nodeModel.clazz === 'ranking'" :mode="nodeModel" :graph="graph" @update-item="updatePanel" />
     <If v-if="nodeModel.clazz === 'if'" :mode="nodeModel" :init="visible" :graph="graph" @update-item="updatePanel" />
     <DataForm v-if="nodeModel.clazz === 'data'" :mode="nodeModel" :graph="graph" @update-item="updatePanel" />

    </a-drawer>
   </div>
</template>

<script>
import { getDetailTitle } from '@/utils/clazz';
import Start from './Drawer/start.vue';
import NoCall from './Drawer/noCall.vue';
import Ani from './Drawer/ani.vue';
import Dnis from './Drawer/dnis.vue';
import Prefix from './Drawer/prefix.vue';
import JS from './Drawer/js.vue';

import Dnc from './Drawer/dnc.vue';
import Ranking from './Drawer/ranking.vue';
import If from './Drawer/if.vue';
import DataForm from './Drawer/data.vue';

import state from '@/state/master';

export default {
    name: 'DetailPanel',
    components:{
      Start,
      NoCall,
      Ani,
      Dnis,
      Prefix,
      JS,
      Ranking,
      Dnc,
      If,
      DataForm
    },
    data(){
      return {
        graph: null,
        placement: 'left',
        title: '详情框',
        visible: false,
        item: {},

        nodeModel: {}
      }
    },
    props:{

    },
    methods:{
     init() {
       this.$EventBus.$on("initGraph", page => {
        //  this.graph = page.graph;

         this.graph = page.graph;
         this.bindSelectEvent()
       });
     },
     bindSelectEvent(){
       console.log(this.graph);
        this.graph.on('afteritemselected', items=>{
            if(items && items.length > 0) {
                this.selectItem = items;
                this.item = this.graph.findById(items[0]);
                this.nodeModel = this.item.getModel();
                console.log('afteritemselected', this.nodeModel, this.nodeModel.clazz);
            }
        })

        this.graph.on('afterItemDbClick',()=>{
          if(this.nodeModel.clazz !== 'exit' && this.nodeModel.clazz !== 'call'){
            this.visible = true
            this.title = getDetailTitle(this.nodeModel.clazz)
          }
        })
     },
     onClose(){
       this.visible = false;
     },
     updatePanel(updateModel){
        this.visible = false;

        if(this.graph.executeCommand) {
          console.log('updateModel: ', updateModel);
          this.graph.executeCommand('update', {
            itemId: this.selectItem[0],
            updateModel
          });
        } else {
          this.graph.updateItem(this.selectItem, updateModel);
        }
          // this.nodeModel = {...this.selectItem.getModel()};
     },
     whichTitle (){
        
     }
    },
    mounted(){
       this.init()
    }
}
</script>

<style>

</style>