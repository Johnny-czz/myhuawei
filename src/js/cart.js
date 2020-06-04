
    // 获取 localStorage 中的数据信息
    const cateArr = JSON.parse(localStorage.getItem('name'));
    setPage(cateArr);

    function setPage(array) {
      let NUM = 0;
      let TYPE = 0;
      let PAY = 0;
      // 第一部分,是页面的上方内容,是固定内容
      let str = `
      <div class="select">
        <button name="all">反选</button> 
        <span>商品</span>
      </div>`

      // 第二部分是商品的信息部分,是根据 购物车信息 循环遍历生成的

      array.forEach(function (item) {
        str += `  <div class="list clear">
        <input name="checked" goods_id="${item.goods_id}" type="checkbox" ${item.buy === true ? 'checked' : ''}>
        <div class="image"><img src="${item.goods_small_logo}" alt="购买的商品"></div>
        <p>${item.goods_name}</p>
        
        <span>￥${item.goods_price}</span>
        <span name="del" goods_id="${item.goods_id}">删除</span>
        <ul>
          <button name="lost" goods_id="${item.goods_id}" class="btn btn-default" ${ item.num == 1 ? 'disabled' : '' }>-</button>
          <li>${item.num}</li>
          <button name="odd" goods_id="${item.goods_id}" class="btn btn-default" ${ item.num == item.goods_number ? 'disabled' : '' }>+</button>
        </ul>
        
      </div>`;
      
      
        if(item.buy === true){
          TYPE++;  
          console.log(NUM)        
          NUM = parseInt(NUM) + parseInt(item.num);  
          PAY += item.num * item.goods_price;  
        }
      
      })
      // 第三部分
      str += `
                <div class="close">
                    <p>总计 ￥ ${ parseInt(PAY*100)/100 } 已选择 ${TYPE} 种商品 总计 ${NUM} 件商品</p>
                    <button>立即结算</button>
                </div>     
      `;


      $('#main .container').html(str);

    };

    const oDiv = document.querySelector('#main .container');
    oDiv.addEventListener('click' , function(e){
      // 反选
      if(e.target.getAttribute('name') === 'all'){
        // 给数组中的所有数据,buy属性都设定为原始数值取反
        cateArr.forEach(function(item){
          item.buy = !(item.buy);
        })
      }

      if(e.target.getAttribute('name') === 'checked'){
        let goods_id = e.target.getAttribute('goods_id');
        cateArr.forEach(function(item){
          if(item.goods_id === goods_id){
            item.buy = $(e.target).prop('checked');
          }
        })

      }

      // 删除
      if(e.target.getAttribute('name') === 'del'){
        let goods_id = e.target.getAttribute('goods_id');
        cateArr.forEach(function(item , key){
          if(item.goods_id === goods_id){
            cateArr.splice(key,1);
          }
        })
      }

      // 添加 按钮
      if(e.target.getAttribute('name') === 'odd'){
        let goods_id = e.target.getAttribute('goods_id');
        cateArr.forEach(function(item , key){
          if(item.goods_id === goods_id){
            item.num++;
          }
        })
      }

      // 减少 按钮
      if(e.target.getAttribute('name') === 'lost'){
        let goods_id = e.target.getAttribute('goods_id');
        cateArr.forEach(function(item , key){
          if(item.goods_id === goods_id){
            item.num--;
          }
          
        })
      }

      // 将新的数组,写入到页面中
      setPage(cateArr);
      // 把新数组的数据,写入到 localStorage 中
      localStorage.setItem('name' , JSON.stringify(cateArr) );
    })

    


// 登录
$('[name="login"]').click(function(){
    window.location.href = `./login.html?${window.location.href}`;
  })