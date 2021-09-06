const { resolve } = require('path');
const webpack = require('webpack');
// 命令：当你运行webpack 时，默认查找webpack.config.js 
//  配置文件需求:需要运行webpack.dll.js 文件
// --> webpack --config webpack.dll.js

module.exports = {
    // 最终打包生成的[name] --> jquery
    // ['jquery] --> 要打包的库是jquery
    entry: {
        jquery: ['jquery']
    },
    output: {
        filename: '[name].js',// name就是jquery
        path: resolve(__dirname, 'dll'),// 打包到dll目录下
        library: '[name]', // 打包的库里面向外暴露出去的内容叫什么名字

    },
    plugins: [
        // 打包生成一个manifest.json --> 提供jquery的映射关系
        //（告诉webpack：jquery之后不需要再打包和暴露内容的名称）
        new webpack.DllPlugin({
            name: '[name]',// 映射库的暴露的内容名称
            path: resolve(__dirname, 'dll/manifest.json')// 输出文件路径
        })
    ],
    mode: 'production'
}