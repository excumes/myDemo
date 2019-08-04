

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

// 任务过滤器
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

//任务子组件
const taskComponent = {
    data() {
        return {
            list:list,
            editing : '',
            beforeEdit: '',
        }
    },
    props:{
        id: String
    },
    template: `
    <div class="tasks">
        <span class="no-task-tip" v-show="list.length == 0">未添加任何项目</span>
        <ul class="todo-list">
            <li class="list" v-for="item in filterList" :class="{completed:item.checked,editing:editing === item}">
                <div class="view">
                    <input type="checkbox" class="toggle" v-model="item.checked" >
                    <label @dblclick="edit(item)">{{ item.title }}</label>
                    <button class="destory" v-on:click="deleteTodo(item)">X</button>
                </div>
                <input type="text" class="edit" v-focus="editing === item" v-model="item.title" @keyup.enter="edited" @blur="edited" @keyup.esc="cancel(item)">   
            </li>
        </ul>
    </div>`,
    methods :{
        edit(item) {
            this.editing = item;
            this.beforeEdit = item.title;
            // console.log(item.title);
        },
        edited() {
            this.editing = '';
        },
        //点击ESC取消
        cancel(item) {
            item.title = this.beforeEdit;
            this.editing = '';
            this.beforeEdit = '';
        },
        deleteTodo(item) {
            var index = this.list.indexOf(item);
            this.list.splice(index, 1);
        },
        
    },
    mounted() {
        // 触发自定义事件,吧子组件的状态值传给父组件,完成样式切换
        this.$emit('update','???');
        console.log(this.id);
    },
    watch: {
        //同上监听 路由id属性并传给父组件
        id(){
            this.$emit('update',this.id)
        }
    },
    computed: {
        filterList: function () {
            switch (this.id) {
                case 'all':
                    this.show = 1;
                    break;
                case 'unfinish':
                    this.show = 2;
                    break;
                case 'finish':
                    this.show = 3;
                    break;
                default:
                    this.show = 1;
            }
            return filterCheck[this.id] ? filterCheck[this.id](this.list) : this.list;
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
}


const router = new VueRouter({
    routes: [
        { path: '/task/:id', component : taskComponent ,props: true},
        { path: '/', redirect: '/task/all'}
    ]
})

// 父组件
let vm = new Vue({
    el: ".main",
    data: {
        list: list,
        inputValue: '',
        editing: '',
        beforeEdit: '',
        visibility: 'all',
        show: 'all'
    },
    router,
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
        },
    },
    methods: {
        addTodo() {
            this.list.push({
                title: this.inputValue,
                checked: false
            })
            this.inputValue = '';
        },
        test(){
            console.log(this.$route.params.id)
        },
        changeid(data){
            console.log(data);
            console.log(111)
        }
        // edit(item) {
        //     this.editing = item;
        //     this.beforeEdit = item.title;
        //     // console.log(item.title);
        // },
        // edited() {
        //     this.editing = '';
        // },
    },
    computed: {
        notdo: function () {
            // console.log(this);
            // console.log(this.list);
            return this.list.filter(val => !val.checked).length;
        }
    }
})

//监听hash值的变化
// function hashchange() {
//     var hash = window.location.hash.slice(1);
//     vm.visibility = hash;
//     console.log(vm.visibility);
// }
// hashchange();
// window.addEventListener("hashchange", hashchange);

// // 注册一个全局自定义指令 `v-focus`
// Vue.directive('focus', {
//     // 当被绑定的元素插入到 DOM 中时……
//     inserted: function (el) {
//       // 聚焦元素
//       el.focus()
//     }
//   })