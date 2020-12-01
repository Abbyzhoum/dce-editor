<template>
  <div>
   <a-form-model v-bind="layout" ref="dataForm" :model="Data" :rules="rules"  >
    <a-form-model-item label="节点ID" prop="id" >
       <a-input v-model="Data.id" type="text" autocomplete="off"  placeholder="请输入节点ID"  >
        <a-tooltip slot="suffix" title="规则：必须是英文字母开头，可以包含数字，不能和已有节点id重复">
          <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
        </a-tooltip>
       </a-input>
    </a-form-model-item>
    <a-form-model-item label="描述">
      <a-input v-model="Data.detail" type="text" autocomplete="off" />
    </a-form-model-item>

    <a-form-model-item label="请求地址">
      <a-input v-model="Data.url" type="text" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item label="请求方式" prop="method">
      <a-radio-group v-model="Data.method" default-value="GET">
        <a-radio value="GET"> GET </a-radio>
        <a-radio value="POST"> POST </a-radio>
      </a-radio-group>
    </a-form-model-item>

    <a-form-model-item label="请求头列表">
      <a-button type="dashed" style="" @click="addOne('header')">
        <a-icon type="plus" /> 增加参数
      </a-button>
    </a-form-model-item>
    <a-form-model-item 
       :wrapper-col="{ span: 24 }"
       v-for="(item, index) in Data.headers"
      :key="index">
      <a-input-group>
         <a-row :gutter="8">
           <a-col :span="8">
             <a-input placeholder="属性名" v-model="item.name" />
           </a-col>
           <a-col :span="14">
             <a-input placeholder="属性值" v-model="item.value" />
           </a-col>

         <a-icon
         class="dynamic-delete-button"
         type="minus-circle-o"
         @click="removeOne(index, 'headers')"
       />
         </a-row>
      </a-input-group>
    </a-form-model-item>

    <a-divider />

    <a-form-model-item label="请求参数列表">
      <a-button type="dashed" style="" @click="addOne('params')">
        <a-icon type="plus" /> 增加参数
      </a-button>
    </a-form-model-item>
    <a-form-model-item 
       :wrapper-col="{ span: 24 }"
       v-for="(item, index) in Data.params"
      :key="'params'+ index">
       <a-input-group compact>
          <a-row :gutter="8">
           <a-col :span="8">
             <a-input placeholder="属性名" v-model="item.name" />
           </a-col>
           <a-col :span="14">
             <a-input placeholder="属性值" v-model="item.value" />
           </a-col>

          <a-icon
           class="dynamic-delete-button"
           type="minus-circle-o"
           @click="removeOne(index, 'params')"
         />
         </a-row>
      </a-input-group>
    </a-form-model-item>

    <a-divider />

    <a-form-model-item label="请求body列表" v-if="Data.method === 'POST'">
      <a-button type="dashed" style="" @click="addOne('body')">
        <a-icon type="plus" /> 增加参数
      </a-button>
    </a-form-model-item>
    <a-form-model-item 
       :wrapper-col="{ span: 24 }"
       v-for="(item, index) in Data.body"
       :key="'body'+ index">
       <a-input-group v-if="Data.method === 'POST'" compact>
        <a-input style="width: 30%;" placeholder="属性名" v-model="item.name"  > </a-input>
        <a-select  v-model="item.type" default-value="String" style="width: 80px">
            <a-select-option v-for="elem in VarTypes" :key="elem.type" :value="elem.type"> {{elem.type}} </a-select-option>
        </a-select>
        <a-input style="width: 35%;" placeholder="属性值" v-model="item.value" ></a-input>
        <a-icon
         v-if="Data.body.length > 1"
         class="dynamic-delete-button"
         type="minus-circle-o"
         :disabled="Data.body.length === 1"
         @click="removeOne(index, 'body')"
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
    </div> 
  </div>
</template>

<script>
import rules from '@/config/reg';
import { hasSameNodeId, updateNode } from '@/utils/computed';
import state from '@/state/master';

export default {
   name: 'dataForm', // 接口调用节点
   data(){
    return {
       rules: {
          id: rules.required,
          method: rules.required
       },
       Data:{
           id: '',
           detail: '',
           url: '',
           method: 'GET',
           headers: [],
           params: [],
           body: []
       },
       VarTypes: state.VarType,

       layout:{
         labelCol: { span: 8 },
         wrapperCol: { span: 12 }
       }
    }
   },
   methods:{
       submit(){
         this.$refs['dataForm'].validate(valid => {
          if (valid) {
              this.update()
          }
        });
       },
       update(){
        let updateModel = {
            data: {
              detail: this.Data.detail,
              url: this.Data.url,
              method: this.Data.method,
              headers: this.Data.headers,
              params: this.Data.params,
              body: this.Data.body
            }
        };

        console.log(this.mode.id);
        if(this.mode.id !== this.Data.id){
           let pass = hasSameNodeId(this.Data.id)

           if(!pass){
            return 
           }
           updateModel.id = this.Data.id
           updateModel.title = this.Data.id
        }

        //  updateNode(this.mode, updateModel);
        //  this.$EventBus.$emit('closeDetailPanel');
          this.$emit('update-item', updateModel)
       },
       addOne(type){
         if(type === 'body'){
             this.Data.body.push({
               name: '',
               type: 'String',
               value: ''
            })
         } else if(type === 'header'){
            this.Data.headers.push({
               name: '',
               value: ''
            })
         } else if(type === 'params'){
             this.Data.params.push({
               name: '',
               value: ''
            })
         }
       },
       removeOne(index, type){
           if(type === 'headers'){
            this.Data.headers.splice(index, 1)
           } else if(type === 'params'){
            this.Data.params.splice(index, 1)
           } else if(type === 'body'){
            this.Data.body.splice(index, 1)
           }
       },
       initMode(){
         let data =  this.mode.data;
         console.log('dataForm', this.mode);

         this.Data.id = this.mode.id;
         this.Data.detail = data.detail || '';

         this.Data.url = data.url || '';
         this.Data.method =  data.method || 'GET';
         this.Data.headers =  data.headers || [];
         this.Data.params =  data.params || [];
         this.Data.body =  data.body || [];
       }
   },
   mounted(){
     this.initMode()
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
   },
  watch:{
    init(newValue){
      newValue && this.initMode()
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