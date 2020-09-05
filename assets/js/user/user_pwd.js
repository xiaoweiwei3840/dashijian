$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samepwd: function (value) {
            if (value == $('#yuanmima').val()) {
                return '新旧密码不能相同!'
            }
        },
        repwd: function (value) {
            if (value != $('#xinmima').val()) {
                return '密码不一致!'
            }
        }
    })


    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status!=0) {
                    return layer.msg('修改密码失败')
                }
                layer.msg('修改密码成功')
            }
        });
        $('.layui-form')[0].reset()
})





















})