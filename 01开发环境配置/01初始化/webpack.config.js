const { resolve } = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            //loader 的配置
        ]
    },
    plugins: [
        //plugins的配置
    ],
    mode: 'development'
}