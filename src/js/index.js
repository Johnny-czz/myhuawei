// 轮播图
var mySwiper = new Swiper('.swiper-container', {
    // direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项

    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
    },

    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: true,
    effect: 'fade',
    fadeEffect: {
        crossFade: true,
    },
    pagination :{
        el: '.swiper-pagination',
        clickable :true,
      },
})

// 二级菜单
$('.nav-ul>li').removeClass('active').parent().next().find('li').removeClass('active')
$('.nav-ul>li').mouseenter(function(){
    $(this).addClass('active').siblings().removeClass('active').parent().css({borderRadius:'10px 0 0 10px'}).next().find('li').removeClass('active').eq($(this).index()).addClass('active');          
}).mouseleave(function(){
    $(this).removeClass('active').parent().css({borderRadius:'10px'}).next().find('li').removeClass('active')
})

$('.nav-ol>li').mouseenter(function(){
    $(this).addClass('active').siblings().removeClass('active').parent().prev().css({borderRadius:'10px 0 0 10px'}).find('li').removeClass('active').eq($(this).index()).addClass('active');  
}).mouseleave(function(){
    $(this).removeClass('active').parent().prev().css({borderRadius:'10px'}).find('li').removeClass('active')
})


// 登录
$('[name="login"]').click(function(){
    window.location.href = `./pages/login.html?${window.location.href}`;
  })

// 退出登录
$('[name="back"]').click(function(){
    setCookies('username' , '1' , -1);
    window.alert('您已经退出登录了');
  })

// 购物车判断
console.log($('[name="car"]'))
$('[name="car"]').click(function(){
    console.log($('[name="car"]'))
    const cookieObj = getCookieObj(document.cookie);
    if( cookieObj.username === undefined ){
        let bool = window.confirm('您还没有登录,点击确定,跳转登录页面');
        if(bool === true){
          window.location.href = `./pages/login.html?${window.location.href}`;
        }else{
          return false;
        }
    }else {
        window.location.href = `./pages/cart.html`;
    }
})

