const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { resolve } = require('path')
// 设置node.js环境变量
// process.env.NODE_ENV = 'development'
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
                use: [ // 从下往上执行顺序
                    //1.css提取成单独文件,使用link导入html
                    MiniCssExtractPlugin.loader,
                    //2.css文件整合到js中
                    'css-loader',
                    // css 兼容性处理:postcss --> postcss-loader postcss-preset-env
                    // 帮助postcss找到package.json中browserslist里面的配置,通过配置加载指定的css兼容样式
                    //开发环境--〉设置node环境变量: process.env.NODE_ENV = developement
                    // "browserslist": {
                    //     "development": [
                    //       "last 1 chrome version",
                    //       "last 1 firefox version"
                    //     ],
                    //     "production": [
                    //       ">0.2%",
                    //       "not dead",
                    //       "not op_mini all"
                    //     ]
                    //   }
                    // 3.对css做兼容性处理
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => {
                                // postcss的插件
                                require('postcss-preset-env')()
                            }
                        }
                    },
                    // 4.解析less文件
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/built.css'
        }),
        // 压缩css
        new OptimizeCssAssetsWebpackPlugin()
    ],
    mode: 'produce'
}