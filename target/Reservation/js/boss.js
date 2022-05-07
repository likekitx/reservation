layui.use(['form','jquery','layedit','table'], function() {
    //引入layuiform组件
    let form = layui.form;
    // 引入layuijquery
    let $ = layui.jquery;
    //引入layui弹出层
    let layer = layui.layer;
    let layedit = layui.layedit;
    //引入layui表格组件
    let table = layui.table;
    //添加菜品
    let mainThis = $('#mainThis');
    //查看菜品
    let vegTable = $('.vegTable');
    //统计人数查看按钮
    let navItemOne = $('#navItemOne');
    // 收入查看按钮
    let navItemTwo = $('#navItemTwo');
    // 余额查看按钮
    let navItemThree = $('#navItemThree');
    // 支出查看按钮
    let navItemFour = $('#navItemFour');
    // 人数显示
    let navItemNumber = $('#navItemNumber');
    // 收入显示
    let navItemInCome = $('#navItemInCome');
    // 余额显示
    let navItemBalance = $('#navItemBalance');
    // 支出显示
    let navItemExpend = $('#navItemExpend');
    // 声明保存 人数，支出，收入，余额的变量
    let count,expend,income,money;
    //获取url的输入框信息
    let url = $('input[name=url]');
    //查看菜品按钮
    let selectVeg = $('#navItemFive');
    //添加菜品按钮
    let updateVeg = $('#navItemSex');
    //控制显示
    let i = true,j = true;
    //删除按钮
    let deleteVegButton = $('#deleteVeg');
    //定以菜品
    let veg;
    //定义菜品的构造函数，
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

    //插入菜品
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
                    layer.msg('以存在同名或同图片的菜品，请重新添加',{
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
                    layer.msg('添加成功！',{
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
                    layer.msg('添加未成功，请重新输入！',{
                        icon: 5,
                        offset: 'auto',
                        anim: 4,
                        skin: 'layui-layer-molv'
                    })
                }
            },
            error: function (data) {
                layer.msg('请正确填写信息',{
                    icon: 4,
                    offset: 'auto',
                    anim: 4,
                    skin: 'layui-layer-molv'
                })
            }
        });
    }
    //插入菜品的提交按钮的单击事件
    $('#sub').click(function (e) {
        insertVeg(e)
    });
    //输入完url按下回车键就可以执行插入菜品的函数
    url.keydown(function (e) {
        if(e.which === 13){
            insertVeg(e);
        }
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

    //当页面加载时就让他把人数，余额，收入、支出信息请求到页面
    $.ajax({
        url: $("#PageContext").val()+'/BossServlet?pid=18',
        type: 'get',
        dataType: 'json',
        success: function(data){
            count = data.count + '人';
            income = (data.income+"元");
            money = (data.money+"元");
            expend = (data.expend+"元");
        },
        error: function(data){
            layer.msg('请求出错！',{
                icon: 5,
                offset: 'auto',
                anim: 4,
                skin: 'layui-layer-molv'
            });
        }
    });

    //封装渲染菜品表格的方法
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
                {field: 'id', title: '编号',width: 100,sort: true,align:'left'}
                ,{field: 'name', title: '名称',width: 314, edit: 'text',align:'left'}
                ,{field: 'many', title: '数量(份)', width: 314, sort: true,edit: 'text',align:'left'}
                ,{field: 'money', title: '价格(元) ',width: 315, sort: true,edit: 'text',align:'left'}
            ]],
        });
    }
    //执行该方法
    selectVegTable();
    //当表格被编辑时候的回调函数
    table.on('edit(test)', function(obj){
        var old=$(this).prev().text();//旧值
        let value = obj.value; //得到修改后的值
        let field = obj.field; //当前编辑的字段名
        let message = obj.data; //所在行的所有相关数据
        layer.confirm('确定要修改表格数据吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            switch (field) {
                case 'name': updataVeg(21,value,message.id);break;
                case 'many': updataVeg(22,value,message.id);break;
                case 'money': updataVeg(23,value,message.id);break;
            }
        },function () {
            //取消的话让他数据回显
            setTimeout(function () {
                switch (field){
                    case 'id':  obj.update({id:old}) ;break;// 更新当前字段在缓存中的数据
                    case 'name': obj.update({name:old}) ;break;
                    case 'many':  obj.update({many:old}) ;break;
                    case 'money':  obj.update({money:old}) ;break;
                }
            },100)
        });
    });
    //当按下表格单选框的时候的回调函数
    table.on('radio(test)', function(obj){
        // console.log(obj); //当前行的一些常用操作集合
        // console.log(obj.checked); //当前是否选中状态
        // console.log(obj.data); //选中行的相关数据
        if(obj.checked){
            veg = new vegTables(obj.data.id,obj.data.name,obj.data.money,obj.data.many)
        }
    });
    //删除菜品
    deleteVegButton.click(function () {
        $.ajax({
            url: $("#PageContext").val()+'/BossServlet?pid=24',
            type: 'get',
            dataType: 'json',
            data: {id:veg.getVegId()},
            success: function (data) {
                if(data){
                    layer.msg('删除成功',{
                        icon: 1,
                        skin: 'layui-layer-molv',
                        anim: 4,
                        offset: '350px'
                    })
                }else {
                    layer.msg('删除失败',function () {});
                }
                selectVegTable();
            },
            error: function (data) {
                layer.msg('遇到无法解决的错误了，正在急速修复!',function () {});
            }
        })
    })
    //封装查看菜品的ajax请求
    function updataVeg(pid,value,id) {
        $.ajax({
            url: $("#PageContext").val()+'/BossServlet?pid='+pid,
            type: 'get',
            dataType: 'json',
            data: {value:value,id:id},
            success: function (data) {
                if(data.message === 'true'){
                    layer.msg('修改成功',{
                        icon: 1,
                        anim:4,
                        offset: 'auto',
                        skin: 'layui-layer-molv'
                    })
                }else if(data.message === 'false') {
                    layer.msg('修改失败',{
                        icon: 2,
                        anim:4,
                        offset: 'auto',
                        skin: 'layui-layer-molv'
                    })
                }
            },
            error: function (data) {
                layer.msg('请正确填写信息,价格和数量只能为数字，名称只能为汉子或字母',function () {})
            }
        })
    }

    // 设置鼠标移上左侧人数的事件函数
    navItemOne.hover(function(){
        hoverClose();
        navItemNumber.addClass('navItem').css({'top':'-10px'});
        navItemNumber.html(count);
        //移出人数时的事件
    },function(){
        navItemNumber.removeClass('navItem');
        navItemNumber.html('');
    });
    //设置鼠标移上收入按钮的事件
    navItemTwo.hover(function(){
        hoverClose()
        navItemInCome.addClass('navItem').css({'top':'65px'});
        navItemInCome.html(income);
        // 移出时的事件
    },function(){
        navItemInCome.removeClass('navItem');
        navItemInCome.html('');
    });
    //鼠标移上余额的事件
    navItemThree.hover(function(){
        hoverClose()
        navItemBalance.addClass('navItem').css({'top':'140px'});
        navItemBalance.html(money);
    },function(){
        // 移出余额的事件
        navItemBalance.removeClass('navItem');
        navItemBalance.html("");
    });
    //鼠标移上支出按钮的事件
    navItemFour.hover(function(){
        hoverClose()
        navItemExpend.addClass('navItem').css({'top':'215px'});
        navItemExpend.html(expend);
        //鼠标移出支出按钮的事件
    },function(){
        navItemExpend.removeClass('navItem');
        navItemExpend.html('');
    });

    //封装当打开查看菜品或者添加菜品时鼠标移上左侧的人数、余额、支出、收入时的页面关闭事件
    //即在任何时候，只要鼠标移上收入、余额、支出、人数按钮，就会把页面的弹出层全部关闭
    function hoverClose() {
        mainThis.css({
            'display':'none',
        });
        vegTable.css({
            'display':'none',
        });
        //为true  下次要显示
        i = true;
        j = true;
    }
    //查看菜品
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
    //添加菜品的单机事件
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
    //点击图标回到首页
    $('.headIcon').on('click',function () {
        location.href = $("#PageContext").val()+'/index.jsp'
    })
});