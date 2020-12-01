
module.exports = {
   port: 8080,
   proxyTable: {
     '/p/security': {
       target: 'http://192.168.40.174:32025', // 测试环境
       changeOrigin: true,
       pathRewrite: {
         '^/p/security': '/security'
       }
     },
     '/p/dce': {
       target: 'http://192.168.40.174:31066', // 测试环境
       changeOrigin: true,
       pathRewrite: {
         '^/p/dce': '/dce'
       }
     },
     '/p/oam': {
      target: 'http://192.168.40.174:32024', // 测试环境
      changeOrigin: true,
      pathRewrite: {
        '^/p/oam': '/oam'
      }
    },
    '/p/dnc': {
      target: 'http://192.168.40.174:32063', // 测试环境
      changeOrigin: true,
      pathRewrite: {
        '^/p/dnc': '/dnc'
      }
    }
   }
}