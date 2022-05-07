layui.use(['form','jquery','layedit','carousel'], function() {
    var form = layui.form;
    var $ = layui.jquery;
    var layer = layui.layer;
    var layedit = layui.layedit;
    //����layui�ֲ�ͼʵ��
    var carousel = layui.carousel;
    //�����˺ű���
    let account;
    //����boolean�����������ж�Э���Ƿ�ѡ
    let flag = false;


    //��½��ť������
    let but = $('#buttonSubmit');
    //footer��ϵ���ǵĵ����¼�
    $('#connect').on('click', function(){
        layer.tips('�����κ���������ϵ���������񣬵绰17391522704��', '#connect', {
            tips: [1, '#ee8a4f']
        },1000);
    });
    //�ͷ��绰�ĵ����¼�
    $('#service').on('click', function(){
        layer.tips('�ͷ��绰��17391522704��', '#service', {
            tips: [1, '#4ed4f1']
        },1000);
    });
    //�������ǵĵ����¼�
    $('#about').on('click', function(){
        layer.tips('�������·���ʹ���ǡ����ҳԵø��á�����Ϊһ����ʳ�����������ƽ̨����˾�۽���Food +Platform��ս�ԣ��ԡ��ԡ�Ϊ���ģ�ͨ���Ƽ����£��͹���̻������������һ��Ŭ��Ϊ�������ṩƷ������ƶ��������ҵ�����͹��������ֻ�������δ����ĳ��ĳ��ĳ�գ��������·�������ʽ�ڸ۽����������С��������·���ʼ�ռ���Կͻ�Ϊ���ģ����ϼӴ��ڿƼ��з������Ͷ�룬���óе�������Σ����ഴ������ֵ������������һ��չ��Ӯ��', '#about', {
            tips: [1, '#a2ec4c']
        },1000);
    });
    //�´ǵĵ����¼�
    $('#excuse').on('click', function(){
        layer.tips('��л�ܵ��������ṩ����֧��', '#excuse', {
            tips: [1, '#ec728e']
        },1000);
    });
    //��½Э�飬�ܵ���Э��ĵ����¼���װ
    $('#kitten').on('click', function(){
        layer.tips('������ͨ�����·�ʽ��������ϵ�����ǽ����������ڴ���������\n' +
            '1��������ͨ���������·���վ�ṩ��������ϵ��ʽ��������ϵ��\n' +
            '2����������ϵ�������·��Ŀͷ��绰���з������������·�����153 8931 1655����\n' +
            '3�����ǻ�������ר�ŵĸ�����Ϣ�����Ŷӣ���������ϵ���ǵĸ�����Ϣ���������ˡ�', '#kitten', {
            tips: [1, '#ec728e']
        },1000);
    });
    //�������·�Э��ĵ����¼���װ
    $('#Shimoiizaka').on('click', function(){
        layer.tips('�����������·��û�����Э�顷�����¼�ơ�������Э�顱���������������·�֮���ע���������·��û��˺ż�ʹ���������·��ĸ����������������������Э�顣Ϊʹ���������·��ķ�����Ӧ����ϸ�Ķ������ر�����Э���µ�ȫ�����ݣ��ر����漰��������������Ƶ����������������Ժ���Ӵֻ���»��ߵ���ʽ��ʾ���ص�ע�⡣���������Ķ������ܱ�����Э���������������������ע���������·��˺Ż�ʹ���������·��ķ���������ͬ�Ȿ����������������ݣ�����ע���ʹ���������·��ķ��񣬲�Ӧ����ֹͣע���˺š������Ա�����Э������ݣ��ر����漰��������������Ƶ�������κ����壬����ʱ���ձ�����Э������������ϵ��ʽ��������ϵ�����ǽ���������Ҫ��Ϊ����һ�����ͺ�˵��������ݡ�������ѡ����ͬ�⡶�������·��û�����Э�顷����ͨ��ע���˺Ż������κη�ʽʹ�û�����������·����κη��񣬼���Ϊ�����Ķ���ͬ�Ȿ����Э�飬��Ը���ܱ�����Э����������ݵ�Լ���������ھ���ע���ʹ�÷���ǰ�ٴ�ȷ������֪Ϥ����ȫ��Ȿ����Э����������ݡ�'
            , '#Shimoiizaka', {
            tips: [1, '#ec728e']
        },1000);
    });

    //�ֲ�ͼ
    carousel.render({
        elem: '#img',
        width: '830px',
        height: '564px',
        anim: 'default', //�л�������ʽ
        autoplay: true,
        indicator: 'none',
    });
    //��������Э���Ƿ�ѡ��
    form.on('switch(close)', function(data){
        if(this.checked === true){
            layer.msg('ͬ��', {
                icon: 1,
                //����λ��
                offset: 'auto',
            });
            flag = true;
        }else{
            layer.msg('��ͬ��', {
                icon: 2,
                //����λ��
                offset: 'auto',
            });flag = false;
        }
    });
    //��������
    $('.forget').click(function (event) {
        $('.register').css({
            'display':'none',
        })
        $('.forgetPassword').css({
            'display':'inline',
        })
    })
    //��������ҳ�����һ����ť�ĵ������¼�
    $('.last').click(function (event) {
        $('.register').css({
            'display':'inline',
        })
        $('.forgetPassword').css({
            'display':'none',
        })
    });
    //�Զ�����֤����
    form.verify({
        account: [
            /^[^0]\d{0,11}$/,
            '�˺Ÿ�ʽ����ֻ���������Ҳ�����12λ'
        ]
        ,name: [
            /^[\S]{1,9}$/
            ,'���ֲ����пո��ҳ��Ȳ�����10λ'
        ],
        password: [
            /^[\S]{6,20}$/
            ,'�������6��20λ���Ҳ��ܳ��ֿո�'
        ],
    });
    //�����һ���ĵ����¼�
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

                    layer.msg('��֤ͨ����', {
                        icon: 6,
                        //����λ��
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
                    layer.msg('��֤δͨ��������������Ϣ�Ƿ�����', {
                        icon: 5,
                        //����λ��
                        offset: 'auto',
                        anim: 4,
                        skin: 'layui-layer-molv'
                    });
                }
            },
            error : function (data) {
                layer.msg('�˺Ż��������',{
                    time: 0,
                    anim: 3,
                    skin: 'layui-layer-molv',
                    icon: 3
                });
            }
        });
    })
    //����ύ�ĵ����¼�
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
                        layer.msg('�޸ĳɹ�������ת����½ҳ',{
                            icon: 6,
                            //����λ��
                            offset: 'auto',
                            anim: 4,
                            skin: 'layui-layer-molv'
                        });
                        setTimeout(function () {
                            location.href = $("#PageContext").val()+'/jsp/login.jsp';
                        },500);
                    }else{
                        layer.msg('�������������һ�£����������룡', {
                            icon: 5,
                            //����λ��
                            offset: 'auto',
                            anim: 4,
                            skin: 'layui-layer-molv'
                        });
                    }
                },
                error: function (data) {
                    layer.msg('����ĳ��Ȼ��߸�ʽ�������������룡',{
                        time: 0,
                        anim: 3,
                        skin: 'layui-layer-molv',
                        icon: 2
                    });
                }
            });
        }else {
            layer.msg('�����������벻ͬ�����������룡',{
                icon: 7,
                anim: 3,
                skin: 'layui-layer-molv',
                time: 0
            })
        }
    })
    //��½����ʵ��
    but.click(function (event) {
        if(flag){
            $.ajax({
                url: $("#PageContext").val()+"/LoginServlet?pid=15",
                type: 'get',
                contentType: 'json',
                data: {account:$('input[name = "username"]').val(),password:$('input[name = "password"]').val()},
                success: function (data) {
                    if(data.message === "boss"){
                        layer.msg('��ӭ�ϰ���٣�', {
                            icon: 1,
                            //����λ��
                            offset: 'auto',
                            anim: 4,
                            skin: 'layui-layer-molv'
                        });
                        setTimeout(function () {
                            location.href = $("#PageContext").val()+'/jsp/boss.jsp'
                        },800);
                    }else if(data.message === "true"){
                        layer.msg('��½�ɹ���', {
                            icon: 1,
                            //����λ��
                            offset: 'auto',
                            anim: 4,
                            skin: 'layui-layer-molv'
                        });
                        setTimeout(function () {
                            location.href = $("#PageContext").val()+'/index.jsp'
                        },1000);
                    }else{
                        layer.msg('��֤δͨ��������������Ϣ�Ƿ�����',{
                            icon: 5,
                            time: 0,
                            anim: 3,
                            skin: 'layui-layer-molv',
                        });
                    }
                },
                error: function (data) {
                    layer.msg('�˺Ż��������', {
                        icon: 2,
                        //����λ��
                        offset: 'auto',
                    })
                }
            });
        }else{
            layer.msg('�빴ѡЭ�飡', function () {})
        }
    });
    //���ͼ��ص���ҳ
    $('.headIcon').on('click',function () {
        location.href = $("#PageContext").val()+'/index.jsp'
    })
});