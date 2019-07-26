(function () {
    // 初始化处理
    function Init(options) {
        this.parent = options.parent;
        this.key = options.key || 'callback';
        this.jsonpCallback = options.jsonpCallback || '';
        this.url = options.url;
        this.type = options.type;
        this.success = options.success;
        this.dataName = options.dataName;
        this.dataType = options.dataType || 'jsonp';
        this.btnColor = options.btnColor || '#eee';

        this.others = options.others || '';
        this.height = this.parent.height();
        this.width = this.parent.width();

        this.createDom();
        this.addCss();
        this.bindEvent();
    }

    // 创建结构
    Init.prototype.createDom = function () {
        var oDiv = $('<div class="cj-input-content"></div>');
        var oInput = $('<input type="text" placeholder="空气净化器" class="cj-input-search"/>');
        var oBtn = $('<input class="search-btn" type="button" value="搜索"/>');
        oDiv.append(oInput).append(oBtn).appendTo($(this.parent));
    }

    // 设置样式
    Init.prototype.addCss = function () {
        var self = this;
        var h = this.height;
        var w = this.width;
        $('.cj-input-content', this.parent).css({
            width: '100%',
            height: '100%',
            // 弹性盒模型   用来布局
            display: 'flex',
        })
        $('.cj-input-content > .cj-input-search', this.parent).css({
            height: h,
            // 父级宽度减去btn宽度剩余部分
            flex: 1,
            border: '1px solid transparent',
            outline: 'none'
        });
        $('.cj-input-content > .search-btn', this.parent).css({
            width: '100px',
            height: h,
            border: '1px solid transparent',
            color: '#fff',
            outline: 'none',
            cursor: 'pointer',
            backgroundColor: self.btnColor,
        });
    }

    // 发送请求
    Init.prototype.bindEvent = function () {
        var self = this;
        $('.cj-input-content > .cj-input-search', this.parent).on('input', function (e) {
            $.ajax({
                type: self.type,
                url: self.url,
                success: self.success,
                data: self.dataName + '=' + $(this).val() + '&code=utf-8',
                dataType: self.dataType,
                jsonp: self.key,
                async: false,
                jsonpCallback: self.jsonpCallback,
            });
        }).focus(function () {
            $(this).css({
                border: '1px solid #ccc'
            })
        }).on('blur', function () {
            $(this).css({
                border: '1px solid transparent'
            })
        });
    }

    $.fn.extend({
        inputSearch: function (options) {
            options.parent = this;
            new Init(options);
        }
    });
}())