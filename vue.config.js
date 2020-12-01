
const resolve = dir => path.resolve(__dirname, dir)
const path = require('path')
const proxy = require('./config');

console.log(proxy);

module.exports = {
    transpileDependencies: ["@antv/g6"],
    chainWebpack: config => {
        // 添加别名
         config.resolve.alias
         .set('@', resolve('src'))
         .set('components', resolve('src/components'))
         .set('views', resolve('src/views'))
    },
    devServer: {
        port: proxy.port,
        // https: false,
        // open: true,
        // hotOnly: false,
        proxy: proxy.proxyTable
      }
}