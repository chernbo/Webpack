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