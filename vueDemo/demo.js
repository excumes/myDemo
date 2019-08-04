

// var lists = [{
//     title: "吃饭",
//     checked: true
// }, {
//     title: "睡觉",
//     checked: false
// }]

// localStorage 存储数据
var setLocal = {
    set(key, val) {   // localStorage 存储数据
        localStorage.setItem(key, JSON.stringify(val))
    },
    get(key) {
        return JSON.parse(localStorage.getItem(key));
    }

}
let list = setLocal.get("todo") || [];  //读取localStorage

let filterCheck = {
    all() {
        return list;
    },
    unfinish(val) { //返回未完成列表
        return list.filter(val => !val.checked)
    },
    finish(val) {
        return list.filter(val => val.checked)
    }
}
let vm = new Vue({
    el: ".main",
    data: {
        list: list,
        inputValue: '',
        editing: '',
        beforeEdit: '',
        visibility: 'all',
        show: 1
    },
    watch: {  //监听  ， list改变就会调用这个函数   
        // 但这种普通的监听 无法监听list里对象的变化，只能监听对象数组个数的变化， 
        // 所以vue有更深层的监听
        // list : function(){
        //     console.log(111)
        //     setLocal.set("todo",this.list);
        // }
        list: {
            deep: true,
            handler: function () {
                setLocal.set("todo", this.list);
            }
        }

    },
    methods: {
        addTodo() {
            this.list.push({
                title: this.inputValue,
                checked: false
            })
            this.inputValue = '';
        },
        deleteTodo(item) {
            var index = this.list.indexOf(item);
            this.list.splice(index, 1);
        },
        edit(item) {
            this.editing = item;
            this.beforeEdit = item.title;
            // console.log(item.title);
        },
        edited() {
            this.editing = '';
        },
        cancel(item) {
            item.title = this.beforeEdit;
            this.editing = '';
            this.beforeEdit = '';
            // console.log('esc')
        },
    },
    computed: {
        notdo: function () {
            // console.log(this);
            // console.log(this.list);
            return this.list.filter(val => !val.checked).length;
        },
        filterList: function () {
            switch(this.visibility){
                case 'all':
                    this.show = 1;
                    break;
                case 'unfinish' : 
                    this.show =2;
                    break;
                case 'finish' :
                    this.show = 3;
                    break;
                default:
                    this.show = 1;
            }
            // if(this.visibility =='all'){
            //     this.show = 1;
            // }else if(this.visibility =="unfinish"){
            //     this.show = 2;
            // }else{
            //     this.show = 3;
            // };
            return filterCheck[this.visibility] ? filterCheck[this.visibility](this.list) : this.list;
        }
    },
    directives: {  //自定义指令   有v-focus 就会执行 
        focus: {
            update: function (el, binding) {  //binding.value  等于v-focus=" "  冒号里的值
                if (binding.value) {
                    el.focus();
                }
            }
        }
    }
})

//监听hash值的变化
function hashchange() {
    var hash = window.location.hash.slice(2);
    vm.visibility = hash;
    console.log(vm.visibility);
}
hashchange();
window.addEventListener("hashchange", hashchange);

// // 注册一个全局自定义指令 `v-focus`
// Vue.directive('focus', {
//     // 当被绑定的元素插入到 DOM 中时……
//     inserted: function (el) {
//       // 聚焦元素
//       el.focus()
//     }
//   })