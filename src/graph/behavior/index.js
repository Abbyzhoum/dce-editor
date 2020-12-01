
import clickSelected from './clickSelected'
import dragPanelItemAddNode from './dragPanelItemAddNode'
import dragNode from './dragNode'
import deleteItem from './deleteItem'
import hoverNodeOrAnchor from './hoverNodeOrAnchor'
import dragEdge from './dragEdge'
// import hoverAnchorActived from './hoverAnchorActived'
// import hoverNodeActived from './hoverNodeActived'

// import keyboard from './keyboard'
// import addMenu from './add-menu'

const behavior = {
    // 'hover-node': hoverNode,
    // 'clickSelected': clickSelected,
    // 'active-node': activeNode,

    // 'add-edge': addEdge,

    // 'dragPanelItemAddNode': dragPanelItemAddNode
    // 'drag-item': dragItem,
    // 'hover-edge': hoverEdge,
    // 'keyboard':keyboard,
    // 'add-menu':addMenu
}

export default function  (G6){
    dragPanelItemAddNode(G6)
    clickSelected(G6)
    dragNode(G6)
    hoverNodeOrAnchor(G6)
    deleteItem(G6)
    dragEdge(G6)
    // hoverAnchorActived(G6)
    // hoverNodeActived(G6)
}
    

// export function initBehaviors(G6) {
//     for (let key in behavior) {
//         G6.registerBehavior(key, behavior[key])
//     }
// }