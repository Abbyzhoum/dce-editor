import state from '@/state/master';
import { ErrorNotify } from './tool'

export function getVector(){
    return JSON.parse(JSON.stringify(state.vector))
}

export function hasSameNodeId(id){ 
   if(!id){
      ErrorNotify('节点id不能为空');
      return false
   } else if(!/^[a-zA-Z_]+\d*$/.test(id)){
     ErrorNotify('节点ID须符合： 英文字母开头，可以包含数字');
     return false
   } else if(!stateHasGraph()){
      return 
   }

   let exited = state.graph.find('node', (node)=>{
     return node.get('model').id === id;
   })

   console.log('hasSameNodeId', exited);

  //  let node = state.graph.findById(id);
 
  if (exited) {
    ErrorNotify('当前输入id和已有id重复，请重新输入不同的id')
    return false
  }
 
  return true
}

export function stateHasGraph(){
   if(!state.graph){
     ErrorNotify('当前编辑器为实例化，请刷新后重试！');
     return false
   }

   return true
}

export function updateNode(item, updateModel){
  if(!stateHasGraph()){
    return 
  }

  console.log('updateNode', item, updateModel);

  if(state.graph.executeCommand) {
    state.graph.executeCommand('update', {
      itemId: item.id,
      updateModel
    })
  } else {
    console.info('graph.executeCommand 未挂载成功！')
    state.graph.updateItem(item, updateModel)
  }
}

export function returnG6Node(nodeList){
    let nodes = []
    return nodes
}

export function returnNodeList(graph){
    let nodeList = [];
    return nodeList
}

export function initVector (){
    state.current.code = ''         // dce编号，同租户下不能重复
    state.current.name = ''         // dce流程名称
    state.current.domain = sessionStorage.getItem('dce-domain'),
    state.current.timeout = 2       // 流程超时时间
    state.current.varList = []      // 开始节点中的 定义参数
    state.current.nodeList = []     // dce流程节点集合
}