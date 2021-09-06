
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
                ],
                exclude: /node_modules/,
                use: [
                    /*
                    开启多进程打包。
                    进程启动大概为600ms，进程通信也有开销。
                    只有工作消耗时间比较长，才需要多进程打包*/
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: 2 //进程2个
                        }
                    },
                    {

                        loader: 'babel-loader',
                        options: {
                            plugins: [
                                "@babel/plugin-transform-arrow-functions",
                                "@babel/plugin-transform-block-scoping"
                            ]
                        }
                    }
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
        }
    },
    mode: 'production',
}