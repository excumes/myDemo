(function($,root){
    // play pause getAudio

    function AudioManger(){
        //因为没有用audio标签  所以创建一个音频对象
        this.audio = new Audio();
        // this.src = src;
        //audio默认状态
        this.status = 'pause';
    } 

    AudioManger.prototype = {
        play: function(){
            this.audio.play();
            this.status = 'play';
        },
        pause:function(){
            this.audio.pause();
            this.status = 'pause'
        },
        getAudio:function(src){
            console.log(src);
            this.audio.src = src;
            this.audio.load();
        },
        playTo:function(t){
            this.audio.currentTime = t;
        }
    }
    //因为要接受参数所以 要把构成函数暴露出去 ,让它能够接受参数
    // root.audioManage =  AudioManger;
    //换个写法  在暴露这个对象,在getAudio再传参
    root.audioManage = new AudioManger();

}(window.Zepto,window.player || (window.player = {})))