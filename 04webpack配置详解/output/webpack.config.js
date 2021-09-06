const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolve } = require('path')
module.exports = {

    entry: './src/js/index.js',
    output: {
        filename: 'js/[name][contenthash:5].js',
        path: resolve(__dirname, 'build'),
        // 所有资源引入公共路径前缀
        publicPath: '/',
        // 对非入口的chunk的文件命令,
        // [import动态导入,optimization等代码分割]
        chunkFilename: 'js/[name]_chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/built.[contenthash:10].css'
        })
    ],
    mode: 'development'
}