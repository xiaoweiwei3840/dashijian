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

            function touxiang() {
                if (res.data.username != '') {
                    $('#welcome').html('欢迎&nbsp&nbsp' + res.data.username)
                }
                if (res.data.user_pic) {
                    $('.layui-nav-img').attr('src', res.data.user_pic).show()
                    $('.text-avatar').hide()
                } else {
                    $('.layui-nav-img').hide();
                    $('.text-avatar').html(res.data.username[0].toUpperCase()).show();
                }
            };
            touxiang()
        }
    });

}



<<<<<<< HEAD
$('.layui-nav-item').on('click', function (e) {
    // e.preventDefault();
=======
$('#tuichu').on('click', function (e) {
>>>>>>> index
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