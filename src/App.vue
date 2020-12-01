<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <Layout /> -->
    <!-- <Start /> -->

    <!-- <a-button style="float:right;margin-top:6px;margin-right:6px;" @click="()=>{this.$refs['Layout'].graph.saveXML()}">导出XML</a-button> -->


    <!-- <a-button style="float:right;margin-top:6px;margin-right:6px;" @click="()=>{this.$refs['Layout'].graph.saveImg()}">导出图片</a-button>
    <a-button style="float:right;margin-top:6px;margin-right:6px;" @click="()=>{this.modalVisible=true}">查看流程图</a-button>
    <Layout ref="Layout" :height="600" />
    <a-modal title="查看流程图" :visible="modalVisible" width="60%">
        <Layout ref="Layout" :height="300" isView />
    </a-modal> -->
   <Login />
   <Menu />

  </div>
</template>

<script>
import Login from './components/Login.vue';
import API from '@/config/http.js';
import Menu from './views/menu.vue';
// import G6Editor from './components/G6Editor';
import state from './state/master';
import { errorHandler } from './utils/tool';

export default {
  name: 'App',
  components: {
    Login,
    // G6Editor,
    Menu
  },
  data(){
    return {
      touchTimer: 0,
      showGraph: false
    }
  },
  methods:{
    touchHttp(){
      API.touch.fire({},{}).catch(this.touchError)
    },
    touchError(){
       state.isLogin = false
       this.showGraph = false
       this.clearTouchTimer()
       this.$EventBus.$emit('has-Login', false)
    },
    clearTouchTimer(){
      clearInterval(this.touchTimer)
      this.touchTimer = null
    },
    TouchHander (){
      this.clearTouchTimer()
      this.touchTimer = setInterval(this.touchHttp, 3 * 60 * 1000)
    },
    Logined(){
      state.domain = sessionStorage.getItem('dce-domain')
      this.touchHttp()
      this.TouchHander()
      // this.showGraph = true
      this.$EventBus.$emit('has-menu')
    },
    hasCache(){
      // if(sessionStorage.getItem('dce-ssid') && sessionStorage.getItem('dce-domain')){
      //   console.log('ssid 有缓存');
      //   this.Logined()
      // } else {
      //   this.touchError()
      // }

      this.touchError()

      this.$EventBus.$on('has-login',(bool)=>{
        console.log(bool);
        // this.showGraph = bool
        bool && this.TouchHander()
      })
    }
  },
  mounted(){
     this.hasCache()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
