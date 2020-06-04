// 判断手机号和密码是否都输入成功
let regStr = {
    phone: false,
    pwd: false,
}

$(function () {
    // 用户名验证
    phoneFront($('#main .main-login-name input'), $('#main .main-login-name'));
    // 密码验证
    pswFront($('#main .main-login-pwd input'), $('#main .main-login-pwd'));
    // 登录
    $('#btn').click(function(){
        login();
    })
})

// 用户名验证
function phoneFront(input, borderColor) {
    let onOff = 0; // 获取光标边框颜色
    input.focus(function () {
        if (onOff == 0) {
            borderColor.css({ 'border': '1px #007dff solid' })
        } else {
            borderColor.css({ 'border': '1px red solid' })
        }
    }).blur(function () {
        let reg = /^1\d{10}$/;
        if (reg.test($(this).val())) {
            borderColor.css({ 'border': '1px solid transparent' }).prev().children().css({ display: 'none' }).children().last().html('');
            onOff = 0;
            regStr.phone = true;
        } else if ($(this).val() == '') {
            borderColor.css({ 'border': '1px solid transparent' }).prev().children().css({ display: 'none' }).children().last().html('');
            onOff = 0;
            regStr.phone = false;
        } else {
            borderColor.css({ 'border': '1px solid red' }).prev().children().css({ display: 'block' }).children().last().html('手机号不正确');
            onOff = 1;
            regStr.phone = false;
        }
    }).keyup(function () {
        borderColor.css({ 'border': '1px #007dff solid' }).prev().children().css({ display: 'none' });
        // 电话号中不能输入数字外别的东西
        $(this).val($(this).val().replace(/[^0-9]+/g, ''));
        onOff = 1;

        pwdEye();
    })
}

// 清空确认密码，改变btn按钮点击状态
function pwdEye(){
    $('#main .main-login-pwd input').val('').next().css({ color: 'rgba(0, 0, 0, .5)' }).removeClass('iconyanjing_unactive');
    $(this).prop({ type: 'password' })
    eye = false;;
    $('#btn').prop({disabled:true}).css({backgroundColor:'rgba(202,20,29,.3)'});
}

// 密码验证
function pswFront(input, borderColor) {
    var eye = false;  // 眼睛能不能点击的全局变量(开关)
    let onOff = 0; // 获取光标边框颜色
    input.focus(function () {
        if (onOff == 0) {
            borderColor.css({ 'border': '1px #007dff solid' })
        } else {
            borderColor.css({ 'border': '1px red solid' })
        }
    }).blur(function () {
        if ($(this).val() != '') {
            borderColor.css({ 'border': '1px solid transparent' }).prev().children().first().children().css({ display: 'none' }).children().last().html('');
            onOff = 0;
            regStr.pwd = true;
        } else {
            borderColor.css({ 'border': '1px solid red' }).prev().children().first().children().css({ display: 'block' }).children().last().html('密码不能为空');
            onOff = 1;
            regStr.pwd = false;
        }


        // 判断前端每一项是否都是true,如果是才可以点击注册按钮,否则就禁用
        let index = 0;  // 每一项前端验证的计数开关
        for (let key in regStr) {
            if (regStr[key]) {
                index++;
            }
        }

        if (index == 2) {
            $('#btn').prop({ disabled: false }).css({ backgroundColor: 'rgba(202,20,29,1)' })
        } else {
            $('#btn').prop({ disabled: true }).css({ backgroundColor: 'rgba(202,20,29,.3)' })
        }

    }).keyup(function () {
        if ($(this).val() != '') {
            $('#main .main-login-pwd .iconyanjingbukejian-').css({ color: 'black' });
            eye = true; // 键盘抬起眼睛可以点击
        } else {
            $('#main .main-login-pwd .iconyanjingbukejian-').css({ color: 'rgba(0, 0, 0, .5)' }).removeClass('iconyanjing_unactive');
            $(this).prop({ type: 'password' })
            eye = false;
        }
        onOff = 1;
    }).next().click(function () {
        if (eye == true) {
            if ($(this).prev().prop('type') == 'password') {
                $(this).addClass('iconyanjing_unactive').prev().prop({ type: 'text' })
            } else {
                $(this).removeClass('iconyanjing_unactive').prev().prop({ type: 'password' })
            }
        }

    })
}


// 登录
function login(){
    $.post({
        url: '../server/login.php',
        data: { 
            username: $('#main .main-login-name input').val(),  
            userpwd: $('#main .main-login-pwd input').val()
        },
        dataType: 'json',
        success: function (res) {
            if (res == 1) {
                let str = decodeURIComponent(window.location.search);
                str = str.substr(1);
                window.location.href = str;
                setCookies('username' ,$('#main .main-login-name input').val() , 7*24*60*60)
                
            }
        }
    })
}