module.exports = {
    baseUrl: '/p',
    apis: [{   
            name: 'login',
            path: '/security/v2/loginByEmail',  // 根据邮箱登录
            method: 'post'   
        },{ 
            name: 'logout',
            path: '/security/v2/logout',
            method: 'delete'   
        },{
            name: 'touch',
            path: '/security/v2/touch/9',
            method: 'put' 
        },{
            name: 'getVectors',
            desc: '根据域名查询dce流程',
            path: '/dce/2.0/vectors?domain={{domain}}',
            method: 'get' 
        },{
            name: 'getVectorsById',
            desc: '根据id查询dce流程',
            path: '/dce/2.0/vectors/{{id}}',
            method: 'get' 
        },{
            name: 'createVector',
            desc: '新建流程',
            path: '/dce/2.0/vectors',
            method: 'post'
        },{
            name:'updateVector',
            desc: '更新流程',
            path: '/dce/2.0/vectors',
            method: 'put'
        },{
            name: 'deleteVector',
            desc: '删除某个流程',
            path: '/dce/2.0/vectors/{{id}}',
            method: 'delete'
        },{
            name: 'queryNumberGroup',
            desc: '查询号码组',
            path: '/oam/2.0/tenant/number/group',
            method: 'get'
        },{
            name: 'queryBlacklists',
            desc: '查询号码组',
            path: '/dnc/v1/blacklists?domain={{domain}}',
            method: 'get'
        }

 ]}