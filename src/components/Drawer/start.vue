<template>
  <div>
   <a-form-model v-bind="layout" ref="startForm" :model="startForm" :rules="rules"  >
    <a-form-model-item has-feedback label="DCE流程号" prop="code" >
      <a-input v-model="startForm.code" type="text" autocomplete="off" :maxLength="4" placeholder="以3开头的4数字" >
        <a-tooltip slot="suffix" title="规则：以3开头的4数字，号码不能为3000,不能和已有流程号重复">
          <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
        </a-tooltip>
      </a-input>
    </a-form-model-item>
    <a-form-model-item has-feedback label="流程描述" prop="name">
      <a-input v-model="startForm.name" type="text" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="最大访问超时时间" prop="timeout">
      <a-input-number v-model.number="startForm.timeout" 
      :formatter="value => `${value}秒`"
      :parser="value => value.replace('秒', '')" />
    </a-form-model-item>
    <a-form-model-item label="定义变量">
      <a-button type="dashed" style="" @click="addVarList">
        <a-icon type="plus" /> 增加变量
      </a-button>
    </a-form-model-item>
    <a-form-model-item 
       :wrapper-col="{ span: 24 }"
       v-for="(item, index) in startForm.varList"
      :key="index">
       <a-input-group compact>
        <a-input style="width: 30%;" placeholder="输入变量名" v-model="item.name"  > </a-input>
        <a-select  v-model="item.type" default-value="String" style="width: 80px">
            <a-select-option v-for="elem in VarTypes" :key="elem.type" :value="elem.type"> {{elem.type}} </a-select-option>
        </a-select>
        <a-input style="width: 35%;" placeholder="请输入变量值" v-model="item.value" ></a-input>
        <a-icon
         v-if="startForm.varList.length > 1"
         class="dynamic-delete-button"
         type="minus-circle-o"
         :disabled="startForm.varList.length === 1"
         @click="removeDomain(index)"
       />
      </a-input-group>
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
      <!-- <a-button style="margin-left: 10px" @click="cancle">  取消 </a-button>  -->
    </div> 
  </div>
</template>

<script>
import rules from '@/config/reg';
import { VarType } from '@/config/baseInfo'
import state from '@/state/master';

export default {
   name: 'start',
   data(){
     let checkCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入流程号'));
      } else if (!/^3\d{3}$/.test(value) || value === '3000') {
        callback(new Error("输入以3开头的4数字，且不能为3000"));
      } else {
        callback();
      }
    };

    return {
       rules: {
          code:  [{ validator: checkCode, trigger: 'blur' }],
          name: rules.required,
          timeout: rules.number
       },
       startForm:{
           code: '',
           name: '',
           timeout: 2,
           varList: []
       },

       VarTypes: VarType,
       layout:{
         labelCol: { span: 8 },
         wrapperCol: { span: 12 }
       }
    }
   },
   methods:{
       submit(){
         this.$refs['startForm'].validate(valid => {
          if (valid) {
              this.save()
          }
        });
       },
       save(){
         state.current.varList = this.startForm.varList 
         state.current.name = this.startForm.name 
         state.current.code = this.startForm.code 
         state.current.timeout = this.startForm.timeout || 2
        console.log(state.current);

          this.$emit('close-Panel')
       },
       cancle(){

       },
       addVarList(){
         this.startForm.varList.push({
             name: '',
             type: 'String',
             value: ''
           })
       },
       removeDomain(index){
           this.startForm.varList.splice(index, 1)
       },
       initMode(){
         console.log('start', this.mode);

         this.startForm.varList = state.current.varList || []
         this.startForm.name = state.current.name || ''
         this.startForm.code = state.current.code || ''
         this.startForm.timeout = state.current.timeout || 2

       }
   },
   mounted(){
     this.initMode()
   },
   watch:{
    init(newValue){
      if(newValue){
        this.initMode()
      }
    }
   },
   props:{
     mode:{
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
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
  margin-left: 2px;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>