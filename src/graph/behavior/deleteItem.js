export default function(G6){
    G6.registerBehavior('deleteItem', {
      getEvents() {
        return {
          'keydown': 'onKeydown',
          'canvas:mouseleave': 'onCanvasLeave',
          'canvas:mouseenter': 'onCanvasFocus',
        }
      },
      onKeydown(e){
        const items = this.graph.get('selectedItems');
        const focus = this.graph.get('focusGraphWrapper');

        if(e.keyCode === 8 && items && items.length > 0 && focus ){
          const item = this.graph.findById(items[0]);
          const nodeModel = item.getModel();

           if(nodeModel.clazz !== 'start' && nodeModel.clazz !== 'exit'){   // 开始和结束节点不可删除
              if(this.graph.executeCommand) {
                this.graph.executeCommand('delete', {});
              }else{
                this.graph.remove(items[0]);
              }
              this.graph.set('selectedItems',[]);
              this.graph.emit('afteritemselected',[]);

           }
        }
      },
      onCanvasLeave(e){
        this.graph.set('focusGraphWrapper',false);
      },
      onCanvasFocus(){
        this.graph.set('focusGraphWrapper',true);
      }
    });
  }
  