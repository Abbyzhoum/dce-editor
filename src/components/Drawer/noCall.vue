<template>
  <div>
    <a-form-model v-bind="layout" ref="noCallForm" :model="noCall" :rules="rules" >
      <a-form-model-item label="节点ID" prop="id" >
       <a-input v-model="noCall.id" type="text" autocomplete="off"  placeholder="请输入节点ID"  >
        <a-tooltip slot="suffix" title="规则：必须是英文字母开头，可以包含数字，不能和已有节点id重复">
          <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
        </a-tooltip>
       </a-input>
      </a-form-model-item>
      <a-form-model-item label="描述">
        <a-input v-model="noCall.detail" placeholder="请输入描述" />
      </a-form-model-item>
      <a-form-model-item label="业务禁播原因码" prop="code">
          <a-input-number v-model="noCall.code" :default-value="-5" />
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
import { hasSameNodeId, updateNode } from '@/utils/computed';

export default {
  name: 'noCall',
  data(){
    return {
      layout:{
         labelCol: { span: 8 },
         wrapperCol: { span: 12 }
       },

      noCall:{
          id: '',
          code: -5,
          detail: ''
      },
      rules:{
          id: rules.required,
          code: rules.number
      }
    }
  },
  methods:{
      submit(){
        this.$refs['noCallForm'].validate(valid => {
          if (valid) {
             this.update() 
          }
        });  
      },
      update(){
        let updateModel = {
            id: this.noCall.id,
            label: this.noCall.id,
            data: {
              code:  this.noCall.code,
              detail: this.noCall.detail
            }
        };

        console.log(this.mode.id);
        if(this.mode.id !== this.noCall.id){
           let pass = hasSameNodeId(this.noCall.id)
           console.log(pass);

           if(!pass){
            return 
           }
           updateModel.id = this.noCall.id
           updateModel.label = this.noCall.id
        }

        //  updateNode(this.mode, updateModel);
        //  this.$EventBus.$emit('closeDetailPanel');
         this.$emit('update-item', updateModel )
      },
      initModel(){
         let data =  this.mode.data 
         console.log('noCall', data);

         this.noCall.code =  data.code || -5
         this.noCall.detail = data.detail || ''
         this.noCall.id = this.mode.id
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