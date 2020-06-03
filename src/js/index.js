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