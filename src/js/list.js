let str = decodeURIComponent(window.location.search);
str = str.substr(1);
const arr = str.split('=');

getAjax(1);
function getAjax(page) {
    $.ajax({
        url: '../server/goods_list.php',
        data: {
            cat_one_id: arr[1],
            page: page,
            line: 10,
        },
        type: 'get',
        dataType: 'json',
        success: function (res) {
            console.log(res);
            let str = '';
            res.forEach(function (item) {
                str += `<li>
              <img src="${item.goods_big_logo}" alt="商品">
              <p>${item.goods_name}</p>
              <p>￥<span>${item.goods_price}</span></p>
              <span>暂无评价</span>
            </li>`;

            })

            $('#main-ul').html(str);

            $('.M-box').pagination({
                mode: 'fixed',
                pageCount: res[0].sumPage,
                totalData: res[0].row,
                current: res[0].page,
                showData: 10,
               // activeCls : 'active',        // 点中标签的样式
                coping: true,
                homePage: '首页',
                endPage: '末页',
                prevContent: '上页',
                nextContent: '下页',
                    callback : function(result){    
                      let p = result.getCurrent();
                      getAjax(p);
                    }
            });
        }
    })
}
