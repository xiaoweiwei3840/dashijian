get()

function get() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        success: function (res) {
            if (res.status != 0) {
                return layer.alert('登录失败！')
            }
            console.log(res)

            // 渲染用户的头像
            renderAvatar(res.data)

            function renderAvatar(user) {
                // 1. 获取用户的名称
                var name = user.nickname || user.username
                // 2. 设置欢迎的文本
                $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
                // 3. 按需渲染用户的头像
                if (user.user_pic !== null) {
                    // 3.1 渲染图片头像
                    $('.layui-nav-img')
                        .attr('src', user.user_pic)
                        .show()
                    $('.text-avatar').hide()
                } else {
                    // 3.2 渲染文本头像
                    $('.layui-nav-img').hide()
                    var first = name[0].toUpperCase()
                    $('.text-avatar')
                        .html(first)
                        .show()
                }
            }
            // function touxiang() {
            //     var name = res.data.nickname ||  res.data.username
            //         $('#welcome').html('欢迎&nbsp&nbsp' + res.data.username)

            //     if (res.data.user_pic) {
            //         $('.layui-nav-img').attr('src', res.data.user_pic).show()
            //         $('.text-avatar').hide()
            //     } else {
            //         $('.layui-nav-img').hide();
            //         $('.text-avatar').html(res.data.username[0].toUpperCase()).show();
            //     }
            // };
            // touxiang()
        }
    });

}

$('#tuichu').on('click', function (e) {
    console.log(1);
    layer.confirm('确定退出登录?', {
        icon: 3,
        title: '提示'
    }, function (index) {
        //do something
        // 1. 清空本地存储中的 token
        localStorage.removeItem('token')
        // 2. 重新跳转到登录页面
        location.href = '/login.html'

        // 关闭 confirm 询问框
        layer.close(index)
    })

})