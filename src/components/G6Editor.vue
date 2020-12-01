<template>
  <div :style="{width:width}">
    <div class="editor" >
      <!-- <context-menu /> -->
     
      <Toolbar />
      <div class="bottom-container">
        <ItemPanel :height="height" />
        <DetailPanel />
        <page :height="height" :width="width"  :data="data" />
      </div>
    </div>
  </div>
</template>

<script>
import Toolbar from "./Toolbar";
import ItemPanel from "./ItemPanel";
import DetailPanel from "./DetailPanel";
import Page from "./Page";
import command from "@/graph/plugins/command";
import i18n from '@/config/locales';

import AddItemPanel from '@/graph/plugins/addItemPanel';

export default {
  name: "G6Editor",
  components: {
    Toolbar,
    ItemPanel,
    DetailPanel,
    Page
  },
  provide() {
    return {
       i18n: i18n
    }
  },
  props: {
    height: {
      type: Number,
      default: document.documentElement.clientHeight
    },
    width: {
      type: Number,
      default: document.documentElement.clientWidth
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      editor: {},
      command: null
    };
  },
  methods: {
    showMenu (){
      this.$EventBus.$emit('has-menu')
    },
    save(){
      // let data = this.
    }
  }
};
</script>

<style scoped>
.editor {
  position: relative;
  width: 100%;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
.bottom-container {
  position: relative;
}
</style>