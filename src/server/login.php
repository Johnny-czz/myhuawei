<?php

include_once './config.php';
// 1,接收前端参数,目前是get方式

$username = $_POST['username'];
$userpwd = $_POST['userpwd'];

// 2,根据参数对数据库执行查询操作

// 链接数据库服务器
$link = mysqli_connect($host, $user, $pwd, $dbname, $port);

// 定义SQL语句
// 所有的名称,库名,表名,字段名,都是 反引号
// 字符串数,是 单引号
$sql = "SELECT * FROM `user` WHERE `username` = '{$username}' AND `userpwd` = '{$userpwd}' ";

// 执行SQL语句
$result = mysqli_query($link , $sql);

// 获取执行结果
$arr = mysqli_fetch_all($result , MYSQLI_ASSOC);

// 根据结果,执行不同操作

if(count($arr) !== 0){
    // 不等于0,就是数组有长度,登录成功
    // 就返回一个1,表示登录成功
    echo 1;
}else{
    // 等于0,就是数组没有内容,登录失败
    // 就返回一个0,表示登录失败
    echo 0;
}

// 关闭数据库
mysqli_close($link);