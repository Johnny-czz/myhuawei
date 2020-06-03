// 后端是否存在数据(查询无数据设置为true,注册时做判断才可以写入)
let regFront = false;
// 所有前端验证是否通过开关(所有前端验证通过才可以发送ajax写入请求)
let regStr = {
    phone: false,
    vc: false,
    pwd: false,
    pwd2: false
}

var eye = false;  // 眼睛能不能点击的全局变量(开关)

$(function () {
    // 用户名验证
    phoneFront($('#main .message-phone-phone input'), $('#main .message-phone-phone'));
    // 验证码验证
    vcFront($('#main .message-vc-vc input'), $('#main .message-vc-vc'));
    // 密码验证
    pswFront($('#main .message-password-psw input'), $('#main .message-password-psw'));
    // 确认密码验证
    psw2Front($('#main .message-password2-psw input'), $('#main .message-password2-psw'));
    // 注册
    $('#btn').click(function(){
        reg();
    })
})


// 用户名前端验证
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
            borderColor.css({ 'border': '1px solid transparent' }).next().css({ 'display': 'none' });
            onOff = 0;
            regStr.phone = true;
            phoneBack(); // 前端验证执行完成后执行后端验证

        } else if ($(this).val() == '') {
            borderColor.css({ 'border': '1px solid transparent' }).next().css({ 'display': 'none' });
            onOff = 0;
            regStr.phone = false;
        } else {
            borderColor.css({ 'border': '1px solid red' }).next().css({ 'display': 'block', color: 'red' }).children().last().html('手机号不正确');
            regStr.phone = false;
        }
    }).keyup(function () {
        borderColor.css({ 'border': '1px #007dff solid' }).next().css({ display: 'none' });
        // 电话号中不能输入数字外别的东西
        $(this).val($(this).val().replace(/[^0-9]+/g, ''));
        // 重新输入电话号禁用验证码按钮
        $('#vc').css({ color: 'rgba(0,125,255,.5)' }).prop({ disabled: true }).prev().css({ display: 'none' })
        onOff = 1;

        // 不能返回 改数据,改数据就要重新输入确认密码
        pwd2Eye();        
    })
}


// 用户名后端验证
function phoneBack() {
    $.get({
        url: '../server/reg_inquire.php',
        data: { username: $('#main .message-phone-phone input').val() },
        dataType: 'json',
        success: function (res) {
            if (res == 1) {
                $('#main .message-phone .warning').css({ 'display': 'block', 'color': 'green' }).children().last().html('此手机号未注册,请您开始注册');

                // 后端验证成功用户名才能点击验证码刷新按钮
                $('#vc').prop({ disabled: false }).css({ color: 'rgba(0,125,255,1)' }).click(function () {
                    $(this).prev().css({ display: 'block' }).html(vcAuto())
                });
                regFront = true;
            } else {
                $('#main .message-phone .warning').css({ 'display': 'block', 'color': 'red' }).children().last().html('当前手机号已注册');
                regFront = false;
            }
        }
    })
}

// 生成验证码
var str = '0123456789';
function vcAuto() {
    var vc = ''
    for (let i = 0; i < 6; i++) {
        var num = parseInt(Math.random() * str.length);
        vc += num;
    }
    return vc;
}


// 验证码验证
function vcFront(input, borderColor) {
    let onOff = 0;
    input.focus(function () {
        if (onOff == 0) {
            borderColor.css({ 'border': '1px #007dff solid' })
        } else {
            borderColor.css({ 'border': '1px red solid' })
        }
    }).blur(function () {
        if (input.val() == $('#vc').prev().html() && input.val() != '') {
            borderColor.css({ 'border': '1px solid transparent' }).next().css({ 'display': 'none' });
            onOff = 0;
            regStr.vc = true;
        } else if(input.val() == ''){
            borderColor.css({ 'border': '1px solid transparent' }).next().css({ 'display': 'none' });
            onOff = 0;
            regStr.vc = false;
        }else {
            borderColor.css({ 'border': '1px solid red' }).next().css({ 'display': 'block', color: 'red' });
            $(this).next().html(vcAuto());
            onOff = 1;
            regStr.vc = false;
        }
    }).keyup(function () {
        borderColor.css({ 'border': '1px #007dff solid' }).next().css({ display: 'none' });
        // 电话号中不能输入数字外别的东西
        $(this).val($(this).val().replace(/[^0-9]+/g, ''));

        pwd2Eye();
    })
}


// 密码验证(至少八个字符(至少一个字母一个数字)) ---- 密码和确认密码重复很多可以封装,暂且不封有时间封
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
        let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (reg.test($(this).val())) {
            borderColor.css({ 'border': '1px solid transparent' }).next().css({ 'display': 'none' });
            onOff = 0;
            regStr.pwd = true;
        } else if($(this).val() == ''){
            borderColor.css({ 'border': '1px solid transparent' }).next().css({ 'display': 'none' });
            onOff = 0;
            regStr.pwd = false;
        }
         else {
            borderColor.css({ 'border': '1px solid red' }).next().css({ 'display': 'block', color: 'red' });
            regStr.pwd = false;
        }
    }).keyup(function () {
        if($(this).val() != ''){
             $('#main .message-password-psw .iconyanjingbukejian-').css({ color: 'black' });
            eye = true; // 键盘抬起眼睛可以点击
        }else{
            $('#main .message-password-psw .iconyanjingbukejian-').css({ color: 'rgba(0, 0, 0, .5)' }).removeClass('iconyanjing_unactive');
            $(this).prop({ type: 'password' })
            eye = false;
        }
        
        borderColor.css({ 'border': '1px #007dff solid' }).next().css({ display: 'none' });
        onOff = 1;

        pwd2Eye();
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

// 确认密码验证(必须和密码一样)
function psw2Front(input, borderColor) {  
    let onOff = 0; // 获取光标边框颜色
    input.focus(function () {
        if (onOff == 0) {
            borderColor.css({ 'border': '1px #007dff solid' })
        } else {
            borderColor.css({ 'border': '1px red solid' })
        }
    }).blur(function () {
        if ($(this).val() == $('#main .message-password-psw input').val()) {
            borderColor.css({ 'border': '1px solid transparent' }).next().css({ 'display': 'none' });
            onOff = 0;
            regStr.pwd2 = true;
        }else if($(this).val() == ''){
            borderColor.css({ 'border': '1px solid transparent' }).next().css({ 'display': 'none' });
            onOff = 0;
            regStr.pwd2 = false;
        }else {
            borderColor.css({ 'border': '1px solid red' }).next().css({ 'display': 'block', color: 'red' });
            regStr.pwd2 = false;
        }

        // 判断前端每一项是否都是true,如果是才可以点击注册按钮,否则就禁用
        let index = 0;  // 每一项前端验证的计数开关
        for(let key in regStr){
            if(regStr[key]){
                index++;
            }
        }
        if(index == 4){
            if(regFront){  // 判断用户名查询是否存在,存在再发送写入请求
                $('#btn').prop({disabled:false}).css({backgroundColor:'rgba(0,125,255,1)'});
            }           
        }else{
            $('#btn').prop({disabled:true}).css({backgroundColor:'rgba(0,125,255,.3)'});
        }
    }).keyup(function () {
        if($(this).val() != ''){
             $('#main .message-password2-psw .iconyanjingbukejian-').css({ color: 'black' });
            eye = true; // 键盘抬起眼睛可以点击
        }else{
            $('#main .message-password2-psw .iconyanjingbukejian-').css({ color: 'rgba(0, 0, 0, .5)' }).removeClass('iconyanjing_unactive');
            $(this).prop({ type: 'password' })
            eye = false;
        }
        
        borderColor.css({ 'border': '1px #007dff solid' }).next().css({ display: 'none' });
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

// 清空确认密码，改变btn按钮点击状态
function pwd2Eye(){
    $('#main .message-password2-psw input').val('').next().css({ color: 'rgba(0, 0, 0, .5)' }).removeClass('iconyanjing_unactive');
    $(this).prop({ type: 'password' })
    eye = false;;
    $('#btn').prop({disabled:true}).css({backgroundColor:'rgba(0,125,255,.3)'});
}

// 注册
function reg(){
    $.post({
        url: '../server/reg.php',
        data: { 
            username: $('#main .message-phone-phone input').val(),  
            userpwd: $('#main .message-password-psw input').val()
        },
        dataType: 'json',
        success: function (res) {
            if (res == 1) {
               window.location.href = './login.html';
            }
        }
    })
}