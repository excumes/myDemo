
(function ($, root) {
    var frameId;
    var duration;
    var lastPer = 0;
    var startTime;
    //渲染总时间
    function renderAllTime(allTime) {
        console.log(allTime);
        duration = allTime;
        var time = formatTime(allTime);
        $('.all-time').html(time);
    };

    function formatTime(t) {
        t = Math.round(t);
        m = Math.floor(t / 60);
        s = t - m * 60;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        return m + ':' + s;
    }

    function start(p) {
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();
        lastPer = p == undefined ? lastPer : p;
        function frame() {
            var curTime = new Date().getTime();
            //当前时间百分比
            var per = lastPer + (curTime - startTime) / (duration * 1000);
            if (per <= 1) {
                //更新进度条
                updata(per);
            } else {
                cancelAnimationFrame(frameId);
            }
            frameId = requestAnimationFrame(frame);
        }
        frame();
    }
    //更新音乐百分比
    function updata(per) {
        var time = formatTime(per * duration);
        $('.cur-time').html(time);
        var x = (per - 1) * 100;
        $('.pro-top').css({
            transform: 'translateX(' + x + '%)'
        })
    }

    function stop() {
        cancelAnimationFrame(frameId);
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) / (duration * 1000);
    }

    root.pro = {
        renderAllTime: renderAllTime,
        start: start,
        stop: stop,
        updata: updata

    }





})(window.Zepto, window.player || (window.player = {}))