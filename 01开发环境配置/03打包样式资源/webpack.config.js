const { resolve } = require('path')
console.log(111)
module.exports = {
    // 入口起点
    entry: "./src/index.js",
    // 输出 
    output: {
        // 输出文件名
        filename: 'built.js',
        // 输出路径配置
        path: resolve(__dirname, 'build')
    },//开发环境
    // loader 的配置
    module: {
        rules: [
            //详细loader配置
            // 不同文件必须配置不同loader处理
            {
                // 匹配哪些文件
                test: /\.css$/,
                use: [
                    // use数组中loader执行顺序:从右到左,从下到上,依次执行
                    //创建style标签,将js的样式资源插入进入,添加到head中生效
                    'style-loader',
                    // 将css文件变成commonjs模块加载js中,里面内容是样式字符串
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    // 将css文件变成commonjs模块加载js中,里面内容是样式字符串
                    'css-loader',
                    // 将less文件变成 css文件
                    'less-loader'
                ]
            }
        ]
    },

    //plugins的配置
    plugins: [
        //详细plugins配置
    ],
    // 模式mode
    mode: 'development'
    // mode:'production'
};
