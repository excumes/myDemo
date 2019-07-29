//实现页面渲染 img + info + like-btn
//我们把所有插件都暴露到 window.player上
(function ($, root) {
    //把 zepto 传进来, 就可以在自己的作用域上找到, 就不用没次使用都到全局上找
    function renderImg(src){
        var img = new Image();
        img.src = src;
        img.onload = function(){
            $('.img-box img').attr('src',src);
            root.blurImg(img, $('body'));
        }
    }
    function renderInfo(info){
        var str = `<div class="song-name">${info.song}</div>
                <div class="singer-name">${info.singer}</div>
                <div class="album-name">${info.album}</div>`;
        $('.song-info').html(str);

    }
    function renderIsLike(like){
        if(like){
            $('.like').addClass('liking');
        }else{
            $('.like').removeClass('liking');
        }
    }
    root.render = function(data){
        console.log(data)
        renderImg(data.image);
        renderInfo(data)
        renderIsLike(data.isLike)
    } 

})(window.$, window.player || (window.player = {}));