<template>
  <div>
   <a-form-model v-bind="layout" ref="ifForm" :model="ifForm" :rules="rules"  >
    <a-form-model-item label="节点ID" prop="id" >
       <a-input v-model="ifForm.id" type="text" autocomplete="off"  placeholder="请输入节点ID"  >
        <a-tooltip slot="suffix" title="规则：必须是英文字母开头，可以包含数字，不能和已有节点id重复">
          <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
        </a-tooltip>
       </a-input>
    </a-form-model-item>
    <a-form-model-item label="描述" >
      <a-input v-model="ifForm.detail" type="text" autocomplete="off" />
    </a-form-model-item>

    <a-form-model-item label="条件设置">
      <a-button type="dashed" style="" @click="addCompare">
        <a-icon type="plus" /> 增加条件
      </a-button>
    </a-form-model-item>
    <!-- prop="pass" -->
    <a-form-model-item 
       :wrapper-col="{ span: 24 }"
       v-for="(item, index) in ifForm.compare"
       :key="index">
       <a-input-group compact>
        <a-input style="width: 30%;" placeholder="左边请输入" v-model="item.left"  > </a-input>
        <a-select default-value="" v-model="item.operator" style="width: 80px" >
             <a-select-option value="" disabled> 未选择 </a-select-option>
            <a-select-option v-for="elem in compareList" :key="elem.value" :value="elem.value"> {{elem.name}} </a-select-option>
        </a-select>
        <a-input style="width: 35%;" placeholder="右边请输入" v-model="item.right" ></a-input>
        <a-icon
         v-if="ifForm.compare.length > 1"
         class="dynamic-delete-button"
         type="minus-circle-o"
         :disabled="ifForm.compare.length === 1"
         @click="removeCompare(index)"
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
import { Compares } from '@/config/baseInfo';
import { hasSameNodeId, updateNode } from '@/utils/computed';
import { ErrorNotify } from '@/utils/tool';

export default {
   name: 'if', // 条件节点
   data(){
    return {
       rules: {
          id: rules.required
       },
       ifForm:{
           id: '',
           detail: '',
           compare: []
       },

       pointDesc: [],

       compareList: Compares,
       layout:{
         labelCol: { span: 8 },
         wrapperCol: { span: 12 }
       }
    }
   },
   methods:{
       submit(e){
         e.pre
         this.$refs['ifForm'].validate(valid => {
          if (valid && this.checkCompare()) {
              this.update()
          }
        });
       },
       checkCompare(){
         var notExisted =  this.ifForm.compare.find(item=>{
            return !item.left || !item.right
        })

        if (notExisted) {
          ErrorNotify('条件各项不能为空！')
          return false
        } else {
          return true
        }
       },
       update(){
        let updateModel = {
            detail: this.ifForm.detail,
            conditionList: this.ifForm.compare
        };

        console.log('if-node-updateModel: ', updateModel);

        if(this.mode.id !== this.ifForm.id){
           let pass = hasSameNodeId(this.ifForm.id)
           console.log(pass);

           if(!pass){
            return 
           }
           updateModel.id = this.ifForm.id
           updateModel.title = this.ifForm.id
        }

        //  this.$EventBus.$emit('closeDetailPanel', updateModel);
        this.$emit('update-item', updateModel)
       },
       addCompare(){
         this.ifForm.compare.push({
             left: '',
             operator: '',
             right: ''
           })
       },
       removeCompare(index){
           this.ifForm.compare.splice(index, 1)
       },
       initModel(){
         console.log('if- initModel', this.mode);
          this.ifForm.id = this.mode.id;
          this.ifForm.detail = this.mode.detail || '';
          this.ifForm.compare = this.mode.conditionList || [];
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
   },
   mounted(){
     this.initModel()
   },
   watch:{
    init(newValue){
      if(newValue){ 
        this.initModel()
      }
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