import $ from 'jquery'
console.log($)
/*
通过js代码，让某个文件被单独打包成一个chunkimport动态导入语法:
能将某个文件单独打包
*/
import(/*webpackChunkName:'test'*/ './test')
    .then(({ mul }) => {
        console.log(mul(2, 5))
    })
    .catch(() => {
        console.log('文件加载失败')
    })