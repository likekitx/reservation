layui.use(['form','jquery','layedit','carousel'], function() {
    var form = layui.form;
    var $ = layui.jquery;
    var layer = layui.layer;
    var layedit = layui.layedit;
    //引入layui轮播图实现
    var carousel = layui.carousel;
    //声明账号变量
    let account;
    //声明boolean变量，用来判断协议是否勾选
    let flag = false;


    //登陆按钮的声明
    let but = $('#buttonSubmit');
    //footer联系我们的单击事件
    $('#connect').on('click', function(){
        layer.tips('如有任何问题请联系西航张泽旭，电话17391522704！', '#connect', {
            tips: [1, '#ee8a4f']
        },1000);
    });
    //客服电话的单击事件
    $('#service').on('click', function(){
        layer.tips('客服电话：17391522704！', '#service', {
            tips: [1, '#4ed4f1']
        },1000);
    });
    //关于我们的单机事件
    $('#about').on('click', function(){
        layer.tips('西航下下饭的使命是“帮大家吃得更好”。作为一家美食电子商务服务平台，公司聚焦“Food +Platform”战略，以“吃”为核心，通过科技创新，和广大商户与各类合作伙伴一起，努力为消费者提供品质生活，推动生活服务业需求侧和供给侧数字化升级。未来的某年某月某日，西航下下饭将会正式在港交所挂牌上市。西航下下饭将始终坚持以客户为中心，不断加大在科技研发方面的投入，更好承担社会责任，更多创造社会价值，与广大合作伙伴一起发展共赢。', '#about', {
            tips: [1, '#a2ec4c']
        },1000);
    });
    //致辞的单击事件
    $('#excuse').on('click', function(){
        layer.tips('感谢曹蛋蛋友情提供技术支持', '#excuse', {
            tips: [1, '#ec728e']
        },1000);
    });
    //登陆协议，曹蛋蛋协议的单击事件封装
    $('#kitten').on('click', function(){
        layer.tips('您可以通过以下方式与我们联系，我们将在若干天内答复您的请求：\n' +
            '1、您可以通过西航下下饭网站提供的在线联系方式与我们联系；\n' +
            '2、您可以联系西航下下饭的客服电话进行反馈（西航下下饭网：153 8931 1655）。\n' +
            '3、我们还设立了专门的个人信息保护团队，您可以联系我们的个人信息保护负责人。', '#kitten', {
            tips: [1, '#ec728e']
        },1000);
    });
    //西航下下饭协议的单击事件封装
    $('#Shimoiizaka').on('click', function(){
        layer.tips('本《西航下下饭用户服务协议》（以下简称“本服务协议”）是您与西航下下饭之间就注册西航下下饭用户账号及使用西航下下饭的各项服务等相关事宜所订立的协议。为使用西航下下饭的服务，您应当仔细阅读并遵守本服务协议下的全部内容，特别是涉及免除或者责任限制的条款，该类条款可能以黑体加粗或加下划线的形式提示您重点注意。除非您已阅读并接受本服务协议所有条款，否则您将不能注册西航下下饭账号或使用西航下下饭的服务，如您不同意本服务条款的任意内容，请勿注册或使用西航下下饭的服务，并应立即停止注册账号。如您对本服务协议的内容（特别是涉及免除或者责任限制的条款）有任何疑义，可随时按照本服务协议中列明的联系方式与我们联系，我们将根据您的要求为您进一步解释和说明相关内容。如您勾选“我同意《西航下下饭用户服务协议》”并通过注册账号或其他任何方式使用或接受西航下下饭的任何服务，即视为您已阅读并同意本服务协议，自愿接受本服务协议的所有内容的约束。请您在决定注册或使用服务前再次确认您已知悉并完全理解本服务协议的所有内容。'
            , '#Shimoiizaka', {
            tips: [1, '#ec728e']
        },1000);
    });

    //轮播图
    carousel.render({
        elem: '#img',
        width: '830px',
        height: '564px',
        anim: 'default', //切换动画方式
        autoplay: true,
        indicator: 'none',
    });
    //监听监听协议是否被选中
    form.on('switch(close)', function(data){
        if(this.checked === true){
            layer.msg('同意', {
                icon: 1,
                //弹出位置
                offset: 'auto',
            });
            flag = true;
        }else{
            layer.msg('不同意', {
                icon: 2,
                //弹出位置
                offset: 'auto',
            });flag = false;
        }
    });
    //忘记密码
    $('.forget').click(function (event) {
        $('.register').css({
            'display':'none',
        })
        $('.forgetPassword').css({
            'display':'inline',
        })
    })
    //忘记密码页面的上一步按钮的单单击事件
    $('.last').click(function (event) {
        $('.register').css({
            'display':'inline',
        })
        $('.forgetPassword').css({
            'display':'none',
        })
    });
    //自定义验证规则
    form.verify({
        account: [
            /^[^0]\d{0,11}$/,
            '账号格式错误，只能是数字且不超过12位'
        ]
        ,name: [
            /^[\S]{1,9}$/
            ,'名字不能有空格，且长度不超过10位'
        ],
        password: [
            /^[\S]{6,20}$/
            ,'密码必须6到20位，且不能出现空格'
        ],
    });
    //点击下一步的单击事件
    form.on('submit(next)',function (data) {
        let field = data.field;
        let dat = {name:field.name,phone:field.phone,account:field.account};
        account = field.account;
        $.ajax({
            url: $("#PageContext").val()+'/LoginServlet?pid=16',
            type: 'get',
            dataType: 'json',
            data: dat,
            success: function (data){
                if(data.message === 'true'){

                    layer.msg('验证通过！', {
                        icon: 6,
                        //弹出位置
                        offset: 'auto',
                        anim: 4,
                        skin: 'layui-layer-molv'
                    });
                    setTimeout(function () {
                        $('.forgetPassword').css({
                            'display':'none',
                        });
                        $('.updatePassword').css({
                            'display':"inline"
                        })
                    },500);
                }else if(data.message === 'false'){
                    layer.msg('验证未通过，请检查输入信息是否有误！', {
                        icon: 5,
                        //弹出位置
                        offset: 'auto',
                        anim: 4,
                        skin: 'layui-layer-molv'
                    });
                }
            },
            error : function (data) {
                layer.msg('账号或密码错误！',{
                    time: 0,
                    anim: 3,
                    skin: 'layui-layer-molv',
                    icon: 3
                });
            }
        });
    })
    //点击提交的单击事件
    form.on('submit(go)',function (data) {
        let field = data.field;
        let old = field.old;
        let newPass = field.new;
        let dat = {newPass:newPass,account:account}
        if(old === newPass){
            $.ajax({
                url: $("#PageContext").val()+'/LoginServlet?pid=17',
                type: 'get',
                dataType: 'json',
                data: dat,
                success: function (data) {
                    if(data.message === 'true'){
                        layer.msg('修改成功，将跳转到登陆页',{
                            icon: 6,
                            //弹出位置
                            offset: 'auto',
                            anim: 4,
                            skin: 'layui-layer-molv'
                        });
                        setTimeout(function () {
                            location.href = $("#PageContext").val()+'/jsp/login.jsp';
                        },500);
                    }else{
                        layer.msg('不能与近期密码一致，请重新输入！', {
                            icon: 5,
                            //弹出位置
                            offset: 'auto',
                            anim: 4,
                            skin: 'layui-layer-molv'
                        });
                    }
                },
                error: function (data) {
                    layer.msg('密码的长度或者格式有误，请重新输入！',{
                        time: 0,
                        anim: 3,
                        skin: 'layui-layer-molv',
                        icon: 2
                    });
                }
            });
        }else {
            layer.msg('两次输入密码不同，请重新输入！',{
                icon: 7,
                anim: 3,
                skin: 'layui-layer-molv',
                time: 0
            })
        }
    })
    //登陆功能实现
    but.click(function (event) {
        if(flag){
            $.ajax({
                url: $("#PageContext").val()+"/LoginServlet?pid=15",
                type: 'get',
                contentType: 'json',
                data: {account:$('input[name = "username"]').val(),password:$('input[name = "password"]').val()},
                success: function (data) {
                    if(data.message === "boss"){
                        layer.msg('欢迎老板光临！', {
                            icon: 1,
                            //弹出位置
                            offset: 'auto',
                            anim: 4,
                            skin: 'layui-layer-molv'
                        });
                        setTimeout(function () {
                            location.href = $("#PageContext").val()+'/jsp/boss.jsp'
                        },800);
                    }else if(data.message === "true"){
                        layer.msg('登陆成功！', {
                            icon: 1,
                            //弹出位置
                            offset: 'auto',
                            anim: 4,
                            skin: 'layui-layer-molv'
                        });
                        setTimeout(function () {
                            location.href = $("#PageContext").val()+'/index.jsp'
                        },1000);
                    }else{
                        layer.msg('验证未通过，请检查输入信息是否有误！',{
                            icon: 5,
                            time: 0,
                            anim: 3,
                            skin: 'layui-layer-molv',
                        });
                    }
                },
                error: function (data) {
                    layer.msg('账号或密码错误！', {
                        icon: 2,
                        //弹出位置
                        offset: 'auto',
                    })
                }
            });
        }else{
            layer.msg('请勾选协议！', function () {})
        }
    });
    //点击图标回到首页
    $('.headIcon').on('click',function () {
        location.href = $("#PageContext").val()+'/index.jsp'
    })
});