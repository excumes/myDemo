var root=window.player,dataList=[],len=0,audio=root.audioManage,timer=null,controlIndex=null;function getData(t){$.ajax({type:"GET",url:t,success:function(t){len=t.length,dataList=t,controlIndex=root.controlIndex,root.pro.renderAllTime(t[0].duration),root.render(t[0]),audio.getAudio(t[0].audio),bindEvent(),bindTouch()},error:function(){}})}function bindEvent(){$(".prev").on("click",function(){var t=root.controlIndex.prev();audio.getAudio(dataList[t].audio),root.render(dataList[t]),root.pro.start(0),"pause"==audio.status&&root.pro.stop(),root.pro.renderAllTime(dataList[t].duration),"paly"==audio.status&&(rotated(0),audio.play()),$(".img-box").attr("data-deg",0),$(".img-box").css({transform:"rotateZ(0deg)",transition:"none"})}),$(".next").on("click",function(){var t=root.controlIndex.next();audio.getAudio(dataList[t].audio),root.pro.renderAllTime(dataList[t].duration),"play"==audio.status&&(rotated(0),audio.play()),root.render(dataList[t]),root.pro.start(0),"pause"==audio.status&&root.pro.stop(),$(".img-box").attr("data-deg",0),$(".img-box").css({transform:"rotateZ(0deg)",transition:"none"})}),$(".play").on("click",function(){"pause"==audio.status?(rotated($(".img-box").attr("data-deg")||0),audio.play(),root.pro.start()):(audio.pause(),root.pro.stop(),clearInterval(timer));$(".play").toggleClass("playing")})}function bindTouch(){$(".spot").on("touchstart",function(){root.pro.stop()}).on("touchmove",function(t){var o=$(".pro-bottom").offset(),a=o.left,r=o.width,n=(t.changedTouches[0].clientX-a)/r;0<=n&&n<=1&&root.pro.updata(n)}).on("touchend",function(t){var o=$(".pro-bottom").offset(),a=o.left,r=o.width,n=(t.changedTouches[0].clientX-a)/r;if(0<=n&&n<=1){var i=n*dataList[controlIndex.index].duration;root.pro.start(n),audio.playTo(i),audio.play(),audio.status="play",$(".play").addClass("playing")}})}function rotated(t){clearInterval(timer),t=+t,timer=setInterval(function(){t+=2,$(".img-box").attr("data-deg",t),$(".img-box").css({transform:"rotateZ("+t+"deg)","-webkit-transition":"all 1s linear "})},200)}getData("../mock/data.json");