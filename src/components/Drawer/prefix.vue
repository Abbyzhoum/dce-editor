<template>
  <div>
    <a-form-model v-bind="layout" ref="prefixForm" :model="prefix" :rules="rules" >
      <a-form-model-item label="节点ID" prop="id" >
       <a-input v-model="prefix.id" type="text" autocomplete="off"  placeholder="请输入节点ID"  >
        <a-tooltip slot="suffix" title="规则：必须是英文字母开头，可以包含数字，不能和已有节点id重复">
          <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
        </a-tooltip>
       </a-input>
      </a-form-model-item>
      <a-form-model-item label="描述">
        <a-input v-model="prefix.detail" placeholder="请输入描述" />
      </a-form-model-item>
      <a-form-model-item label="改写后的前缀" prop="prefix">
          <a-input-number v-model="prefix.prefix" autocomplete="off" />
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
  name: 'prefix',
  data(){
    return {
      layout:{
         labelCol: { span: 8 },
         wrapperCol: { span: 12 }
       },

      prefix:{
          id: '',
          detail: '',
          prefix: ''
      },
      rules:{
          id: rules.required,
          prefix: rules.number
      },

      columns: [{
         title: '中继组',
         dataIndex: 'name',
       },
       {
         title: '描述',
         dataIndex: 'age',
       },
       {
         title: '对应前缀',
         dataIndex: 'address',
       },
      ]
    }
  },
  methods:{
      submit(){
        this.$refs['prefixForm'].validate(valid => {
          if (valid) {
             this.update() 
          }
        });  
      },
      update(){
        let updateModel = {
            // id: this.prefix.id,
            // label: this.prefix.id,
            data: {
              prefix:  this.prefix.prefix,
              detail: this.prefix.detail
            }
        };

        console.log(this.mode.id);
        if(this.mode.id !== this.prefix.id){
           let pass = hasSameNodeId(this.prefix.id)
           console.log(pass);

           if(!pass){
            return 
           }
           updateModel.id = this.prefix.id
           updateModel.label = this.prefix.id
        }

        this.$emit('update-item', updateModel )

        //  updateNode(this.mode, updateModel);
        //  this.$EventBus.$emit('closeDetailPanel');
      },
      initModel(){
         let data =  this.mode.data 
         console.log('prefix', data);

        this.prefix.id = this.mode.id
        this.prefix.detail = data.detail || ''
        this.prefix.prefix = data.prefix || ''
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