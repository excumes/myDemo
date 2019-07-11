
var root = window.player;

// var nowIndex = 0;
var dataList = [];
var len = 0;
var audio = root.audioManage;
var timer = null;
var controlIndex = null;
function getData(url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            console.log(data);
            len = data.length;
            dataList = data;
            controlIndex = root.controlIndex;
            root.pro.renderAllTime(data[0].duration);
            root.render(data[0]);
            audio.getAudio(data[0].audio);
            bindEvent();  ///在这里调用
            bindTouch();
        },
        error: function () {
            console.log("error");
        }
    })
}

function bindEvent() {
    $('.prev').on('click', function () {
        // if (nowIndex == 0) {
        //     nowIndex = len - 1;
        // } else {
        //     nowIndex--;
        // };
        var i = root.controlIndex.prev();
        audio.getAudio(dataList[i].audio);
        root.render(dataList[i]);
        root.pro.start(0);
        if (audio.status == 'pause') {
            root.pro.stop();
        }
        root.pro.renderAllTime(dataList[i].duration);
        if (audio.status == 'paly') {
            rotated(0);
            audio.play();
        }
        $('.img-box').attr('data-deg', 0);
        $('.img-box').css({
            'transform': 'rotateZ(0deg)',
            'transition': 'none'
        })
    });
    $('.next').on('click', function () {
        // if (nowIndex == len - 1) {
        //     nowIndex = 0;
        // } else {
        //     nowIndex++;   //在模块indexControl 里
        // };
        var i = root.controlIndex.next();  //拿到返回的index值
        audio.getAudio(dataList[i].audio);
        root.pro.renderAllTime(dataList[i].duration);
        console.log(audio.status);
        if (audio.status == 'play') {
            rotated(0);
            audio.play();
        }
        root.render(dataList[i]);
        root.pro.start(0);
        if (audio.status == 'pause') {
            root.pro.stop();
        }
        $('.img-box').attr('data-deg', 0);
        $('.img-box').css({
            'transform': 'rotateZ(0deg)',
            'transition': 'none'
        })
    });
    $('.play').on('click', function () {
        // console.log('play');
        if (audio.status == 'pause') {
            var deg = $('.img-box').attr('data-deg') ||0;
            rotated(deg);
            audio.play();
            root.pro.start();
        } else {
            audio.pause();
            root.pro.stop();
            clearInterval(timer);
        }
        $('.play').toggleClass('playing');
        // console.log(new audio());
    })
}
//拖拽事件
function bindTouch() {
    $('.spot').on('touchstart', function () {
        root.pro.stop();
    }).on('touchmove', function (e) {
        var bottom = $('.pro-bottom').offset();
        var l = bottom.left;
        var w = bottom.width;
        var x = e.changedTouches[0].clientX;
        var per = (x - l) / w;
        if (per >= 0 && per <= 1) {
            root.pro.updata(per);   //随时更新音乐
        }
    }).on('touchend', function (e) {
        var bottom = $('.pro-bottom').offset();
        var l = bottom.left;
        var w = bottom.width;
        var x = e.changedTouches[0].clientX;
        var per = (x - l) / w;
        if (per >= 0 && per <= 1) {
            var time = per * dataList[controlIndex.index].duration;
            root.pro.start(per);
            audio.playTo(time);
            audio.play();
            audio.status = 'play';
            $('.play').addClass('playing');
        }
    });
}

function rotated(deg) {
    clearInterval(timer);
    deg = +deg;  //把字符串转换成数字
    timer = setInterval(function () {
        deg += 2;
        $('.img-box').attr('data-deg', deg);
        $('.img-box').css({
            'transform': 'rotateZ(' + deg + 'deg)',
            '-webkit-transition': 'all 1s linear '
        })
    }, 200);
}

getData("../mock/data.json");

// 信息+图片渲染到页面上 render
// 点击按钮
// 音频的播放与暂停 切歌
// 进度条运动与拖拽
// 图片旋转
// 列表切割
