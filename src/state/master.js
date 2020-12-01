let state = { // 数据存储
    vectors: [],
    domain: '',
    isLogin: false,
    current: {
        code: '',       // dce编号，同租户下不能重复
        name: '',       // dce流程名称
        domain: '',
        timeout: 2,     // 流程超时时间
        varList: [],    // 开始节点中的 定义参数
        nodeList: []    // dce流程节点集合
    },
    edges: [],          // G6 中的连线集合
    nodes: [],           // G6 中的节点集合
    graph: {},
    numGroup: [],       // 号码组数据
    blacklist: []       // 黑名单列表
}

export default state;