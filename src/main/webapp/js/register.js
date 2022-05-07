layui.use(['form','jquery','layedit','carousel'], function() {
    var form = layui.form;
    var $ = layui.jquery;
    var layer = layui.layer;
    var layedit = layui.layedit;
    var carousel = layui.carousel;
    //学校下拉框
    var school = $('#school');
    //学院下拉框
    var college = $('#college');
    //专业下拉框
    var major = $('#major');

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
        // layer.tips('您可以通过以下方式与我们联系，我们将在若干天内答复您的请求：\n' +
        //     '1、您可以通过西航下下饭网站提供的在线联系方式与我们联系；\n' +
        //     '2、您可以联系西航下下饭的客服电话进行反馈（西航下下饭网：153 8931 1655）。\n' +
        //     '3、我们还设立了专门的个人信息保护团队，您可以联系我们的个人信息保护负责人。', '#kitten', {
        //     tips: [1, '#ec728e']
        // },1000);
        location.href = $("#PageContext").val()+'/jsp/protocolDan.jsp';
    });
    //西航下下饭协议的单击事件封装
    $('#Shimoiizaka').on('click', function(){
        // layer.tips('本《西航下下饭用户服务协议》（以下简称“本服务协议”）是您与西航下下饭之间就注册西航下下饭用户账号及使用西航下下饭的各项服务等相关事宜所订立的协议。为使用西航下下饭的服务，您应当仔细阅读并遵守本服务协议下的全部内容，特别是涉及免除或者责任限制的条款，该类条款可能以黑体加粗或加下划线的形式提示您重点注意。除非您已阅读并接受本服务协议所有条款，否则您将不能注册西航下下饭账号或使用西航下下饭的服务，如您不同意本服务条款的任意内容，请勿注册或使用西航下下饭的服务，并应立即停止注册账号。如您对本服务协议的内容（特别是涉及免除或者责任限制的条款）有任何疑义，可随时按照本服务协议中列明的联系方式与我们联系，我们将根据您的要求为您进一步解释和说明相关内容。如您勾选“我同意《西航下下饭用户服务协议》”并通过注册账号或其他任何方式使用或接受西航下下饭的任何服务，即视为您已阅读并同意本服务协议，自愿接受本服务协议的所有内容的约束。请您在决定注册或使用服务前再次确认您已知悉并完全理解本服务协议的所有内容。'
        //     , '#Shimoiizaka', {
        //         tips: [1, '#ec728e']
        //     },1000);
        location.href = $("#PageContext").val()+'/jsp/protocolSchool.jsp';
    });
    //发送ajax请求，获取学校信息
    $.ajax({
        url : "/Reservation_war/SchColMajServlet?pid=10",
        type : "get",
        success : function(data) {
            school.html("");
            school.append('<option value="">学校</option>');
            for (let i = 0; i < data.length; i++) {
                let option = new Option(data[i].schoolName,data[i].schoolId);
                school.append(option)
            }
            form.render('select');
        }
    });

    //2、二级联动（查询学校对应的学院）
    form.on('select(school)',function (data) {
        //获取选中的文本的值
        // alert(school.find("option:selected").text())
        if(data.value === ''){
            college.html('');
            major.html('')
            college.append(new Option("学院",''));
            major.append(new Option("专业",''));
            form.render('select');
        }else if(data.value === '1'){
            $.ajax({
                url: $("#PageContext").val()+"/SchColMajServlet?pid=11",
                type: "get",
                success : function (data){
                    college.html("");
                    college.append(new Option("学院",''));
                    for (let i = 0; i < data.length; i++) {
                        let option = new Option(data[i].collegeName,data[i].collegeId);
                        college.append(option);
                    }
                    form.render('select');
                }
            })
        }
    });
    //3.3级
    form.on('select(college)',function (data){
        let value = data.value;
        if(value === ''){
            major.html('');
            major.append(new Option("专业",''));
            form.render('select');
        }else{
            $.ajax({
                url: $("#PageContext").val()+'/SchColMajServlet?pid='+value,
                type: "get",
                success : function (data){
                    major.html('');
                    major.append(new Option("专业",''));
                    for (let i = 0; i < data.length; i++) {
                        major.append(new Option(data[i].majorName,data[i].majorId));
                    }
                    form.render('select');
                }
            })
        }
    })
    //开关
    let flag = false;
    //监听指定开关
    form.on('switch(close)', function(data){
        if(this.checked === true){
            layer.msg('同意', {icon: 1, offset: 'auto',});flag = true;
        }else{
            layer.msg('不同意', {
                icon: 2,
                //弹出位置
                offset: 'auto',
            });flag = false;
        }
    });
    //注册封装注册事件
    function ajurl(obj) {
        $.ajax({
            url: $("#PageContext").val()+"/RegisterServlet?pid=14",
            type: 'post',
            dataType: 'json',
            data: obj,
            success : function (data){
                if(data.message === 'true'){
                    layer.msg('注册成功，请登录！', {
                        icon: 6,
                        //弹出位置
                        offset: 'auto',
                        anim: 4,
                        skin: 'layui-layer-molv'
                    });
                    setTimeout(location.href = $("#PageContext").val()+'/jsp/login.jsp',900);
                }else if(data.message === 'false'){
                    layer.msg('该账号已注册，无法重新注册，是否跳转到登陆页？',{
                        time: 0,
                        anim: 3,
                        btn: ['是','否'],
                        skin: 'layui-layer-molv',
                        yes: function () {
                            location.href = $("#PageContext").val()+'/jsp/login.jsp'
                        }
                    });
                }else{
                    layer.msg('注册未成功，请重新注册', {
                        icon: 2,
                        //弹出位置
                        offset: 'auto',
                    })
                }
            },
            error : function (data) {
                layer.msg('返回数据出错，请重新注册！', {
                    icon: 2,
                    //弹出位置
                    offset: 'auto',
                })
            }
        })
    }
    //自定义验证规则
    form.verify({
        account: [
            /\d{6,12}/,
            '账号格式有误，只能为数字且最多不超过12位'
        ],
        password: [
            /^[\S]{6,20}$/
            ,'密码必须6到20位，且不能出现空格'
        ],
        name:[
            /^[\S]([A-Za-z]|[\u4E00-\u9FA5]{2,10})+$/,
            '必须是字母和数字，2到10位且不能有空格'
        ],
        age:[
            /[^0 ]\d[\S]{0,1}/,
            '必须是1到2位数字,且不能以0开头,不能有空格'
        ]
    });
    //监听提交
    form.on('submit', function(data) {
        if (flag){
            let field = data.field;
            dat={"name":field.name,"age":field.age,"sex":field.sex,"phone":field.phone,"email":field.email,"major":field.major,"username":field.username,"password":field.password}
            ajurl(dat);
        }else{
            layer.msg('请勾选协议！', function () {})
        }
    });
    //轮播图
    carousel.render({
        elem: '#img',
        width: '753px',
        height: '740px',
        anim: 'default', //切换动画方式
        autoplay: true,
        indicator: 'none',
    });
    //点击图标回到首页
    $('.headIcon').on('click',function () {
        location.href = $("#PageContext").val()+'/index.jsp'
    })
});