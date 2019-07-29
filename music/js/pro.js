// 进度条模块
(function ($, root) {
    var duration;
    var frameId;
    var startTime;
    var lastPer = 0;
    // 渲染歌曲的时间
    function renderAllTime(allTime) {
        duration = allTime;
        console.log(allTime);
        var time = formatTime(allTime);
        $('.all-time').html(time);
    }
    //格式时间函数
    function formatTime(t) {
        t = Math.round(t);
        var m = Math.floor(t / 60);
        var s = t - m * 60;
        // 补零
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        return m + ':' + s;
    }

    //进度条开始运动
    function start(p) {
        startTime = new Date().getTime();
        lastPer = p == undefined ? lastPer : p;
        function frame() {
            var curTime = new Date().getTime();
            var per = lastPer + (curTime - startTime) / (duration * 1000); // 进度条百分数
            if (per <= 1) {
                // 更新进度条
                update(per);
            } else {
                cancelAnimationFrame(frameId);
            }
            frameId = requestAnimationFrame(frame);

        }
        frame()
    }
    //更新进度条位置
    function update(per) {
        var time = formatTime(per * duration);
        $('.cur-time').html(time);
        var x = (per - 1) * 100;
        $('.pro-top').css({
            'transform': 'translateX(' + x + '%)'
        })
    }

    function stop(p) {
        cancelAnimationFrame(frameId);
        var stopTime = new Date().getTime();
        lastPer = (stopTime - startTime) / (duration * 1000);
    }

    root.pro = {
        renderAllTime: renderAllTime,
        start: start,
        stop: stop,
        update: update
    }
})(window.Zepto, window.player || (window.player = {}))