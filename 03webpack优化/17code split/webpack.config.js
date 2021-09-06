
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolve } = require('path')
module.exports = {
    // 单入口
    entry: [
        './src/js/index.js'
    ],
    //多入口
    // entry: {
    //     main: './src/js/index.js',
    //     test: './src/js/test.js'
    // },
    output: {
        filename: 'js/.[contenthash:10].js',
        path: resolve(__dirname, 'build')
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
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        //将当前模块的记录其他模块的hash单独打包为一个文件 runtime
        //解决:修改a文件导致b文件的contenthash变化
        runtimeChunk: {
            name: entrypoint => `runtime-${entrypoint.name}`
        }
    },
    mode: 'production',
}