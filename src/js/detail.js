// 定义一个变量,来存储 ajax的请求结果
let result = [];

let str = decodeURIComponent(window.location.search.substr(1));
const arr = str.split('=');

// 定义一个商品数量
let num = 1


$.ajax({
  url: '../server/goods_detail.php',
  type: 'post',
  data: { goods_id: arr[1] },
  dataType: 'json',
  success: function (res) {

    result = res;

    // 根据数据,生成页面
    let str = '';
    str = `<div class="l img" name="big"><img class="j" src="${res.goods_big_logo}" alt=""></div>
    <div class="l text">
      <h2>${res.goods_name}</h2>
      <p><span>价 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 格</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>￥</span><span>${res.goods_price}</span></p>
      <div class="num">
        <div name="num">${num}</div>
        <div name="odd">+</div>
        <div name="lost">-</div>
      </div>
      <button name="inCar">加入购物车</button>
    </div>
   
    `;
    let str1 = ` <div class="column container">
        ${res.goods_introduce}   
    </div>`

    // 放大镜实验
    $('.panel').on('mousemove', function(e){
      if(e.target.className === 'j'){
        console.log(`${res.goods_name}`)
      }
    })

    // 将字符串内容,写入到标签中
    $('.panel').html(str);

    $('#column').html(str1);
  }
})

$('.panel').on('click', function (e) {
  if (e.target.getAttribute('name') === 'odd') {
    num++;
    $('[name="num"]').html(num);
  }
  if (e.target.getAttribute('name') === 'lost') {
    
    if (num <= 1) {
      num = 1;
    } else {
      num--;
    }
    $('[name="num"]').html(num);
  }
})

$('.panel').on('click', '[name="inCar"]', function () {
  const cookieObj = getCookieObj(document.cookie);

  if (cookieObj.username === undefined) {
    // 没有登录,弹出确认框
    let bool = window.confirm('您还没有登录,点击确定,跳转登录页面');
    if (bool === true) {
      window.location.href = `../pages/login.html?${window.location.href}`;
    } else {
      // 如果点击取消,后面的加入购物车的程序,也不执行了
      return false;
    }
  } else if (cookieObj.username) {
    // 跳转购物车页面
    window.location.href = './cart.html';
    if (localStorage.getItem('name') === null) {
      result.num = num;
      result.buy = true
      var arr = [];
      arr.push(result);
    } else {

      let bool = true;
      var arr = JSON.parse(localStorage.getItem('name'));
      arr.forEach(function (item) {
        if (item.goods_id === result.goods_id) {
          item.num = parseInt(item.num) + num;
          bool = false;
        }
      })
      if (bool === true) {
        result.buy = true;
        result.num = $('[name="num"]').html();
        arr.push(result);
      }

    }
    localStorage.setItem('name', JSON.stringify(arr));
  }
})


// 登录
$('[name="btn"]').click(function () {
  window.location.href = `./login.html?${window.location.href}`;
});