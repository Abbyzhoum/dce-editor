import { deepMix, each } from '@antv/util';

class AddItemPanel {
  constructor(cfgs) {
    this._cfgs = deepMix(this.getDefaultCfg(), cfgs);
  }
  getDefaultCfg() {
    return { container: null };
  }

  get(key) {
    return this._cfgs[key];
  }
  set(key, val) {
    this._cfgs[key] = val;
  }

  initPlugin(graph) {
    const parentNode = this.get('container');

    if(!parentNode){
      return
    }
    
    // const ghost = createDom('<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"'+' style="opacity:0"/>');
    const children = parentNode.querySelectorAll('div.ant-list > .ant-spin-nested-loading > .ant-spin-container > .ant-list-item > img[data-item]');
    each(children,(child,i)=>{
      const addModel = (new Function("return " + child.getAttribute('data-item')))();

      switch (addModel.clazz) {
        case 'dnc':  addModel.pointDesc = [{value: "属于黑名单"},{value: "不属于黑名单"}];
         break;
        case 'ranking':  addModel.pointDesc = [{value: "通过限拨"},{value: "不通过限拨"}];
         break;
        case 'data':  addModel.pointDesc = [{value: "接口调用成功"},{value: "接口调用不成功"}];
         break;
        case 'if':  addModel.pointDesc = [{value: "默认下一个节点"}];
         break;
      }

      child.addEventListener('dragstart', e => {
        graph.set('addNodeDragging',true);
        graph.set('addModel',addModel);
      });
      child.addEventListener('dragend', e => {
        graph.emit('canvas:mouseup',e);
        graph.set('addNodeDragging',false);
        // graph.set('addModel',null);
      });
    })
  }

  destroy() {
    this.get('canvas').destroy();
    const container = this.get('container');
    container.parentNode.removeChild(container);
  }
}

export default AddItemPanel;
