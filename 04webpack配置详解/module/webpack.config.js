const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolve } = require('path')
module.exports = {

    entry: {
        'p1': ['./src/js/index.js', './src/js/test.js'],
        'p2': './src/js/work.js'
    },
    output: {
        filename: 'js/[name][contenthash:5].js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // 多个loader用use
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                // 排除node_modules下的配置
                exclude: /node_modules/,
                // 只检查src下的js文件
                include: resolve(__dirname, 'src'),
                // 优先执行
                enforce: 'pre',
                // 延后执行
                enforce: 'post',
                // 单个loader用loader配合options
                loader: 'eslint-loader',
                options: {}
            },
            // 一下配置只会生效一个
            {
                oneOf: []
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