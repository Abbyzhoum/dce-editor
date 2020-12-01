export default function(G6){
  G6.registerBehavior('clickSelected', {
    getDefaultCfg() {
      return {
        multiple: false,
      }
    },
    getEvents() {
      return {
        'node:click': 'onNodeClick',
        'node:dblclick': 'onDBNodeClick',
        'edge:click': 'onEdgeClick',
        'edge:mouseover': 'onEdgeMouseOver',
        'edge:mouseleave': 'onEdgeMouseLeave',
        'canvas:click': 'onCanvasClick',
        'node:mouseover': 'onNodeMouseOver',
      }
    },
    onNodeClick(e){
      this._clearSelected();

      this.graph.setItemState(e.item, 'selected', true);
      let selectedItems = this.graph.get('selectedItems');

      if(!selectedItems)
        selectedItems = [];
      selectedItems = [e.item.get('id')];
      this.graph.set('selectedItems',selectedItems);

      this.graph.emit('afteritemselected',selectedItems);
    },
    onDBNodeClick(e){ // 双击才显示抽屉
      this.graph.emit('afterItemDbClick');
    },
    onEdgeClick(e){
      this._clearSelected();

      this.graph.setItemState(e.item, 'selected', true);
      let selectedItems = this.graph.get('selectedItems');

      if(!selectedItems)
        selectedItems = [];
      selectedItems = [e.item.get('id')];
      this.graph.set('selectedItems',selectedItems);
    },
    onNodeMouseOver(e){
      if(this.graph.getCurrentMode() === 'edit')
        this.graph.setItemState(e.item, 'hover', true);
      else
        this.graph.setItemState(e.item, 'hover', false);
    },
    onEdgeMouseOver(e){
      if(this.graph.getCurrentMode() === 'edit' && !e.item.hasState('selected'))
        this.graph.setItemState(e.item, 'hover', true);
    },
    onEdgeMouseLeave(e){
      if(this.graph.getCurrentMode() === 'edit' && !e.item.hasState('selected'))
        this.graph.setItemState(e.item, 'hover', false);
    },
    onCanvasClick(){
      this._clearSelected();
      this.graph.emit('afteritemselected',[]);
    },
    _clearSelected(){
      let selected = this.graph.findAllByState('node', 'selected');
      selected.forEach(node => {
        this.graph.setItemState(node, 'selected', false);
      });
      selected = this.graph.findAllByState('edge', 'selected');
      selected.forEach(edge => {
        this.graph.setItemState(edge, 'selected', false);
      });

      this.graph.set('selectedItems', []);
    }
  });
}















// export default function(G6){
//   G6.registerBehavior('select-node', {
//     getDefaultCfg () {
//       return {
//            multiple: false, // 多选
//       };
//      },
//      getEvents(){
//        return {
//          'node:click':      'onNodeClick',
//          'node:dblclick':   'ondblClick',
//          'canvas:click':    'onCanvasClick',
//          'node:mouseenter': 'onNodeMouseEnter',
//          'node:mousemove':  'onNodeMouseMove',
//          'node:mouseleave': 'onNodeMouseLeave'  
//        }
//      },
//      onNodeClick(e){
//          this._clearSelected()   
 
//          e.item.toFront() // 将元素的层级设置到最上层，即当有元素重叠时，将元素置于顶层。
//          e.item.setState('nodeState', 'selected'); // 设置状态为已选中
//          this.graph.emit('after-node-selected', e);  // // 将点击事件发送给 graph 实例
//      },
//      ondblClick(e){  
//          this._clearSelected();
//          e.item.toFront(); // 将元素的层级设置到最上层，即当有元素重叠时，将元素置于顶层。
//          e.item.setState('nodeState', 'selected'); // 获取被点击的节点元素对象, 设置当前节点的 click 状态为 true 
//          this.graph.emit('after-node-dblclick', e);  //  // 将点击事件发送给 graph 实例
//      },
//      onCanvasClick(e){
//          this._clearSelected();
//          this.graph.emit('on-canvas-click', e);  
//      },
//      onNodeMouseEnter(e){ // hover
//          if (!e.item.hasState('nodeState:selected')) {
//              e.item.setState('nodeState', 'hover');
//          }
//          this.graph.emit('on-node-mouseenter', e);
//      },  
//      onNodeMouseMove(e){
//          this.graph.emit('on-node-mousemove', e);
//      },
//      onNodeMouseLeave(e){ // 移出 node
//          if (!e.item.hasState('nodeState:selected')) {   // hasState 判断当前元素是否存在某种状态
//              e.item.clearStates('nodeState:hover');
//            }
//          this.graph.emit('on-node-mouseleave', e);
//      },
//      _clearSelected(){ // 清空已选
//          const selectedNodes = this.graph.findAllByState('node', 'nodeState:selected');
 
//          selectedNodes.forEach(node => {
//            node.clearStates(['nodeState:selected', 'nodeState:hover']);
//          });
 
//         this.graph.emit('after-node-selected'); 
//      }
//   })
// }