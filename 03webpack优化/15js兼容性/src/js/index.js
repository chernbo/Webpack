import '../css/index.css'

let foo = () => {
    console.log('hello world');
}

let rs = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve();
    }, 1000);
})
rs.then(() => { console.log('promise') })