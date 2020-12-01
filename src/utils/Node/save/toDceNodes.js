import state from '@/state/master';
import { ErrorNotify } from '@/utils/tool';
import { defaultNode } from '@/state/AllDceNodes';
import { NodeType } from '../../clazz';

class ToG6{
    constructor(){
       this.graph = state.graph;
       this.nodes = [];      // g6
       this.edges = [];
       this.nodeList = [];   // 转换成功Dce
    //    this.defaultNode = {};
       this.dataCF = {};

       this.one= [];
       this.two = [];
       this.special = [];
    }
    init(data){
        this.nodeList = [];
        this.nodes = data.nodes;
        this.edges = data.edges;

        this.nodes.forEach(elem => {
           this.handleNode(elem)
        });
    }
    handleNode (item){
        let defaultDceNode = JSON.parse(JSON.stringify(defaultNode));
        item.type = NodeType(item.clazz)

        Object.keys(defaultDceNode).forEach(elem=>{
            console.log(elem)
            defaultDceNode[elem] = item[elem]
          })

        if(item.data && Object.keys(item.data).length > 0){
            Object.assign(defaultDceNode, item.data)
        }

        this.findNextNode(defaultDceNode)

        console.log('defaultDceNode', defaultDceNode);
        return 

        this.nodeList.push(defaultDceNode)

        console.log(this.nodeList);
    }

    findNextNode(elem){
        var one = ['START', 'ANI', 'PREFIX', 'DNIS', 'JS_SCRIPT', 'DO_NOT_CALL', 'CALL'];
        var two = ['REMOVE_DUPLICATE','DNC', 'DATA'];
        
       if(one.includes(elem.type)){
         this.findOneEndPointNextNode(elem)
       } else if(two.includes(elem.type)){
         this.findTwoEndPointNextNode(elem)
       } else if(elem.type === 'CONDITION'){
         this.initIfNextNode(elem)
       }
    }

    findOneEndPointNextNode(elem){
        var nextNode = this.edges.find(item=>{
            return item.source === elem.id
        }) 

        if(nextNode){
            elem.nextNode = nextNode.target
        }
    }
    findTwoEndPointNextNode(elem){
       var nextNode = this.edges.filter(item=>{
           return item.source === elem.id
       }) 

       console.log('findTwoEndPointNextNode: ',nextNode);

      if(nextNode.length > 0){
          nextNode.forEach(element => {
              element.sourceAnchor === 1 ? elem.passNode = element.target : ''
              element.sourceAnchor === 2 ? elem.notPassNode = element.target : ''
          });
      }
    }
    initIfNextNode(elem){
        var nextNode = this.edges.filter(item=>{
            return item.source === elem.id
        }) 

        if(nextNode > 0){
            
        }


        // elem.conditionList.forEach((item, index) => {
            
        // })
    }
}

export default new ToG6()
