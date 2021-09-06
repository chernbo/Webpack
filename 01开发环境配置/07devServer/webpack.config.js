const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            //loader 的配置
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            // 打包其他资源
            {
                // 排除css/js/html资源
                exclude: /\.(css|js|html|less)$/,
                loader: 'file-loader'
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
    //开发服务器devServer 用来自动化(自动编译，自动打开浏览器，自动刷新浏览器)
    // 特点 : 只会在内存中编译打包,不会有任何输出
    // 启动devServer命令:npx webpack-dev-server
    devServer: {
        // 运行代码的目录
        contentBase: resolve(__dirname, 'build'),
        // 启动gzip压缩
        compress: true,
        // 端口号
        port: 3000,
        // 自动打开浏览器
        open: true,
        // 开启热模块替换
        // hot: true,
        // 服务器代理 --> 解决开发环境下跨域问题
        proxy: {
            'api': {
                //一旦devServer(500e)服务器接受到/api/xxx的请求，
                // 就会把请求转发到另外一个服务器(300c
                target: 'http://localhost:3000',
                pathRewrite: {
                    //发送请求时，请求路径重写:将/api/xxx -->/xxx(去掉/api)
                    '^api': ""
                }
            }
        }
    }
}