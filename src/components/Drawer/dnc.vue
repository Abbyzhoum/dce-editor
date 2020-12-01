<template>
  <div>
    <a-form-model v-bind="layout" ref="dncForm" :model="dnc" :rules="rules" >
      <a-form-model-item label="节点ID" prop="id" >
       <a-input v-model="dnc.id" type="text" autocomplete="off"  placeholder="请输入节点ID"  >
        <a-tooltip slot="suffix" title="规则：必须是英文字母开头，可以包含数字，不能和已有节点id重复">
          <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
        </a-tooltip>
       </a-input>
      </a-form-model-item>
      <a-form-model-item label="描述">
        <a-input v-model="dnc.detail" placeholder="请输入描述" />
      </a-form-model-item>

      <!-- <a-form-model-item label="黑名单列表" prop="blacklistIds"> -->
      <a-form-model-item label="黑名单列表" >
         <a-select v-model="dnc.blacklistIds" >
           <a-select-option v-for="item in blacklist" :key="item.id" :value="item.id"> {{ item.name }} </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="拦截依据" prop="fieldName">
          <a-input v-model="dnc.fieldName"  />
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
  name: 'dnc', // 黑名单节点
  data(){
    return {
      layout:{
         labelCol: { span: 8 },
         wrapperCol: { span: 12 }
       },

      dnc:{
        id: '',
        detail: '',
        blacklistIds: '',
        fieldName: ''
      },
      rules:{
        id: rules.required,
        blacklistIds: rules.required,
        fieldName: rules.required
      },

      blacklist: state.blacklist
    }
  },
  methods:{
      submit(){
        this.$refs['dncForm'].validate(valid => {
          if (valid) {
             this.update() 
          }
        });  
      },
      update(){
        let updateModel = {
            data: {
              dnc:  this.dnc.dnis,
              detail: this.dnc.detail,
              blacklistIds: this.dnc.blacklistIds,
              fieldName: this.dnc.fieldName
            }
        };

        console.log(this.mode.id);
        if(this.mode.id !== this.dnc.id){
           let pass = hasSameNodeId(this.dnc.id)

           if(!pass){
            return 
           }
           updateModel.id = this.dnc.id
           updateModel.title = this.dnc.id
        }

         this.$emit('update-item', updateModel)
        // this.$EventBus.$emit('closeDetailPanel', updateModel);
      },
      initModel(){
         let data =  this.mode.data 
         console.log('dnc.data: ', data);
         
         this.dnc.id = this.mode.id;
         this.dnc.detail = data.detail || '';
         this.dnc.blacklistIds = data.blacklistIds || '';
         this.dnc.fieldName = data.fieldName || '';
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