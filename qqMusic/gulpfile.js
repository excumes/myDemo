var gulp = require("gulp");

// 压缩html
//gulp中插件应用  下载插件----> 取到插件--->应用插件
var htmlClean = require("gulp-htmlclean");
//压缩图片
// var imageMin = require("gulp-imagemin") ; //报错:需要gulp4.0以上

//压缩js 插件
var uglify = require("gulp-uglify");

//去掉js中的调试语句 如console.log() degguer
var debug = require("gulp-strip-debug");

//将less 转换成css
var less = require("gulp-less");

//压缩css
var cleanCss = require("gulp-clean-css");

//postcss autoprofixer  给css3 属性添加前缀 兼容浏览器
//用法 ,将autoprofixer执行以参数传给postcss
var postCss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");

//开启服务器代理
var connect = require("gulp-connect")


// 用变量可以统一改
var folder = {
    src:"src/",
    dist:"dist/"
};

//获取当前的环境变量(开发or生产)  
//需要设置当前变量  命令:export NODE_ENV=development (porduction)
var devMod = process.env.NODE_ENV == "development";

console.log('devMod=' + devMod);
gulp.task("html",function(){   
   var page = gulp.src(folder.src + "html/*") // I  
        .pipe(connect.reload())
        if(!devMod){  //判断环境
            page.pipe(htmlClean())//压缩html
        }
        //管道 里 用gulp.dest输出文件  //在这之间可以对文件做一系列操作
        page.pipe(gulp.dest(folder.dist + "html/"))  // O 如果dist里没有html 文件夹会自动生成
})

gulp.task("image",function(){
    gulp.src(folder.src + "image/*")
        // .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + "image/"))
})

//同时打包js, css 文件
gulp.task("css",function(){
    var page = gulp.src(folder.src + "css/*") 
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postCss([autoprefixer()]))  //postCss是数组格式
        if(!devMod){
            page.pipe(cleanCss()) //压缩css
        }
        page.pipe(gulp.dest(folder.dist + "css/"))
})

gulp.task("js",function(){
    var page = gulp.src(folder.src + "js/*") 
        .pipe(connect.reload())
        if(!devMod){
        page.pipe(debug())
            .pipe(uglify())
        }
        page.pipe(gulp.dest(folder.dist + "js/"))
})

//task('任务名字,')  创建任务   //默认执行default任务 
// gulp.task("default",function(){
//     console.log('music')
// })

gulp.task("sever", function(){
    connect.server({
        port:"8888",  //修改端口号
        livereload:true
    })
})

//开启监听 html
gulp.task("watch",function(){  
    gulp.watch(folder.src + "html/*", ["html"]) //当他监听到改变,就触发html
    gulp.watch(folder.src + "css/*", ["css"])
    gulp.watch(folder.src + "js/*", ["js"])
})


gulp.task("default", ["html","css","js","image","sever","watch"])  //default找到html任务 (任务队列)

//less-->自动添加css3前缀--->压缩--->css文件  //一步到位, 流操作

// 4个api
//gulp.src()
// gulp.dest()
// gulp.task()
// gulp.watch(glob [,opts],tasks) 监视文件