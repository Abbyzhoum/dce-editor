import { Marker } from '@antv/g-canvas/lib/shape';

export default function(G6){
  G6.registerBehavior('hoverNodeOrAnchor', {
    getEvents () {
      return {
        'node:mouseenter': 'onNodeEnter',
        'node:mouseleave': 'onNodeLeave',
        'anchor:mouseenter': 'onAnchorEnter',
        'anchor:mousemove': 'onAnchorEnter',
        'anchor:mouseleave': 'onAnchorLeave'
      };
    },
    onNodeEnter (e) {
      // 显示当前节点的锚点
      const clazz = e.item.getModel().clazz;
      if(!this.graph.get('edgeDragging')){
        this.graph.setItemState(e.item, 'show-anchor', true);
      }
    },
    onNodeLeave (e) {
      // 判断item类型， 控制光标的显示、隐藏
      if(!(e.target instanceof Marker) && !this.graph.get('edgeDragging')){  
        this.graph.setItemState(e.item, 'show-anchor', false);
      }
    },
    onAnchorEnter (e){ 
      if(!this.graph.get('edgeDragging')){
        this.graph.setItemState(e.item, 'active-anchor', true);
      } 
    },
    onAnchorLeave(e){
      if(!this.graph.get('edgeDragging')){
        let node = e.item.getContainer().getParent();
        if(node){
          this.graph.setItemState(node.get('item'), 'show-anchor', false);
          this.graph.setItemState(node.get('item'), 'active-anchor', false);
        }
      }

    }
  })
}
