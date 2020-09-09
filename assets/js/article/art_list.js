var form = layui.form

var q = {
    pagenum: 1, // 页码值，默认请求第一页的数据
    pagesize: 2, // 每页显示几条数据，默认每页显示2条
    cate_id: '', // 文章分类的 Id
    state: '' // 文章的发布状态
}

getlist()

function getlist() {
    $.ajax({
        type: "GET",
        url: "/my/article/list",
        data: q,
        success: function (res) {
            if (res.status != 0) {
                return layer.msg('获取文章失败')
            }
            console.log(res);
            var shuju = template('tpl-table', res)
            $('tbody').html(shuju)

            fenye(res.total)
          

        }
    });

}

template.defaults.imports.dataFormat = function (date) {
    const dt = new Date(date)

    var y = dt.getFullYear()
    var m = padZero(dt.getMonth() + 1)
    var d = padZero(dt.getDate())

    var hh = padZero(dt.getHours())
    var mm = padZero(dt.getMinutes())
    var ss = padZero(dt.getSeconds())

    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
}

// 定义补零的函数
function padZero(n) {
    return n > 9 ? n : '0' + n
}

getfenlei()

function getfenlei() {
    $.ajax({
        type: "GET",
        url: "/my/article/cates",
        success: function (res) {
            if (res.status != 0) {
                return layer.msg('获取文章失败')
            }
            console.log(res);

            var fenlei = template('fenlei', res)
            $('#fenleiliebiao').html(fenlei)
            form.render()

        }
    });
}

$('#form-search').on('submit', function (e) {
    e.preventDefault();
    var cate_id = $('[name=cate_id]').val()
    var state = $('[name=state]').val()
    // 为查询参数对象 q 中对应的属性赋值
    q.cate_id = cate_id
    q.state = state
    getlist()

})

function fenye(total) {
    var laypage = layui.laypage;
        
        //执行一个laypage实例
        laypage.render({
          elem: 'fenye', //注意，这里的 test1 是 ID，不用加 # 号
          count: total, //数据总数，从服务端得到
          limit: q.pagesize, // 每页显示几条数据
          curr: q.pagenum, // 设置默认被选中的分页
          limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
              if (first != true) {
                getlist()
              }
            //   
            },
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'] 
        });
}
 
$('body').on('click', '#delbtn', function () {
    var id = $(this).attr('data-id')
    
    $.ajax({
    type: "GET",
    url: "/my/article/delete/"+ id,
    success: function (res) {
        if (res.status != 0) {
            return layer.msg('删除失败')
        }
        layer.msg('删除文章成功！')
        getlist()
    }
});

})

        
     
