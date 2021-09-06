const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const { resolve } = require('path')

const commonCssLoader = [
    //从下到上执行顺序
    // 单独处理成css文件,使用link导入html中
    MiniCssExtractPlugin.loader,
    // 解析了css文件里面的css代码
    'css-loader',
    // css兼容性设置
    {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: () => {
                // postcss的插件
                require('postcss-preset-env')()
            }
        }
    }
]

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [...commonCssLoader]
            }, {
                test: /\.less$/,
                use: [...commonCssLoader, 'less-loader']
            }, {
                test: /\.(jpg|png|gif)/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]',
                    outputPath: 'imgs',
                    esModule: false //默认使用es6模块化解析,使用common.js
                }
            }, {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        plugins: [
                            "@babel/plugin-transform-arrow-functions",
                            "@babel/plugin-transform-block-scoping"
                        ]
                    }
                }
            },
            {
                test: /\.html$/,
                loader: 'html.loader',
            }, {//处理其他文件
                exclude: '/\.(js|css|less|html|jpg|png|gif)/'
                , loader: 'file-loader',
                options: {
                    outputPath: 'media',
                },
            }
        ]
    },
    plugins: [
        // 处理html文件
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // 提取css成单独文件
        new MiniCssExtractPlugin({
            filename: 'css/built.css'
        }),
        // 压缩css
        new OptimizeCssAssetsWebpackPlugin()
    ],
    mode: 'development'
}