export function getNodeInfo(nodeType) {
    switch (nodeType) {
      case 'start': return 'start-node';
      case 'exit': return 'exit-node';
      case 'js': return 'js-node';
      case 'prefix': return 'prefix-node';   // 中继节点,前缀
      case 'ani': return 'ani-node';   // 外显号码选择节点
      case 'dnis': return 'dnis-node';    // 被叫号码改写节点
      case 'dnc': return 'dnc-node';  // 黑名单
      case 'ranking': return 'ranking-node';    // 排重节点
      case 'data': return 'data-node';
      case 'if': return 'if-node';   // 条件
      case 'call': return 'call-node';  // 外呼节点
      case 'noCall': return 'noCall-node';  // 禁止外呼节点
    }
  }

  export function getDetailTitle(clazz){
    switch (clazz) {
      case 'start': return '流程开始节点';
      case 'exit': return '结束节点';
      case 'call': return '外呼节点';
      case 'noCall': return '禁止外呼节点';  
      case 'ani': return '外显号码选择节点';  
      case 'prefix': return '前缀改写节点';  
      case 'dnis': return '被叫号码改写节点';   
      case 'dnc': return '黑名单节点';
      case 'ranking': return '排重节点';   
      case 'data': return '接口调用节点';
      case 'if': return '条件节点';
      case 'js': return 'JS节点';
    }
  }

export function NodeType(clazz){
   switch (clazz) {
      case 'start': return 'START';
      case 'exit': return 'EXIT';
      case 'call': return 'CALL';
      case 'noCall': return 'DO_NOT_CALL';  
      case 'ani': return 'ANI';  
      case 'dnis': return 'DNIS'; 
      case 'prefix': return 'PREFIX';  
      case 'dnc': return 'DNC';
      case 'ranking': return 'REMOVE_DUPLICATE';   
      case 'data': return 'DATA';
      case 'if': return 'CONDITION';
      case 'js': return 'JS_SCRIPT';
  }
}

export function getG6(dceNode){
  switch (clazz) {
    case 'start': return 'START';
    case 'exit': return 'EXIT';
    case 'call': return 'CALL';
    case 'noCall': return 'DO_NOT_CALL';  
    case 'ani': return 'ANI';  
    case 'dnis': return 'DNIS'; 
    case 'prefix': return 'PREFIX';  
    case 'dnc': return 'DNC';
    case 'ranking': return 'REMOVE_DUPLICATE';   
    case 'data': return 'DATA';
    case 'if': return 'CONDITION';
    case 'js': return 'JS_SCRIPT';
}
}