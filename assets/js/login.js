$(function () {

    $('#link_reg').on('click', function () {

        $('.login-box').hide()
        $('.reg-box').show()

    })

    $('#link_login').on('click', function () {

        $('.login-box').show()
        $('.reg-box').hide()

    })

    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var password = $('.mima').val()
            if (password != value) {
                return "密码不一致"
            }
        }
    })

    $('#layui-form1').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: "post",
            url: "/api/reguser",
            data: {
                username: $('.yonghu').val(),
                password: $('.mima').val()
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.alert(res.message)
                }
                layer.alert('注册成功！')
                $('#link_login').click()

            }
        });


    })

    $('#layui-form2').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: "post",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.alert('登录失败！')
                }
                layer.alert('登录成功！')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        });

    })


















})