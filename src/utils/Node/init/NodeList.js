import state from '@/state/master';
import { ErrorNotify } from '@/utils/tool';
import { defaultNode } from '@/state/AllDceNodes';

class ToG6{
    constructor(){
       this.graph = state.graph;
       this.nodes = [];    // g6
       this.nodeList = [];  // 转换成功Dce
    //    this.defaultNode = {};
       this.dataCF = {};
    }
    init(nodes){
        this.nodeList = [];
        this.nodes = nodes;
        nodes.forEach(elem => {
           this.handleNode(elem)
        });
    }
    handleNode (item){
        let defaultDceNode = JSON.parse(JSON.stringify(defaultNode));
        let keys = Object.keys(item.data);


        Object.keys(defaultDceNode).forEach(elem=>{
            console.log(elem)
            defaultDceNode[elem] = item[elem]
          })

        if(Object.keys(item.data).length > 0){
            Object.assign(defaultDceNode, item.data)
        }


        this.nodeList.push(defaultDceNode)

        console.log(this.nodeList);
    }
    start(item){
      this.nodeList.push({
        id: 'start',
        type: 'START',
        x: item.x,
        y: item.y,
        nextNode: ''
      })
    }
    exit(item){
      this.nodeList.push({
        id: 'exit',
        type: 'EXIT',
        x: item.x,
        y: item.y
      })
    }
}

export default new ToG6()
