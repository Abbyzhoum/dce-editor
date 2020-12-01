<template>
  <div>
    <a-form-model v-bind="layout" ref="aniForm" :model="ani" :rules="rules" >
      <a-form-model-item label="节点ID" prop="id" >
       <a-input v-model="ani.id" type="text" autocomplete="off"  placeholder="请输入节点ID"  >
        <a-tooltip slot="suffix" title="规则：必须是英文字母开头，可以包含数字，不能和已有节点id重复">
          <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
        </a-tooltip>
       </a-input>
      </a-form-model-item>
      <a-form-model-item label="描述">
        <a-input v-model="ani.detail" placeholder="请输入描述" />
      </a-form-model-item>
      <a-form-model-item label="是否启用外显号码组" prop="useNumberGroup">
         <a-radio-group v-model="ani.useNumberGroup" :default-value="false">
          <a-radio :value="true"> 开启 </a-radio>
          <a-radio :value="false"> 关闭 </a-radio>
        </a-radio-group>
      </a-form-model-item>

      <a-form-model-item label="使用外显号码" prop="defaultAni" v-if="ani.useNumberGroup === false">
          <a-input v-model="ani.defaultAni"  />
      </a-form-model-item>

      <a-form-model-item label="选择号码组" prop="numberGroupId" v-if="ani.useNumberGroup === true">
        <a-select default-value="" v-model="ani.numberGroupId" @change="getNumGroupName">
           <a-select-option v-for="group in numGroup" :key="group.id" :value="group.id"> {{ group.numberGroupName }} </a-select-option>
        </a-select>
      </a-form-model-item>
       <a-form-model-item label="号码选择策略" v-if="ani.useNumberGroup === true" prop="numberGroupStrategy">
         <a-select default-value="POLLING" v-model="ani.numberGroupStrategy">
            <a-select-option value="POLLING"> 轮询 </a-select-option>
        </a-select>
      </a-form-model-item>
    </a-form-model>

     <div :style="{
         position: 'absolute',
         right: 0,
         bottom: 0,
         width: '100%',
         borderTop: '1px solid #e9e9e9',
         padding: '10px 16px',
         background: '#fff',
         textAlign: 'right',
         zIndex: 1,
       }">
       <a-button type="primary" @click="submit"> 确定  </a-button>
     </div> 

  </div>
</template>

<script>
import rules from '@/config/reg';
import state from '@/state/master';
import { hasSameNodeId, updateNode } from '@/utils/computed';

export default {
  name: 'ani',
  data(){
    return {
      layout:{
         labelCol: { span: 8 },
         wrapperCol: { span: 12 }
       },

      ani:{
          id: '',
          useNumberGroup: false,
          detail: '',
          numberGroupId: '',
          numberGroupStrategy: '',
          defaultAni: ''
      },
      rules:{
          id: rules.required,
          defaultAni: rules.required,
          numberGroupId: rules.required,
          numberGroupStrategy: rules.required,
          useNumberGroup: rules.required
      },

      numGroup: state.numGroup,
      numberGroupName: ''
    }
  },
  methods:{
      submit(){
        this.$refs['aniForm'].validate(valid => {
          if (valid) {
              this.update() 
          }
        });  
      },
      update(){
        let updateModel = {
             data: {
               useNumberGroup:  this.ani.useNumberGroup,
               detail: this.ani.detsail,
               defaultAni: this.ani.defaultAni,
               numberGroupId: this.ani.numberGroupId,
               numberGroupName: this.numberGroupName,
               numberGroupStrategy: this.ani.numberGroupStrategy
             }
        };

        if(this.mode.id !== this.ani.id){
           let pass = hasSameNodeId(this.ani.id)

           if(!pass){
            return 
           }
           updateModel.id = this.ani.id
           updateModel.label = this.ani.id
        }

        //  updateNode(this.mode, updateModel);
        //  this.$EventBus.$emit('closeDetailPanel');
        this.$emit('update-item', updateModel)
      },
      initModel(){
         let data =  this.mode.data 
         console.log('ani', data);

         this.ani.id = this.mode.id
         this.ani.useNumberGroup =  data.useNumberGroup || false
         this.ani.detail =  data.detail || ''
         this.ani.defaultAni =  data.defaultAni || ''
         this.ani.numberGroupId =  data.numberGroupId || ''
         this.ani.numberGroupName =  data.numberGroupName || ''
         this.ani.numberGroupStrategy =  data.numberGroupStrategy || 'POLLING'
      },
      getNumGroupName(value){
          const name = this.numGroup.find(item=>{
              return item.id === value
          })

        this.numberGroupName = name.numberGroupName
      }
  },
  mounted(){
    this.initModel()
  },
  props:{
     mode:{
        type: Object,
        default: {}
     },
     graph:{
        type: Object,
        default: {}
     },
     init:{
        type: Boolean,
        default: false
     }
   },
  watch:{
    init(newValue){
      newValue && this.initModel()
    }
   }
}
</script>

<style>

</style>