<template>
  <div>
    <a-form-model v-bind="layout" ref="jsForm" :model="jsForm" :rules="rules" >
      <a-form-model-item label="节点ID" prop="id" >
       <a-input v-model="jsForm.id" type="text" autocomplete="off"  placeholder="请输入节点ID"  >
        <a-tooltip slot="suffix" title="规则：必须是英文字母开头，可以包含数字，不能和已有节点id重复">
          <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
        </a-tooltip>
       </a-input>
      </a-form-model-item>
      <a-form-model-item label="描述">
        <a-input v-model="jsForm.detail" placeholder="请输入描述" />
      </a-form-model-item>

      <a-form-model-item label="定义变量">
        <a-button type="dashed" style="" @click="addParams">
          <a-icon type="plus" /> 增加变量
        </a-button>
      </a-form-model-item>
      <a-form-model-item 
         :wrapper-col="{ span: 24 }"
         v-for="(item, index) in jsForm.params"
        :key="index">
         <a-input-group compact>
          <a-input style="width: 30%;" placeholder="输入变量名" v-model="item.name"  > </a-input>
          <a-select  v-model="item.type" default-value="String" style="width: 80px">
              <a-select-option v-for="elem in VarTypes" :key="elem.type" :value="elem.type"> {{elem.type}} </a-select-option>
          </a-select>
          <a-input style="width: 35%;" placeholder="请输入变量值" v-model="item.value" ></a-input>
          <a-icon
           v-if="jsForm.params.length > 1"
           class="dynamic-delete-button"
           type="minus-circle-o"
           :disabled="jsForm.params.length === 1"
           @click="removeParams(index)"
         />
        </a-input-group>
      </a-form-model-item>
    </a-form-model>

     <div >
        <textarea ref="textarea" class="jsMode-editor" v-model="script"></textarea>
    </div>

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
import { VarType } from '@/config/baseInfo';


// 引入codemirror 语法框 ========================
 import CodeMirror from 'codemirror/lib/codemirror';
 import "codemirror/lib/codemirror.css";
 import "codemirror/theme/ambiance.css";

import 'codemirror/mode/javascript/javascript.js';
 import 'codemirror/mode/vue/vue.js';

export default {
  name: 'ani',
  data(){
    return {
      layout:{
         labelCol: { span: 8 },
         wrapperCol: { span: 12 }
       },

      jsForm:{
        id: '',
        detail: '',
        params: []
      },
      rules:{
        id: rules.required
      },
      VarTypes: VarType,
      // 默认的语法类型

      options: {
        mode: { name: "javascript", globalVars: true },
        // 缩进格式
        tabSize: 1,
        // 主题，对应主题库 JS 需要提前引入
        theme: 'ambiance',
        // 显示行号
        lineNumbers: false,
        line: true,
        lineWrapping: true,  // 自动换行
        styleActiveLine: true, // 当前行背景高亮
        smartIndent: true,
        indentUnit: 4,  // 缩进单位为4
        extraKeys: { Ctrl: "autocomplete" }, //避免热键冲突
        styleActiveLine: true,
        matchBrackets:true, // 匹配结束符号，比如"]、}"
        foldGutter:true, // 匹配结束符号，比如"]、}"
        indentWithTabs:true // 使用制表符进行智能缩进
      },
      script: '',
      coder: {}
    }
  },
  methods:{
      submit(){
        this.$refs['jsForm'].validate(valid => {
          if (valid) {
            this.update() 
          }
        });  
      },
      update(){
        let updateModel = {
             data: {
               detail: this.jsForm.detail,
               params: this.jsForm.params,
               script: this.script
             }
        };

        if(this.nodeModel.id !== this.jsForm.id){
           let pass = hasSameNodeId(this.jsForm.id)

           if(!pass){
            return 
           }
           updateModel.id = this.jsForm.id
           updateModel.label = this.jsForm.id
        }

        this.$emit('update-item', updateModel )
        //  updateNode(this.nodeModel, updateModel);
        //  this.$EventBus.$emit('closeDetailPanel', updateModel);
      },
      addParams(){
        this.jsForm.params.push({
           name: '',
           type: 'String',
           value: ''
         })
      },
      removeParams(index){
        this.jsForm.params.splice(index, 1)
      },
      initModel(){
         let data =  this.nodeModel.data 
         console.log('jsForm', data);

         this.jsForm.id = this.nodeModel.id;
         this.jsForm.detail = data.detail || '';
         this.jsForm.params = data.params || [];
         this.script = data.script || '';      
      },
      _initialize(){
        // 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
        this.coder = CodeMirror.fromTextArea(this.$refs.textarea, this.options)

        // 编辑器赋值
        this.coder.setValue(this.script)

        // // 支持双向绑定
        this.coder.on('change', (coder) => {
          this.script = coder.getValue()
        })
      }
  },
  mounted(){
    this.initModel()
    this._initialize()
  },
  props:{
     nodeModel:{
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
.jsMode-editor{
    height: 400px;
}
</style>