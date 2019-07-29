// 处理index 模块
(function ($, root) {
    function Control(len) {
        this.index = 0;
        this.len = len;
    }
    Control.prototype = {
        prev() {
            return this.getIndex(-1);
        },
        next() {
            return this.getIndex(1);
        },
        //计算改变后的索引
        getIndex(val){ 
            //当前索引
            var index = this.index;
            //数据总长度
            var len = this.len;
            var curIndex = (index + val + len) % len;
            //改变后的索引
            this.index = curIndex;
            return curIndex;
        }
    }
    root.controlIndex = Control;
})(window.Zepto, window.player || (window.player = {}))