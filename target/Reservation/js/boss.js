layui.use(['form','jquery','layedit','table'], function() {
    //����layuiform���
    let form = layui.form;
    // ����layuijquery
    let $ = layui.jquery;
    //����layui������
    let layer = layui.layer;
    let layedit = layui.layedit;
    //����layui������
    let table = layui.table;
    //��Ӳ�Ʒ
    let mainThis = $('#mainThis');
    //�鿴��Ʒ
    let vegTable = $('.vegTable');
    //ͳ�������鿴��ť
    let navItemOne = $('#navItemOne');
    // ����鿴��ť
    let navItemTwo = $('#navItemTwo');
    // ���鿴��ť
    let navItemThree = $('#navItemThree');
    // ֧���鿴��ť
    let navItemFour = $('#navItemFour');
    // ������ʾ
    let navItemNumber = $('#navItemNumber');
    // ������ʾ
    let navItemInCome = $('#navItemInCome');
    // �����ʾ
    let navItemBalance = $('#navItemBalance');
    // ֧����ʾ
    let navItemExpend = $('#navItemExpend');
    // �������� ������֧�������룬���ı���
    let count,expend,income,money;
    //��ȡurl���������Ϣ
    let url = $('input[name=url]');
    //�鿴��Ʒ��ť
    let selectVeg = $('#navItemFive');
    //��Ӳ�Ʒ��ť
    let updateVeg = $('#navItemSex');
    //������ʾ
    let i = true,j = true;
    //ɾ����ť
    let deleteVegButton = $('#deleteVeg');
    //���Բ�Ʒ
    let veg;
    //�����Ʒ�Ĺ��캯����
    let vegTables = function (vegId,vegName,vegPrice,vegCount) {
        this.vegId = vegId;
        this.vegName = vegName;
        this.vegPrice = vegPrice;
        this.vegCount = vegCount;
        this.setVegCount = function (count) {return this.vegCount = count;}
        this.getVegId = function () {return this.vegId;}
        this.getVegName = function () {return this.vegName}
        this.getVegPrice = function () {return this.vegPrice}
        this.getVegCount = function () {return this.vegCount}
    }

    //�����Ʒ
    function insertVeg(e) {
        let name = $('input[name=name]');
        let count = $('input[name=count]');
        let price = $('input[name=price]');
        let url = $('input[name=url]');
        $.ajax({
            url: $("#PageContext").val()+'/BossServlet?pid=19',
            type: 'get',
            dataType: 'json',
            data: {name:name.val(),count:count.val(),price:price.val(),url:url.val()},
            success: function (data) {
                if(data.message === "exist") {
                    layer.msg('�Դ���ͬ����ͬͼƬ�Ĳ�Ʒ�����������',{
                        icon: 4,
                        offset: 'auto',
                        anim: 4,
                        skin: 'layui-layer-molv'
                    });
                    name.val('');
                    count.val('');
                    price.val('');
                    url.val('');
                }else if(data.message === "true"){
                    layer.msg('��ӳɹ���',{
                        icon: 6,
                        offset: 'auto',
                        anim: 4,
                        skin: 'layui-layer-molv'
                    });
                    name.val('');
                    count.val('');
                    price.val('');
                    url.val('');
                    window.location.reload()
                }else{
                    layer.msg('���δ�ɹ������������룡',{
                        icon: 5,
                        offset: 'auto',
                        anim: 4,
                        skin: 'layui-layer-molv'
                    })
                }
            },
            error: function (data) {
                layer.msg('����ȷ��д��Ϣ',{
                    icon: 4,
                    offset: 'auto',
                    anim: 4,
                    skin: 'layui-layer-molv'
                })
            }
        });
    }
    //�����Ʒ���ύ��ť�ĵ����¼�
    $('#sub').click(function (e) {
        insertVeg(e)
    });
    //������url���»س����Ϳ���ִ�в����Ʒ�ĺ���
    url.keydown(function (e) {
        if(e.which === 13){
            insertVeg(e);
        }
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

    //��ҳ�����ʱ�������������������롢֧����Ϣ����ҳ��
    $.ajax({
        url: $("#PageContext").val()+'/BossServlet?pid=18',
        type: 'get',
        dataType: 'json',
        success: function(data){
            count = data.count + '��';
            income = (data.income+"Ԫ");
            money = (data.money+"Ԫ");
            expend = (data.expend+"Ԫ");
        },
        error: function(data){
            layer.msg('�������',{
                icon: 5,
                offset: 'auto',
                anim: 4,
                skin: 'layui-layer-molv'
            });
        }
    });

    //��װ��Ⱦ��Ʒ���ķ���
    function selectVegTable() {
        table.render({
            elem: '#vegTable',
            type: 'post',
            height: 395,
            url: $("#PageContext").val()+'/BossServlet?pid=20',
            page: true,
            limit: 8,
            limits: [8,16,24],
            groups: 8,
            skin: 'row|line',
            even: true,
            cols: [[
                {type: 'radio'},
                {field: 'id', title: '���',width: 100,sort: true,align:'left'}
                ,{field: 'name', title: '����',width: 314, edit: 'text',align:'left'}
                ,{field: 'many', title: '����(��)', width: 314, sort: true,edit: 'text',align:'left'}
                ,{field: 'money', title: '�۸�(Ԫ) ',width: 315, sort: true,edit: 'text',align:'left'}
            ]],
        });
    }
    //ִ�и÷���
    selectVegTable();
    //����񱻱༭ʱ��Ļص�����
    table.on('edit(test)', function(obj){
        var old=$(this).prev().text();//��ֵ
        let value = obj.value; //�õ��޸ĺ��ֵ
        let field = obj.field; //��ǰ�༭���ֶ���
        let message = obj.data; //�����е������������
        layer.confirm('ȷ��Ҫ�޸ı��������', {
            btn: ['ȷ��','ȡ��'] //��ť
        }, function(){
            switch (field) {
                case 'name': updataVeg(21,value,message.id);break;
                case 'many': updataVeg(22,value,message.id);break;
                case 'money': updataVeg(23,value,message.id);break;
            }
        },function () {
            //ȡ���Ļ��������ݻ���
            setTimeout(function () {
                switch (field){
                    case 'id':  obj.update({id:old}) ;break;// ���µ�ǰ�ֶ��ڻ����е�����
                    case 'name': obj.update({name:old}) ;break;
                    case 'many':  obj.update({many:old}) ;break;
                    case 'money':  obj.update({money:old}) ;break;
                }
            },100)
        });
    });
    //�����±��ѡ���ʱ��Ļص�����
    table.on('radio(test)', function(obj){
        // console.log(obj); //��ǰ�е�һЩ���ò�������
        // console.log(obj.checked); //��ǰ�Ƿ�ѡ��״̬
        // console.log(obj.data); //ѡ���е��������
        if(obj.checked){
            veg = new vegTables(obj.data.id,obj.data.name,obj.data.money,obj.data.many)
        }
    });
    //ɾ����Ʒ
    deleteVegButton.click(function () {
        $.ajax({
            url: $("#PageContext").val()+'/BossServlet?pid=24',
            type: 'get',
            dataType: 'json',
            data: {id:veg.getVegId()},
            success: function (data) {
                if(data){
                    layer.msg('ɾ���ɹ�',{
                        icon: 1,
                        skin: 'layui-layer-molv',
                        anim: 4,
                        offset: '350px'
                    })
                }else {
                    layer.msg('ɾ��ʧ��',function () {});
                }
                selectVegTable();
            },
            error: function (data) {
                layer.msg('�����޷�����Ĵ����ˣ����ڼ����޸�!',function () {});
            }
        })
    })
    //��װ�鿴��Ʒ��ajax����
    function updataVeg(pid,value,id) {
        $.ajax({
            url: $("#PageContext").val()+'/BossServlet?pid='+pid,
            type: 'get',
            dataType: 'json',
            data: {value:value,id:id},
            success: function (data) {
                if(data.message === 'true'){
                    layer.msg('�޸ĳɹ�',{
                        icon: 1,
                        anim:4,
                        offset: 'auto',
                        skin: 'layui-layer-molv'
                    })
                }else if(data.message === 'false') {
                    layer.msg('�޸�ʧ��',{
                        icon: 2,
                        anim:4,
                        offset: 'auto',
                        skin: 'layui-layer-molv'
                    })
                }
            },
            error: function (data) {
                layer.msg('����ȷ��д��Ϣ,�۸������ֻ��Ϊ���֣�����ֻ��Ϊ���ӻ���ĸ',function () {})
            }
        })
    }

    // ���������������������¼�����
    navItemOne.hover(function(){
        hoverClose();
        navItemNumber.addClass('navItem').css({'top':'-10px'});
        navItemNumber.html(count);
        //�Ƴ�����ʱ���¼�
    },function(){
        navItemNumber.removeClass('navItem');
        navItemNumber.html('');
    });
    //��������������밴ť���¼�
    navItemTwo.hover(function(){
        hoverClose()
        navItemInCome.addClass('navItem').css({'top':'65px'});
        navItemInCome.html(income);
        // �Ƴ�ʱ���¼�
    },function(){
        navItemInCome.removeClass('navItem');
        navItemInCome.html('');
    });
    //������������¼�
    navItemThree.hover(function(){
        hoverClose()
        navItemBalance.addClass('navItem').css({'top':'140px'});
        navItemBalance.html(money);
    },function(){
        // �Ƴ������¼�
        navItemBalance.removeClass('navItem');
        navItemBalance.html("");
    });
    //�������֧����ť���¼�
    navItemFour.hover(function(){
        hoverClose()
        navItemExpend.addClass('navItem').css({'top':'215px'});
        navItemExpend.html(expend);
        //����Ƴ�֧����ť���¼�
    },function(){
        navItemExpend.removeClass('navItem');
        navItemExpend.html('');
    });

    //��װ���򿪲鿴��Ʒ������Ӳ�Ʒʱ�������������������֧��������ʱ��ҳ��ر��¼�
    //�����κ�ʱ��ֻҪ����������롢��֧����������ť���ͻ��ҳ��ĵ�����ȫ���ر�
    function hoverClose() {
        mainThis.css({
            'display':'none',
        });
        vegTable.css({
            'display':'none',
        });
        //Ϊtrue  �´�Ҫ��ʾ
        i = true;
        j = true;
    }
    //�鿴��Ʒ
    selectVeg.click(function (e) {
        if(i){
            mainThis.css({
                'display':'none',
            });
            vegTable.css({
                'display':'inline',
            });
            i = false;
            j = true;
        }else{
            mainThis.css({
                'display':'none',
            });
            vegTable.css({
                'display':'none',
            });
            i=true;
        }
    })
    //��Ӳ�Ʒ�ĵ����¼�
    updateVeg.click(function (e) {
        if(j){
            vegTable.css({
                'display':'none',
            });
            mainThis.css({
                'display':'inline',
            });
            j=false;
            i=true;
        }else {
            vegTable.css({
                'display':'none',
            });
            mainThis.css({
                'display':'none',
            });
            j=true;
        }
    });
    //���ͼ��ص���ҳ
    $('.headIcon').on('click',function () {
        location.href = $("#PageContext").val()+'/index.jsp'
    })
});