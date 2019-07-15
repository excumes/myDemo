bindEvent();
function bindEvent(){
    $('.btn').on('click',function(){
        var val = $('.inp').val();
        if(val){
            // get Data(); addDom();
            addDom('my',val);
            getData(val);
            
        }
    });
    $('.inp').on('keyup',function(e){
        if(e.keyCode ==13 && this.value){
            $('.btn').trigger('click');
        }
    })
}

// console.log(111);

function getData(val){
    $.ajax({
        type : 'GET',
        url : 'http://temp.duyiedu.com/api/chat',
        data:{text:val},
        success:function(data){
            var list = typeof data == 'string' ? JSON.parse(data) : data;
            addDom('r',list.text);
        },
        error:function(){
            console.log('error')
        }
    })
}

function addDom(who,text){
    console.log(who);
    if(who == 'my'){
        $('<div class="talk my">\
            <div class="user"></div>\
            <div class="text"> '+ text + '</div>\</div>')
            .appendTo($('.inner'));
        $('.inp').val('');
    }else{
        $('<div class="talk rabit">\
            <div class="user"></div>\
            <div class="text">'+ text +'</div>\</div>')
            .appendTo($('.inner'));
        console.log(1);
    }
    $('.chat-box').scrollTop($('.chat-box')[0].scrollHeight);
}