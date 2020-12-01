import editorStyle from "@/config/defaultStyle";

export default function (G6) {
  G6.registerBehavior('dragEdge', {   // 可以在连线的时候，在cfg中 设置多出口 的对应关系
    getDefaultCfg() {
      return {
        updateEdge: true,
        delegate: true,
        delegateStyle: {},
        dragEdge: false,
      };
    },
    getEvents() {
      return {
        'anchor:dragstart': 'onDragStart',
        'anchor:drag': 'onDrag',
        'anchor:dragend': 'onDragEnd',
        'anchor:dragenter': 'onDragEnter',
        'anchor:dragleave': 'onDragLeave',
      };
    },
    onDragEnter(e) {
       console.log('anchor:onDragEnter', this.origin);
      if (!this.origin) {
        return;
      }
      if (!this.sameNode(e)) {
        e.item.setHotspotActived(true);
        this.origin.targetNode = e.target.getParent().getParent().get('item');
        this.origin.targetAnchor = e.item.get('index');
      }
    },
    onDragLeave(e) {
      if (!this.origin) {
        return;
      }
      if (!this.sameNode(e)) {
        e.item.setHotspotActived(false);
        this.origin.targetNode = null;
        this.origin.targetAnchor = null;
      }
    },
    onDragStart(e) {
      const node = e.target.getParent().getParent().get('item');   // group
      const anchorIndex = e.item.get('index');
      const point = node.getAnchorPoints()[anchorIndex];

      this.target = e.item;  // anchor

      this.origin = {
        x: point.x,
        y: point.y,
        sourceNode: node,
        sourceAnchor: anchorIndex
      };

      console.log('point', node.getAnchorPoints());
      this.dragEdgeBeforeShowAnchor(e);

      this.graph.set('edgeDragging', true);
    },
    onDrag(e) {
      if (!this.origin) {
        return;
      }
      this._updateEdge(this.target, e);
    },
    onDragEnd(e) {
      if (!this.origin) {
        return;
      }
      const delegateShape = e.item.get('edgeDelegate');
      if (delegateShape) {
        delegateShape.remove();
        this.target.set('edgeDelegate', null);
      }
      this._updateEdge(this.target, e, true);
      this.graph.setItemState(this.origin.sourceNode, 'show-anchor', false);
      this.target = null;
      this.origin = null;
      this.graph.set('edgeDragging', false);
    },
    sameNode(e) {
      return e.target.getParent() && e.target.getParent().getParent().get('item').get('id') === this.origin.sourceNode.get('id')
    },
    isIfNode(e){  // if 节点有多个出口，需要判断连线的单一性

    },
    dragEdgeBeforeShowAnchor(e) {
      const sourceGroupId = this.origin.sourceNode.getModel().groupId;
      var nodeModel = this.origin.sourceNode.getModel();

      let outEdge= this.origin.sourceNode.getOutEdges();
      const onePoint = ['if', 'CALL', 'DO_NOT_CALL', 'ANI', 'PREFIX','DNIS', 'JS_SCRIPT'];
      var twoPoint = ['DATA', 'DNC', 'REMOVE_DUPLICATE'] 

      if(outEdge.length !== 0){
         let existed = outEdge.find(item=>{
            return this.origin.sourceAnchor === item._cfg.sourceAnchorIndex
          })

          if(existed){
            return;
          }   
      }

      this.graph.getNodes().forEach(node => {
        if (node.getModel().clazz === 'start')  // start 只能从出口点连接
          return;
        const targetGroupId = node.getModel().groupId;
        if (!sourceGroupId && targetGroupId || sourceGroupId && !targetGroupId || sourceGroupId !== targetGroupId)
          return;
        const group = node.getContainer();

        group.showAnchor();
        group.anchorShapes.forEach(a => a.get('item').showHotpot())
      });
    },
    _updateEdge(item, e, force) {
      const x = e.x;
      const y = e.y;
      if (this.delegate && !force) {
        this._updateEdgeDelegate(item, x, y);
        return;
      }

      this._addEdge(e);
      this._clearAllAnchor();
      this.graph.paint();
    },
    _updateEdgeDelegate(item, x, y) {
      const self = this;
      let edgeShape = item.get('edgeDelegate');
      if (!edgeShape) {
        const parent = self.graph.get('group');
        edgeShape = parent.addShape('line', {
          attrs: {
            x1: this.origin.x,
            y1: this.origin.y,
            x2: x,
            y2: y,
            ...editorStyle.edgeDelegationStyle,
          }
        });
        edgeShape.set('capture', false);
        item.set('edgeDelegate', edgeShape);
      }
      edgeShape.attr({ x2: x, y2: y });
      this.graph.paint();
    },
    _clearAllAnchor() {
      this.graph.getNodes().forEach(node => {
        const group = node.getContainer();
        group.clearAnchor();
      });
    },
    _addEdge() {
      if (this.origin.targetNode) {
        const timestamp = new Date().getTime();
        console.log('连接线的sourceNode，get-Id 与 get-Model-Id 区别:', this.origin.sourceNode.get('id'), this.origin.sourceNode.get('model').id);
        const addModel = {
          // id: 'flow' + timestamp,
          clazz: 'flow',
          // source: this.origin.sourceNode.get('id'),
          source: this.origin.sourceNode.get('id'),
          target: this.origin.targetNode.get('id'),
          sourceAnchor: this.origin.sourceAnchor,
          targetAnchor: this.origin.targetAnchor,
          sourceId: this.origin.sourceNode.get('model').id,
          targetId: this.origin.targetNode.get('model').id
        };
        if (this.graph.executeCommand) {
          this.graph.executeCommand('add', {
            type: 'edge',
            addModel: addModel
          });
        } else {
          this.graph.add('edge', addModel);
        }
      }
    }
  });
}
