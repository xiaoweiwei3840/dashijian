var form = layui.form

$(function () {
    

    form.verify({
      nickname: function(value) {
        if (value.length > 6) {
          return '昵称长度必须在 1 ~ 6 个字符之间！'
        }
      }
    })

getuserinfo()
function getuserinfo() {
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        success: function (res) {
            if (res.status != 0) {
            return layer.msg('获取信息失败')
            }
            console.log(res);
            form.val('userinfo',res.data)
        }
    });
}
$('#resetbtn').on('click', function (e) {
    e.preventDefault();
    getuserinfo()
})


    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('提交失败')
                }
                layer.msg('提交成功')
            }
        });
        $(this)[0].reset()
        window.parent.get()
})

    
    
    
    
    

    
})