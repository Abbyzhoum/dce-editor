import editorStyle from "@/config/defaultStyle";
import { getNodeInfo } from '@/utils/clazz';
import { Modal, Input }  from 'ant-design-vue';
import { hasSameNodeId } from '@/utils/computed';

export default function(G6){
  G6.registerBehavior('dragPanelItemAddNode', {
    getDefaultCfg() {
      return {

      };
    },
    getEvents() {
      return {
        // 'canvas:mousemove': 'onMouseMove',
        'canvas:mouseup': 'onMouseUp'
      }
    },
    onMouseMove(e){
      if(this.graph.get('addNodeDragging')){
        let delegateShape = this.graph.get('addDelegateShape');  
        const addModel = this.graph.get('addModel');
        const width = parseInt(addModel.size.split('*')[0]);
        const height = parseInt(addModel.size.split('*')[1]);
        const point = this.graph.getPointByClient(e.x,e.y);
        const x = point.x;
        const y = point.y;
        if (!delegateShape) {   //  拖拽时的蓝色虚线小方框
          console.log('delegateShape 不存在');
          const parent = this.graph.get('group');
          delegateShape = parent.addShape('rect', {
            attrs: {
              width,
              height,
              x: x - width / 2,
              y: y - height / 2,
              ...editorStyle.nodeDelegationStyle,
            }
          });

          console.log(delegateShape);
          // delegateShape.set('capture', false);
          this.graph.set('addDelegateShape', delegateShape);
        }
        delegateShape.attr({ x: x - width / 2, y: y - height / 2 });
        this.graph.paint();
        this.graph.emit('afternodedrag',delegateShape);
      }
    },
    changeInput(e){
      console.log('changeInput', e);
    },
    onMouseUp(e){   //  鼠标按钮被释放弹起时触发， 画布内 鼠标点击时会触发
        const p = this.graph.getPointByClient(e.clientX, e.clientY);

    if(this.graph.get('addNodeDragging')){  // 只有在  set addNodeDragging 为 true时，才会添加节点
        // Modal.confirm({
        //   title: '请输入节点ID',
        //   closable: false,
        //   content: h=> (<div> 
        //     <Input id="writeNodeID"  onblur={this.test.bind(this)} placeholder="" autocomplete="off" allow-clear></Input>
        //   </div>),
        //   onOk:()=> {
        //     return new Promise((resolve, reject) => {
        //       let nodeID = document.getElementById('writeNodeID').value;

        //       console.log(nodeID);

        //       if(!hasSameNodeId(nodeID)){
        //         return reject()
        //       }

        //       this._addNode(p, nodeID)
        //       resolve()
        //     })

        //   },
        //   okText: '确认',
        //   cancelText:'取消',
        //   onCancel() {}
        // });

        this._addNode(p)
      }

        
    },
    test(){
      console.log(this);
      console.log('click me');

      // this._addNode()
    },
    _clearDelegate(){
      const delegateShape = this.graph.get('addDelegateShape');
      if (delegateShape) {
        delegateShape.remove();
        this.graph.set('addDelegateShape', null);
        this.graph.paint();
      }
      this.graph.emit('afternodedragend');
    },
    _addNode(p){
      // if(this.graph.get('addNodeDragging')){  // 只有在  set addNodeDragging 为 true时，才会添加节点
        const addModel = this.graph.get('addModel');

        console.log(addModel);
        const { clazz = 'if' } = addModel;

        //type、shape属性同时存在即兼容之前版本的数据，又兼容g6的升级
        addModel.type = getNodeInfo(clazz);
        addModel.shape = getNodeInfo(clazz);
        addModel.data = {};

        const timestamp = new Date().getTime();
        const id = clazz + timestamp;

        var twoPoint = ['ranking','dnc','if', 'data'];
        // const id = nodeID;
        if(!twoPoint.includes(addModel.clazz)){
          addModel.label = id;
        } else {
          addModel.title = id
        }

        const x = p.x;
        const y = p.y;

        if (this.graph.executeCommand) {
          this.graph.executeCommand('add', {
            type: 'node',
            addModel: {
              ...addModel,
              x: x,
              y: y,
              id: id,
            },

           
          });
        } else {
         this.graph.add('node', {
          ...addModel,
          x: x,
          y: y,
          id: id,
        })
        }

        this.graph.set('addModel',null);

      // }
    }
  });
}
