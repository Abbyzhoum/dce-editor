<template>
  <div>
      <a-modal v-model="visible" 
         title="欢迎登录DCE可视化编辑器" 
         style="top: 20px;" 
         width="45%"
        :keyboard = "false"
        :closable = "false"
        :maskClosable="false"
        :footer="null">
       <template>
       <div>
          <a-form :form="form" class="login-form" @submit="handleSubmit">
            <a-form-item>
                <a-input
                  size="large"
                  v-decorator="[
                  'email',
                  { rules: [{ required: true, message: '请输入邮箱!' }] },
                  ]"
                  placeholder="用户名">
                    <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-input
                    size="large"
                    v-decorator="[
                      'password',
                   { rules: [{ required: true, message: '请输入密码!' }] },
                   ]"
                   type="password"
                   placeholder="密码">
                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
               </a-input>
            </a-form-item>
            <a-form-item>
                <a-button type="primary" size="default" html-type="submit" class="login-form-button"> 登录 </a-button>
            </a-form-item>
          </a-form>
         </div>
       </template>
      </a-modal>

      <G6Editor v-if="!visible" />
  </div>
</template>

<script>
import API from '@/config/http.js';
import { errorHandler } from '@/utils/tool'
import state from '@/state/master';
import G6Editor from '@/components/G6Editor';

export default {
   components:{
       G6Editor
   },
   data(){
       return {
           loading: false,
           form: this.$form.createForm(this, { name: 'coordinated' }),
           visible: false
       }
   },
   methods: {
       login(values){
           API.login.fire({},{
               email: values.email,
               password: values.password
           })
           .then(res=> {
              state.domain = values.email.split('@')[1];
              
              if(res.data.ssid){
                  sessionStorage.setItem('dce-ssid', res.data.ssid)
                  sessionStorage.setItem('dce-domain', state.domain)

                this.$EventBus.$emit('has-login', true)
                this.visible = false
                this.$EventBus.$emit('has-menu')
              }

              this.queryInfo()
           })
           .catch(errorHandler)
       },
       handleSubmit(e){
           e.preventDefault();
           this.form.validateFields((err, values) => {
              if (!err) {
                this.login(values)
              }
           })
       },
       queryInfo(){
           this.getVerctor()
           this.queryNumberGroup()
           this.queryBlacklists()
       },
       getVerctor(){
         API.getVectors.fire({
             domain: state.domain
         })
         .then(res=> state.vectors = res.data || [])
         .catch(errorHandler)
       },
       queryNumberGroup(){
          API.queryNumberGroup.fire({})
          .then(res=> state.numGroup = res.data || [])
          .catch(errorHandler)
       },
       queryBlacklists(){
           API.queryBlacklists.fire({
               domain: state.domain
           })
           .then(res=> {
               state.blacklist = res.data.map(item=> {
                   return {
                       name: item.name,
                       id: item.id
                   }
               })
           })
           .catch(errorHandler)
       },
       initStore(){
        //   sessionStorage.removeItem('dce-ssid')
        //   sessionStorage.removeItem('dce-domain')
       },
       showDialog(){
           this.$EventBus.$on('has-Login',(bool)=>{
              this.visible = !bool
           })
       }
   },
   props:{
    //    visible:{
    //       required: true,
    //       type: Boolean
    //    }
   },
   mounted(){
     this.showDialog()
     this.initStore()
   }
}
</script>

<style>
.login-form .login-form-button{
    width: 100%;
}
.login-form .ant-modal-header{
    padding: 20px 15px;
}
.login-form .ant-modal-title{
    font-size: larger;
}
</style>