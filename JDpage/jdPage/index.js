// 轮播图插件
$('#swiper').sliderImg({
    image: ['../jd/image/pic1.jpg', '../jd/image/pic2.jpg', '../jd/image/pic3.jpg'],
    interVal: 3000
});

// 左侧菜单展示
var index;
$('.cate_menu_item').hover(function () {
    $('.JS_popCtn').css('display', 'block');
    index = $(this).attr('data-index');
    $('#cate_item' + index).css('display', 'block');
}, function () {
    $('.JS_popCtn').css('display', 'none');
    $('#cate_item' + index).css('display', 'none');
});
$('.JS_popCtn').on('mouseover', function () {
    $(this).css('display', 'block');
    $('#cate_item' + index).css('display', 'block');
}).on('mouseout', function () {
    $('.JS_popCtn').css('display', 'none');
    $('#cate_item' + index).css('display', 'none');
});

// 右侧滑动动画
$('.services_entry .row1').hover(function () {
    // 滑出
    $('.services_entry').slideUp();
    // 滑入
    $('.services_content').slideDown();
    $('.services_content .content').css('display', 'none');

    var id = $(this).attr('id');
    $('.nowActive').removeClass('nowActive');
    $('.' + id + '_tab').addClass('nowActive');

    $('.' + id + '_content').show();
    $('.close').show();
});

$('.services_content .header span').hover(function () {
    $('.nowActive').removeClass('nowActive');
    $(this).addClass('nowActive');

    $('.' + $(this).attr('data') + '_content').show()
        .siblings('.content').hide();

});
$('.services_content .close').on('click', function () {
    $(this).hide();
    $('.services_entry').slideDown();
    // 滑入
    $('.services_content').slideUp();
    $('.services_content .content').hide();
})

// 地址插件
$('#location').areaList({
    items: [{
        name: '北京',
        href: '#',
    }, {
        name: '上海',
        href: '#',
    }, {
        name: '黑龙江',
        href: '#',
    }, {
        name: '天津',
        href: '#'
    }, {
        name: '重庆',
        href: '#',
    }, {
        name: '河北',
        href: '#'
    }, {
        name: '北京',
        href: '#',
    }, {
        name: '上海',
        href: '#',
    }, {
        name: '黑龙江',
        href: '#',
    }, {
        name: '天津',
        href: '#'
    }, {
        name: '重庆',
        href: '#',
    }, {
        name: '河北',
        href: '#'
    }, {
        name: '北京',
        href: '#',
    }, {
        name: '上海',
        href: '#',
    }, {
        name: '黑龙江',
        href: '#',
    }, {
        name: '天津',
        href: '#'
    }, {
        name: '重庆',
        href: '#',
    }, {
        name: '河北',
        href: '#'
    }, {
        name: '北京',
        href: '#',
    }, {
        name: '上海',
        href: '#',
    }, {
        name: '黑龙江',
        href: '#',
    }, {
        name: '天津',
        href: '#'
    }, {
        name: '重庆',
        href: '#',
    }, {
        name: '河北',
        href: '#'
    }, {
        name: '河北',
        href: '#'
    }],
    // 每一行显示城市数量
    rowNum: 5,
    // 默认显示值
    nowItem: '北京',
    // 显示图片  图标
    nowItemImg: '../jd/image/local.jpg'
});


// 导航条下拉列表插件
// y  纵向
$('#mgJd').dropList({
    dirction: 'y',
    colNum: 2,
    menuList: [{
        title: '',
        items: [{
            href: '#',
            name: '待处理订单',
        }, {
            href: '#',
            name: '消息',
        }, {
            href: '#',
            name: '返修退换货',
        }, {
            href: '#',
            name: '我的问答',
        }, {
            href: '#',
            name: '降价商品',
        }, {
            href: '#',
            name: '我的关注',
        }],
    }, {
        title: '',
        items: [{
            href: '#',
            name: '我的京豆',
        }, {
            href: '#',
            name: '我的优惠券',
        }, {
            href: '#',
            name: '我的白条',
        },
        ],
    }]
});

// x 横向 
$('#nav').dropList({
    // 下拉列表里面每一块的排布是横向横向（y）, 纵向（x）
    direction: 'x',
    // 下拉列表内的内容
    menuList: [{
        // 每块的标题
        title: '特色',
        // 每块的宽度
        items: [{
            name: '企业购',
            href: '#'
        }, {
            name: '商用场景管',
            href: '#'
        }, {
            name: '工业品',
            href: '#'
        }, {
            name: '礼品卡',
            href: '#'
        }],
        // 每块每行的选项列数
    }, {
        title: '特色',
        items: [{
            name: '企业购',
            href: '#'
        }, {
            name: '商用场景管',
            href: '#'
        }, {
            name: '工业品',
            href: '#'
        }, {
            name: '礼品卡',
            href: '#'
        }],
    }, {
        title: '特色',
        items: [{
            name: '企业购',
            href: '#'
        }, {
            name: '商用场景管',
            href: '#'
        }, {
            name: '工业品',
            href: '#'
        }, {
            name: '礼品卡',
            href: '#'
        }],
    }, {
        title: '特色',
        items: [{
            name: '企业购',
            href: '#'
        }, {
            name: '商用场景管',
            href: '#'
        }, {
            name: '工业品',
            href: '#'
        }, {
            name: '礼品卡',
            href: '#'
        }],
    }]
});


// https://suggest.taobao.com/sug?code=utf-8&q=羽绒服&callback=
// 输入--->val--->url + q + val ---> data --->addDom

// function addItem(data) {
//     console.log('add')
//     var str = '';
//     data.result.forEach(function (ele, i) {
//         str += '<a href="">' + ele[0] + '</a>';
//     });
//     $('.header-right .list').show();
//     $('.header-right .list').html(str);
// }

window.addItem = function (data) {
    var str = '';
    data.result.forEach(function (ele, i) {
        str += '<a href="">' + ele[0] + '</a>';
    });
    $('.header-right .list').show();
    $('.header-right .list').html(str);
}

// input搜索区域
// $('.cj-input').on('input', function () {
//     var val = $(this).val();
//     $.ajax({
//         type: 'GET',
//         url: 'https://suggest.taobao.com/sug',
//         data: { q: val, code: 'utf-8', callback: 'addItem' },
//         dataType: 'jsonp',
//     })
// });


$('.search').on('mouseleave', function () {
    $('.header-right .list').hide();
});


// input 插件--->创建结构--->设置样式--->发送请求
$('.search').inputSearch({
    // 参数
    type: 'GET',
    url: 'https://suggest.taobao.com/sug',
    //jsonp   callback/cb
    key: 'callback',
    dataType: 'jsonp',
    // jsonpCallback
    sucFn: 'window.addItem',
    btnColor: 'red',
    dataName: 'q',
    others: 'code=utf-8',
});







