import '../css/index.css'
import { mul } from './test'
document.getElementById('btn').onclick = function () {
    // console.log(mul(2, 4))
    // 懒加载
    // webpackPrefetch 预加载
    import(/*webpackChunkName:'test', webpackPrefetch:true*/'./test')
        .then(({ mul }) => {
            console.log(mul(4, 5));
        });
};

