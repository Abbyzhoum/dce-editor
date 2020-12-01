<template>
  <div>
    <a-form-model v-bind="layout" ref="rangkingForm" :model="rangking" :rules="rules" >
      <a-form-model-item label="节点ID" prop="id" >
       <a-input v-model="rangking.id" type="text" autocomplete="off"  placeholder="请输入节点ID"  >
        <a-tooltip slot="suffix" title="规则：必须是英文字母开头，可以包含数字，不能和已有节点id重复">
          <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
        </a-tooltip>
       </a-input>
      </a-form-model-item>
      <a-form-model-item label="描述">
        <a-input v-model="rangking.detail" placeholder="请输入描述" />
      </a-form-model-item>

      <a-form-model-item label="有效期" prop="dayNum">
        <a-select default-value="1" v-model="rangking.dayNum">
          <a-select-option value="1"> 1天 </a-select-option>
          <a-select-option value="2"> 2天 </a-select-option>
          <a-select-option value="3"> 3天 </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="排重累加事件" prop="rdType">
        <a-select default-value="DIAL" v-model="rangking.rdType">
          <a-select-option value="DIAL"> 拨号 </a-select-option>
          <a-select-option value="ANSWER"> 接通 </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="有效次数" prop="times">
          <a-input-number :default-value="3" :formatter="value => `${value}%`"
         :parser="value => value.replace('%', '')" v-model="rangking.times" 
         />
      </a-form-model-item>
      <a-form-model-item label="排重范围" prop="dataScope">
        <a-select default-value="ACTIVITY" v-model="rangking.dataScope">
          <a-select-option value="ACTIVITY"> 活动 </a-select-option>
          <a-select-option value="SYSTEM"> 活动组 </a-select-option>
          <a-select-option value="DOMAIN"> 租户 </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="排重依据" prop="fieldName">
          <a-input v-model="rangking.fieldName" autocomplete="off" />
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
  name: 'rangking', // 排重
  data(){
    return {
      layout:{
         labelCol: { span: 8 },
         wrapperCol: { span: 12 }
       },

      rangking:{
          id: '',
          detail: '',
          fieldName: '',
          dayNum: '1',
          rdType: '',
          times: 3,
          dataScope: ''
      },
      rules:{
          id: rules.required,
          fieldName: rules.required,
          dayNum: rules.required,
          rdType: rules.required,
          times: rules.number,
          dataScope: rules.required
      }
    }
  },
  methods:{
      submit(){
        this.$refs['rangkingForm'].validate(valid => {
          if (valid) {
             this.update() 
          }
        });  
      },
      update(){
        let updateModel = {
            data: {
              dnc:  this.rangking.dnis,
              detail: this.rangking.detail,
              fieldName: this.rangking.fieldName,
              dayNum: this.rangking.dayNum,
              rdType: this.rangking.rdType,
              times: this.rangking.times,
              dataScope: this.rangking.dataScope
            }
        };

        console.log(this.mode.id);
        if(this.mode.id !== this.rangking.id){
           let pass = hasSameNodeId(this.rangking.id)
           console.log(pass);

           if(!pass){
            return 
           }
           updateModel.id = this.ani.id
           updateModel.title = this.ani.id
        }

        //  updateNode(this.mode, updateModel);
        //  this.$EventBus.$emit('closeDetailPanel');
         this.$emit('update-item', updateModel )

      },
      initModel(){
         let data =  this.mode.data 
         console.log('rangking', data);

         
         this.dnc.id = this.mode.id;
         this.dnc.detail = data.detail || '';
         
         this.dnc.fieldName = data.fieldName || '';
         this.dnc.dayNum =  data.dayNum || '';
         this.dnc.rdType =  data.rdType || '';
         this.dnc.times =  data.times || '';
         this.dnc.dataScope = data.dataScope || '';
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