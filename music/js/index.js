var root = window.player;
var dataList = [];
var len;
var audio = root.audioManager; //拿来的是对象
var control;  //歌曲index 控制对象 
var timer;
// 获取数据
function getDate(url){
    $.ajax({
        type:"GET",
        url:url,
        success:function(data){
            // root.render(data[0]);
            // root.pro.renderAllTime(data[0].duration);
            dataList = data;
            len = data.length;
            control = new root.controlIndex(len);
            root.playList.renderList(data);
            // audio.getAudio(data[0].audio);
            bindEvent();
            bindTouch();
            $('body').trigger('play:change',0); 
        },
        error:function(){
            console.log("error");
        }
    })
}
// 绑定点击事件
function bindEvent(){
    // 自定义切换个歌曲 事件
    $('body').on('play:change',function(e,index,flag){
        console.log(index+ "-触发了");
        audio.getAudio(dataList[index].audio);
        root.render(dataList[index])
        root.pro.renderAllTime(dataList[index].duration);
        if(audio.status == 'play' || flag){
            audio.play();
            retated(0);
            // root.pro.start(0);
        }
        $('.img-box').attr('data-deg',0);
        $('.img-box').css({
            'transform':'rotateZ('+ 0 +'deg)',
            'transition': 'none'
        })
        // root.pro.start(0);        
        // if(audio.status == 'pause'){
        //     root.pro.stop();
        // }
    })
    //上一首
    $('.prev').on('click',function(e){
        var i = control.prev();
        $('body').trigger('play:change',i); 
        root.pro.stop();  //清除上一首歌的进度条动画
        root.pro.start(0);        
        if(audio.status == 'pause'){
            root.pro.stop();
        }
    });
    //下一首
    $('.next').on('click',function(e){
        var i = control.next();
        $('body').trigger('play:change',i); 
        root.pro.stop(); //清除上一首歌的进度条动画
        root.pro.start(0);
        if(audio.status == 'pause'){
            root.pro.stop();
        }
    });

    $('.play').on('click',function(e){
        if(audio.status == 'pause'){
            console.log('pause');
            audio.play();   //音乐开始
            root.pro.start(); //进度条开始
            var deg = $('.img-box').attr('data-deg');
            retated(deg)
            console.log('开始播放')
        }else{
            audio.pause();
            root.pro.stop(); 
            clearInterval(timer)
            console.log('暂停播放')
        }
        $('.play').toggleClass('playing');
    })
    $('.like').on('click',function(){
        $('.like').toggleClass('liking'); 
    })
    $('.btn.list').on('click',function(){
        console.log('点击了list按钮')
        root.playList.show(control);
    })
}
//小圆点的拖拽
function bindTouch(){
    var $spot = $('.spot');
    var bottom = $('.pro-bottom').offset();
    var l = bottom.left;
    var w = bottom.width;
    $spot.on('touchstart',function(){
        root.pro.stop();
    }).on('touchmove',function(e){
        var x = e.changedTouches[0].clientX;
        var per = (x - l) / w;
        if(per >= 0 && per <=1){
            root.pro.update(per);
        }
    }).on('touchend',function(e){
        var x = e.changedTouches[0].clientX;
        var per = (x - l) / w;
        if(per >= 0 && per <=1){    
            var time = per * dataList[control.index].duration;
            root.pro.start(per);
            console.log(time)
            audio.playTo(time);
            audio.play();
            audio.status = 'play';
            $('.play').addClass('playing');
        }
    });
}


// 图片旋转
function retated(deg){
    clearInterval(timer); //防止定时器叠加
    console.log('retated')
    deg = +deg;
    $('.img-box').css({
        'transition':'all 1s ease-out'
    })
    timer = setInterval(function(){
        deg += 0.15;
        $('.img-box').attr('data-deg',deg);
        $('.img-box').css({
            'transform':'rotateZ('+ deg +'deg)'
        })
    },1000/60);
}

getDate("../mock/data.json");