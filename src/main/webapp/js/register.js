layui.use(['form','jquery','layedit','carousel'], function() {
    var form = layui.form;
    var $ = layui.jquery;
    var layer = layui.layer;
    var layedit = layui.layedit;
    var carousel = layui.carousel;
    //ѧУ������
    var school = $('#school');
    //ѧԺ������
    var college = $('#college');
    //רҵ������
    var major = $('#major');

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
        // layer.tips('������ͨ�����·�ʽ��������ϵ�����ǽ����������ڴ���������\n' +
        //     '1��������ͨ���������·���վ�ṩ��������ϵ��ʽ��������ϵ��\n' +
        //     '2����������ϵ�������·��Ŀͷ��绰���з������������·�����153 8931 1655����\n' +
        //     '3�����ǻ�������ר�ŵĸ�����Ϣ�����Ŷӣ���������ϵ���ǵĸ�����Ϣ���������ˡ�', '#kitten', {
        //     tips: [1, '#ec728e']
        // },1000);
        location.href = $("#PageContext").val()+'/jsp/protocolDan.jsp';
    });
    //�������·�Э��ĵ����¼���װ
    $('#Shimoiizaka').on('click', function(){
        // layer.tips('�����������·��û�����Э�顷�����¼�ơ�������Э�顱���������������·�֮���ע���������·��û��˺ż�ʹ���������·��ĸ����������������������Э�顣Ϊʹ���������·��ķ�����Ӧ����ϸ�Ķ������ر�����Э���µ�ȫ�����ݣ��ر����漰��������������Ƶ����������������Ժ���Ӵֻ���»��ߵ���ʽ��ʾ���ص�ע�⡣���������Ķ������ܱ�����Э���������������������ע���������·��˺Ż�ʹ���������·��ķ���������ͬ�Ȿ����������������ݣ�����ע���ʹ���������·��ķ��񣬲�Ӧ����ֹͣע���˺š������Ա�����Э������ݣ��ر����漰��������������Ƶ�������κ����壬����ʱ���ձ�����Э������������ϵ��ʽ��������ϵ�����ǽ���������Ҫ��Ϊ����һ�����ͺ�˵��������ݡ�������ѡ����ͬ�⡶�������·��û�����Э�顷����ͨ��ע���˺Ż������κη�ʽʹ�û�����������·����κη��񣬼���Ϊ�����Ķ���ͬ�Ȿ����Э�飬��Ը���ܱ�����Э����������ݵ�Լ���������ھ���ע���ʹ�÷���ǰ�ٴ�ȷ������֪Ϥ����ȫ��Ȿ����Э����������ݡ�'
        //     , '#Shimoiizaka', {
        //         tips: [1, '#ec728e']
        //     },1000);
        location.href = $("#PageContext").val()+'/jsp/protocolSchool.jsp';
    });
    //����ajax���󣬻�ȡѧУ��Ϣ
    $.ajax({
        url : "/Reservation_war/SchColMajServlet?pid=10",
        type : "get",
        success : function(data) {
            school.html("");
            school.append('<option value="">ѧУ</option>');
            for (let i = 0; i < data.length; i++) {
                let option = new Option(data[i].schoolName,data[i].schoolId);
                school.append(option)
            }
            form.render('select');
        }
    });

    //2��������������ѯѧУ��Ӧ��ѧԺ��
    form.on('select(school)',function (data) {
        //��ȡѡ�е��ı���ֵ
        // alert(school.find("option:selected").text())
        if(data.value === ''){
            college.html('');
            major.html('')
            college.append(new Option("ѧԺ",''));
            major.append(new Option("רҵ",''));
            form.render('select');
        }else if(data.value === '1'){
            $.ajax({
                url: $("#PageContext").val()+"/SchColMajServlet?pid=11",
                type: "get",
                success : function (data){
                    college.html("");
                    college.append(new Option("ѧԺ",''));
                    for (let i = 0; i < data.length; i++) {
                        let option = new Option(data[i].collegeName,data[i].collegeId);
                        college.append(option);
                    }
                    form.render('select');
                }
            })
        }
    });
    //3.3��
    form.on('select(college)',function (data){
        let value = data.value;
        if(value === ''){
            major.html('');
            major.append(new Option("רҵ",''));
            form.render('select');
        }else{
            $.ajax({
                url: $("#PageContext").val()+'/SchColMajServlet?pid='+value,
                type: "get",
                success : function (data){
                    major.html('');
                    major.append(new Option("רҵ",''));
                    for (let i = 0; i < data.length; i++) {
                        major.append(new Option(data[i].majorName,data[i].majorId));
                    }
                    form.render('select');
                }
            })
        }
    })
    //����
    let flag = false;
    //����ָ������
    form.on('switch(close)', function(data){
        if(this.checked === true){
            layer.msg('ͬ��', {icon: 1, offset: 'auto',});flag = true;
        }else{
            layer.msg('��ͬ��', {
                icon: 2,
                //����λ��
                offset: 'auto',
            });flag = false;
        }
    });
    //ע���װע���¼�
    function ajurl(obj) {
        $.ajax({
            url: $("#PageContext").val()+"/RegisterServlet?pid=14",
            type: 'post',
            dataType: 'json',
            data: obj,
            success : function (data){
                if(data.message === 'true'){
                    layer.msg('ע��ɹ������¼��', {
                        icon: 6,
                        //����λ��
                        offset: 'auto',
                        anim: 4,
                        skin: 'layui-layer-molv'
                    });
                    setTimeout(location.href = $("#PageContext").val()+'/jsp/login.jsp',900);
                }else if(data.message === 'false'){
                    layer.msg('���˺���ע�ᣬ�޷�����ע�ᣬ�Ƿ���ת����½ҳ��',{
                        time: 0,
                        anim: 3,
                        btn: ['��','��'],
                        skin: 'layui-layer-molv',
                        yes: function () {
                            location.href = $("#PageContext").val()+'/jsp/login.jsp'
                        }
                    });
                }else{
                    layer.msg('ע��δ�ɹ���������ע��', {
                        icon: 2,
                        //����λ��
                        offset: 'auto',
                    })
                }
            },
            error : function (data) {
                layer.msg('�������ݳ���������ע�ᣡ', {
                    icon: 2,
                    //����λ��
                    offset: 'auto',
                })
            }
        })
    }
    //�Զ�����֤����
    form.verify({
        account: [
            /\d{6,12}/,
            '�˺Ÿ�ʽ����ֻ��Ϊ��������಻����12λ'
        ],
        password: [
            /^[\S]{6,20}$/
            ,'�������6��20λ���Ҳ��ܳ��ֿո�'
        ],
        name:[
            /^[\S]([A-Za-z]|[\u4E00-\u9FA5]{2,10})+$/,
            '��������ĸ�����֣�2��10λ�Ҳ����пո�'
        ],
        age:[
            /[^0 ]\d[\S]{0,1}/,
            '������1��2λ����,�Ҳ�����0��ͷ,�����пո�'
        ]
    });
    //�����ύ
    form.on('submit', function(data) {
        if (flag){
            let field = data.field;
            dat={"name":field.name,"age":field.age,"sex":field.sex,"phone":field.phone,"email":field.email,"major":field.major,"username":field.username,"password":field.password}
            ajurl(dat);
        }else{
            layer.msg('�빴ѡЭ�飡', function () {})
        }
    });
    //�ֲ�ͼ
    carousel.render({
        elem: '#img',
        width: '753px',
        height: '740px',
        anim: 'default', //�л�������ʽ
        autoplay: true,
        indicator: 'none',
    });
    //���ͼ��ص���ҳ
    $('.headIcon').on('click',function () {
        location.href = $("#PageContext").val()+'/index.jsp'
    })
});