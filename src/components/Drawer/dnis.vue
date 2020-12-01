<template>
  <div>
    <a-form-model v-bind="layout" ref="dnisForm" :model="dnis" :rules="rules" >
      <a-form-model-item label="节点ID" prop="id" >
       <a-input v-model="dnis.id" type="text" autocomplete="off"  placeholder="请输入节点ID"  >
        <a-tooltip slot="suffix" title="规则：必须是英文字母开头，可以包含数字，不能和已有节点id重复">
          <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
        </a-tooltip>
       </a-input>
      </a-form-model-item>
      <a-form-model-item label="描述">
        <a-input v-model="dnis.detail" placeholder="请输入描述" />
      </a-form-model-item>
      <a-form-model-item label="改写后的别叫号码" prop="dins">
          <a-input-number v-model="dnis.dnis" :default-value="-5" />
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
  name: 'dnis', // 别叫号码改写节点
  data(){
    return {
      layout:{
         labelCol: { span: 8 },
         wrapperCol: { span: 12 }
       },

      dnis:{
          id: '',
          detail: '',
          dins: ''
      },
      rules:{
          id: rules.required,
          dins: rules.number
      }
    }
  },
  methods:{
      submit(){
        this.$refs['dnisForm'].validate(valid => {
          if (valid) {
             this.update() 
          }
        });  
      },
      update(){
        let updateModel = {
            // id: this.dnis.id,
            // label: this.dnis.id,
            data: {
              dnis:  this.dnis.dnis,
              detail: this.dnis.detail
            }
        };

        console.log(this.mode.id);
        if(this.mode.id !== this.dnis.id){
           let pass = hasSameNodeId(this.dnis.id)
           console.log(pass);

           if(!pass){
            return 
           }
           updateModel.id = this.dnis.id
           updateModel.label = this.dnis.id
        }

        //  updateNode(this.mode, updateModel);
        //  this.$EventBus.$emit('closeDetailPanel');
         this.$emit('update-item', updateModel )
      },
      initModel(){
         let data =  this.mode.data 
         console.log('dnis', data);

         this.dnis.dnis = data.dnis || ''
         this.dnis.detail = data.detail || ''
         this.dnis.id = this.mode.id
      }
  },
  mounted(){
    this.initModel()
  },
  watch:{
    init(newValue){
      newValue && this.initModel()
    }
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
   }
}
</script>

<style>

</style>