/*
    开发环境配置,能让代码运行
*/


const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    //loader
    module: {
        rules: [
            {
                //处理less资源
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                //处理css资源
                test: /\.css$/,
                use: [
                    // 创建style标签,将样式放入
                    'style-loader'
                    // 将css文件整合到js文件中
                    , 'css-loader']
            },
            {
                // 处理图片
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    // 图片文件小于 8kb 以base64处理
                    limit: 8 * 1024,
                    // 关闭es6模块化
                    esModule: false,
                    name: '[hash:10].[ext]',
                    outputPath: 'imgs'
                }
            },
            {
                //处理html中img资源
                test: /\html$/,
                // 处理hmtl img标签图片
                loader: 'html-loader'
            },
            // 打包其他资源
            {
                // 排除css/js/html资源
                exclude: /\.(css|js|html|less|jpg|png)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: 'media'  //在根路径下+输出media
                }
            }
        ]
    },
    plugins: [
        //plugins的配置
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],
    mode: 'development',
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 3000
    }
}