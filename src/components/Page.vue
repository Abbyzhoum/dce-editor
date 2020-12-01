<template>
  <div class="page">
    <div :id="pageId" class="graph-container" ></div>
  </div>
</template>


<script>
// import G6 from "@antv/g6";
import G6 from '@antv/g6/lib';
import initBehaviors from '@/graph/behavior';
import registerShape from '@/graph/shape';
import Command from '@/graph/plugins/command';
import state from '@/state/master';

 registerShape(G6)
 initBehaviors(G6)
export default {
  data() {
    return {
      pageId: "graph-container",
      graph: null
    };
  },
  props: {
    height: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    // this.$EventBus.$on('has-menu',()=>{
    //   this.init();
    // })
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {

      let plugins = [];
      let grid = new G6.Grid();
      let cmdPlugin  = new Command();

      const height =  this.height - 60
      const width =  this.width - 110

      this.graph = new G6.Graph({
        container: "graph-container",
        height: height,
        width: width,
        plugins: [cmdPlugin, grid],
        modes: {
          default: [
            // 'drag-canvas',
          ],
          edit: [ // 支持的 behavior
            // 'drag-canvas' ,
            "dragNode",
            "clickSelected",
            'hoverNodeOrAnchor',
            'dragPanelItemAddNode', 
            'dragEdge',
            'deleteItem'
          ]
        },
        defaultEdge: {
          shape: 'flow-polyline-round',
        }
        // layout: {                // Object，可选，布局的方法及其配置项，默认为 random 布局。
        //     type: 'dagre',
        //     rankdir: 'LR',
        //     nodesep: '100',
        //     ranksep: '100',
        //     controlPoints: true
        // }
      });

      this.graph.setMode('edit');    // 设置 G6 的行为模式为 edit
      // const { editor } = this.$parent;
      
      this.$EventBus.$emit("initGraph", { graph: this.graph });

      state.graph = this.graph;

      this.renderPage();
    },
    renderPage() {
      let data = this.data;
      if (data) {
        this.graph.read(data);
      }
    }
  }
};
</script>

<style scoped>
.page{
  margin-left: 110px;
  margin-right: 50px;
}
</style>