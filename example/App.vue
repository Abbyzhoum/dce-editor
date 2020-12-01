<template>
  <div id="app">
    <G6Editor :data="demoData" />
  </div>
</template>

<script>
import G6Editor from '../src/components/G6Editor';
export default {
  name: 'app',
  components:{
    G6Editor
  },
  data () {
    return {
      demoData: {
        nodes: [{ id: 'if101', title:'if101', x: 300, y: 200, shape: 'if-node', pointDesc: [{value: '默认下一个节点'}], clazz: 'if' },
          { id: 'js1234567', label:'js1234567', x: 500, y: 200,shape: 'js-node',  clazz: 'js' }]
      }
    }
  },
  mounted() {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
