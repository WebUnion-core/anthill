function loadImg(src){
    return new Promise(function(resolve, reject){
        let img = document.createElement('img');
        img.onload = function(){
            resolve(img)
        }
        img.onerror = function(){
            reject('图片加载失败');
        }
        img.src = src;
    })
}

let src = 'http://i0.hdslb.com/bfs/archive/83a12dcbe6401c27e16a3333b1eba91191ac3c8e.jpg';
let result = loadImg(src);

result.then(function(img){
    console.log(`width:${img.width}`);
    return img;
}).then(function(img){
    console.log(`height${img.height}`);
}).catch(function(err){
    console.log(err);
})