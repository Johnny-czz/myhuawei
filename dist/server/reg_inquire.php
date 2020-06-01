<?php

include_once './config.php';
// 1,接收前端参数,目前是get方式

$username = $_GET['username']; 

// 2,根据参数对数据库执行查询操作

// 链接数据库服务器
$link = mysqli_connect($host, $user, $pwd, $dbname, $port);

// 定义SQL语句
// 所有的名称,库名,表名,字段名,都是 反引号
// 字符串数,是 单引号
$sql = "SELECT * FROM `user` WHERE `username` = '{$username}' ";

// 执行SQL语句
$result = mysqli_query($link , $sql);

// 获取执行结果
$arr = mysqli_fetch_all($result , MYSQLI_ASSOC);

// 根据结果,执行不同操作

if(count($arr) == 0){
    // 等于0就表示查询的数据没有长度
    // 就返回一个1,表示用户名不存在,可以注册
    echo 1;
}else{
    echo 0;
}

// 关闭数据库
mysqli_close($link);