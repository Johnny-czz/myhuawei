// 定义 gulp 的打包规范
// 1,加载 依赖包
// gulp依赖包
const gulp = require('gulp');

// css相关的依赖包
// cssmin依赖包
const cssmin = require('gulp-cssmin');

// sass依赖包
const sass = require('gulp-sass');

// autoprefixer依赖包
const autoprefixer = require('gulp-autoprefixer');

// 加载js相关的依赖包
// 打包压缩ES5规范的的依赖包
const uglify = require('gulp-uglify');

// 将其他语法规范,转化为ES5语法规范
const babel = require('gulp-babel');

// html依赖包
const htmlmin = require('gulp-htmlmin');

// del依赖包
const del = require('del');


// 2,执行打包压缩规范
// 是 return 方式 通过返回值,来定义打包规范

// css压缩规范
// 这两种方式都可以,只要有变量或者函数名称,存储函数内存地址就可以
// 声明方式定义函数
// function cssHandler (){}     

// 匿名函数形式声明
const cssHandler = function(){
    return gulp.src('./src/css/*.css').pipe(autoprefixer()).pipe(cssmin()).pipe(gulp.dest('./dist/css'));
} 

// sass压缩规范
const sassHandler = function(){
    return gulp.src('./src/sass/*.*').pipe(sass()).pipe(autoprefixer()).pipe(cssmin()).pipe(gulp.dest('./dist/css'));
}

// js的压缩规范
// 添加到 watch 监听中 和 default 默认执行中
const jsHandler = function(){
    return gulp.src('./src/js/*.js')
    .pipe(babel({presets:['@babel/env']}))  
    .pipe(uglify())                         
    .pipe(gulp.dest('./dist/js'))             
}

// html文件的打包压缩
// 添加到 watch 监听中 和 default 默认执行中
const htmlHandler = function(){
    return gulp.src('./src/pages/*.html')    // 设定打包的html文件位置
           .pipe(htmlmin({
               removeAttributeQuotes : true ,
               removeComments : true , 
               collapseBooleanAttributes : true ,
               collapseWhitespace : true , 
               minifyCSS : true ,
               minifyJS : true ,
           }))
           .pipe(gulp.dest('./dist/pages')) 
}

// index文件
const indexHandler = function(){
    return gulp.src('./src/*.html')    // 设定打包的html文件位置
           .pipe(htmlmin({
               removeAttributeQuotes : true ,
               removeComments : true , 
               collapseBooleanAttributes : true ,
               collapseWhitespace : true , 
               minifyCSS : true ,
               minifyJS : true ,
           }))
           .pipe(gulp.dest('./dist')) 
}
// 音频,视频,图片等,不打压缩,直接移动到指定的文件夹位置
// 将所有格式的图片,都移动到指定的文件夹位置中
// 添加到 watch 监听中 和 default 默认执行中

const imgHandler = function(){
    return gulp.src('./src/images/*.*') 
           .pipe(gulp.dest('./dist/images')) 
}

// 移动jq
const jqHandler = function(){
    return gulp.src('./src/lib/**/*').pipe(gulp.dest('./dist/lib')) 
}

// 移动字体图标icon_font
const iconfontHandler = function(){
    return gulp.src('./src/icon_font/**/*').pipe(gulp.dest('./dist/icon_font'))
}

// 移动php文件
const phpHandler = function(){
    return gulp.src('./src/server/**/*').pipe(gulp.dest('./dist/server'))
}

// 3,指定删除程序
const delHandler = function(){
    return del(['./dist']);
}


// 3,制定监听程序
// 当指定的监听文件夹下的文件内容,发生改变,会自动执行打包规范
// 执行的监听程序,影响的是,修改源文件时,自动打包压缩程序

const watchHandler = function(){
    gulp.watch('./src/css/*.css' , cssHandler);         // 监听 css 文件
    gulp.watch('./src/js/*.js' , jsHandler);            // 监听 js 文件
    gulp.watch('./src/pages/*.html' , htmlHandler);     // 监听 html 文件
    gulp.watch('./src/images/*.*' , imgHandler);        // 监听 图片 文件  
    gulp.watch('./src/lib/**/*' , jqHandler);
    gulp.watch('./src/icon_font/**/*' , iconfontHandler);
    gulp.watch('./src/server/**/*' , phpHandler);
    gulp.watch('./src/*.html' , indexHandler);
    gulp.watch('./src/sass/*.*' , sassHandler)
}


// 4,定义 gulp 的默认执行程序
module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(cssHandler,jsHandler,htmlHandler,imgHandler,jqHandler,iconfontHandler,phpHandler,indexHandler,sassHandler),   //  默认的,第一次,初始化,先执行一次所有的打包规范
    watchHandler,
)


// 执行gulp时的基本执行步骤

// 执行 default 当中定义的程序内容
// 之前都是在定义 函数 也就是 定义各种规范
// 只有在 default 中,才是执行这些定义好的函数

// 按照定义的代码顺序,来执行函数
// 1, 执行 delHandler 将之前打包压缩的程序删除掉
//    为了防止生成重复的打包压缩文件,造成程序执行有误
//    这个 delHandler 在整个 监听的过程中,只会执行一次

// 2, 同时执行 所有的打包压缩规范
//    根据当前的源文件,初次生成压缩文件

// 3, 执行 watchHandler 监听源文件
//    每次有监听的文件内容改变,只会重新打包压缩这一个源文件,不会重新压缩所有的项目中的源文件

// 实际项目中,我们只要定义好gulp的压缩规范,然后运行gulp监听
// 会自动生成压缩的打包文件
// 当项目开发结束,所有的压缩文件也就自动生成了
// 将压缩的文件,作为项目文件,布置上线