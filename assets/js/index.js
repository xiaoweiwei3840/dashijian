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



$('#tuichu').on('click', function (e) {
    console.log(1);
    layer.confirm('确定退出登录?', {
        icon: 3,
        title: '提示'
    }, function (index) {
        localStorage.removeItem('token')
    
        location.href = '/login.html'
        layer.close(index)
    })

})