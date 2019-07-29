(function($,root){
    var control;
    var $scope = $(document.body);
    var $playList = $("<div class = 'play-list'>"+
    "<div class='play-header'>播放列表</div>" + 
    "<ul class = 'list-wrapper'></ul>" +
    "<div class='close-btn'>关闭</div>"+
    "</div>") 
    
    //渲染播放列表dom  data数据
    function renderList(songList){
        var html = '';
        for(var i = 0; i< songList.length; i++){
            html += '<li><h3>' + songList[i].song + '-<span>' + songList[i].singer + '</span></h3></li>'
        }
        $playList.find("ul").html(html);
        $scope.append($playList);
        bindEvent();
    }
    // 展示选择的歌曲  传入歌曲index控制对象
    function show(controlmanager){
        control = controlmanager;
        $playList.addClass("show");
        signSong(control.index);
    }

    function bindEvent(){
        //关闭列表事件
        $playList.on("click",".close-btn",function(){
            $playList.removeClass('show');
        })
        // 选着歌曲事件
        $playList.find("li").on('click',function(){
            var index = $(this).index();
            signSong(index);
            control.index = index;
            console.log(control);
            $scope.trigger("play:change",[index,true]);
            root.pro.stop();
            root.pro.start(0);
            $scope.find(".btn.play").addClass("playing");
            setTimeout(function(){
                $playList.removeClass("show")
            },200);
        })
    }
    //标记正在播放的歌曲
    function signSong(index){
        $playList.find(".sign").removeClass("sign");
        $playList.find("ul li").eq(index).addClass("sign");
    }
    root.playList = {
        renderList : renderList,
        show : show
    }

})(window.Zepto,window.player || (window.player = {}))