const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {   //loader 的配置
                test: /\.less$/,
                // 要使用多个loader 处理use
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                // 处理图片
                test: /\.(jpg|png|gif)$/,
                // 使用一个loader
                // 下载 url-loader file-loader
                loader: 'url-loader',
                // 图片文件小于 8kb 以base64处理
                // 优点 减少请求次数
                // 缺点 图片体积会更大 
                options: {
                    limit: 8 * 1024,
                    //问题:因为url-loader默认使用es6模块化解析，而ihtml-loader引入图片是commonjs//解析时会出问题:[object Module]
                    //解决:关闭ur1-loader的es6模块化，使用commonjs解析
                    esModule: false,
                    name: '[hash:10].[ext]'
                }
            },
            {
                test: /\html$/,
                // 处理hmtl img标签图片
                loader: 'html-loader'
            }
        ]

    },
    plugins: [
        //plugins的配置
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development'
}