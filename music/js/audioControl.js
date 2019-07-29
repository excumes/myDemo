(function($,root){
    // 实现播放, 暂停 ,getAudio

    function AudioManager(){
        //创建音频对象
        this.audio = new Audio();
        this.status = 'pause'; //audio默认状态
    }

    AudioManager.prototype = {
        play:function(){
            this.audio.play();
            this.status = 'play';
        },
        pause:function(){
            this.audio.pause();
            this.status = 'pause';
        },
        getAudio:function(src){
            this.audio.src = src;
            this.audio.load();
        },
        playTo:function(t){
            this.audio.currentTime = t;
        }
    }

    root.audioManager = new AudioManager();

})(window.Zepto, window.player || (window.player = {}))