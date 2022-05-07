layui.use(['form','jquery','layedit','carousel','table','form'], function() {
    let $ = layui.jquery;
    let layer = layui.layer;
    let carousel = layui.carousel;
    let table = layui.table;
    let form = layui.form;
    //猜你喜欢的图片
    let img01 =  $('#img01');
    let img02 =  $('#img02');
    let img03 =  $('#img03');
    let img04 =  $('#img04');
    //猜你喜欢的文字
    let p01 =  $('#p01');
    let p02 =  $('#p02');
    let p03 =  $('#p03');
    let p04 =  $('#p04');
    //猜你喜欢生成的最近数字，用来在页面刷新时得到获取那些菜品信息
    let limit = parseInt(Math.random() * 20);
    //用户操作的变量
    let userMoney = $('#userMoney');
    let userTopUp = $('#userTopUp');
    let userAddress = $('#userAddress');
    let userOrderForm = $('#userOrderForm');
    let modifyPassword = $('#modifyPassword');
    let topUp = $('#topupRecord');
    let exit = $('#exit');
    //定义地址
    let addressRadio,deleteAddress;
    //轮播图的
    let CurName,CurPrice,CurMany,CurUrl,CurId;
    //判断登陆的
    let session;
    //登录按钮背景
    let loginButtonA = $('#loginButtonA');
    //登陆按钮
    let loginButton = $('#loginButton');
    //个人信息
    let orderForm = $('.orderForm');
    //top滑块
    let navSlide01 = $('#navSlide01');
    let navSlide02 = $('#navSlide02');
    let navSlide03 = $('#navSlide03');
    let navSlide04 = $('#navSlide04');
    let navSlide05 = $('#navSlide05');
    let navSlide06 = $('#navSlide06');
    //页面顶部图标
    let headIcon = $('.headIcon');
    //右边的四个小块
    let group = $('#group');
    let snack = $('#snack');
    let schoolEat = $('#schoolEat');
    let oneMoney = $('#oneMoney');
    //搜索框
    let search = $('#search');
    let input = $('#input-search');
    let hint = $('#hint');
    let searchButton = $('#search-button');
    // let options;
    let ulNubmer = -1;
    //猜你喜欢的大盒子
    let youLikeVegOne = $('.youLikeVegOne');
    let youLikeVegTwo = $('.youLikeVegTwo');
    let youLikeVegThree = $('.youLikeVegThree');
    let youLikeVegFour = $('.youLikeVegFour');
    //全局的boolean，监听中文输入触发input事件问题
    let flag = true;
    //菜品属性
    // let vegName,vegPrice,vegCount,vegUrl;
    let vegTables = function (vegId,vegName,vegPrice,vegCount,vegUrl) {
        this.vegId = vegId;
        this.vegName = vegName;
        this.vegPrice = vegPrice;
        this.vegCount = vegCount;
        this.vegUrl = vegUrl;
        this.setVegCount = function (count) {return this.vegCount = count;}
        this.getVegId = function () {return this.vegId;}
        this.getVegName = function () {return this.vegName}
        this.getVegPrice = function () {return this.vegPrice}
        this.getVegCount = function () {return this.vegCount}
        this.getVegUrl = function () {return this.vegUrl}
    }
    //定义构造函数用来存用户
    let users = function (id,name,age,sex,account,email,phone,money) {
        this.id = id;
        this.name = name;
        this.sex = sex;
        this.age = age;
        this.account = account;
        this.email = email;
        this.phone = phone;
        this.money = money;
        this.setMoney = function (money) {this.money = money;}
        this.getId = function () {return this.id}
        this.getName = function () {return this.name}
        this.getSex = function () {return this.sex}
        this.getAge = function () {return this.age}
        this.getAccount = function () {return this.account}
        this.getEmail = function () {return this.email}
        this.getPhone = function () {return this.phone}
        this.getMoney = function () {return this.money}
    }
    //定义构造函数来存储地址
    let addressRecord = function (addressId,addressName,addressPhone,addressUser,usersId) {
        this.addressId = addressId;
        this.addressName = addressName;
        this.addressPhone = addressPhone;
        this.addressUser = addressUser;
        this.usersId = usersId;
        this.setAddressId = function (setAddressId) {
            this.addressId = setAddressId;
        }
        this.setAddressName = function (setAddressName) {
            this.addressName = setAddressName;
        }
        this.setAddressPhone = function (setAddressPhone) {
            this.addressPhone = setAddressPhone;
        }
        this.setAddressUser = function (setAddressUser) {
            this.addressUser = setAddressUser;
        }
        this.setAddressUsersId = function (setAddressUsersId) {
            this.usersId = setAddressUsersId;
        }
        this.getAddressId = function () {
            return this.addressId;
        }
        this.getAddressName = function () {
            return this.addressName;
        }
        this.getAddressPhone = function () {
            return this.addressPhone;
        }
        this.getAddressUser = function () {
            return this.addressUser;
        }
        this.getAddressUsersId = function () {
            return this.usersId;
        }
    }
    //猜你喜欢的四个菜的对象
    let youLikeVeg01,youLikeVeg02,youLikeVeg03,youLikeVeg04;
    //搜索框的值
    let searchVeg;
    //存储搜索框的值的list
    let searchList = [];
    //搜索结果的长度
    let ulLiLength = 0;
    //搜索框内的信息的下标
    let searchIndex = -1;
    //创建搜素框ul
    let options = $('<ul></ul>');
    options.addClass('options');
    hint.append(options);
    //创建用户对象
    let userAdmin;
    //获取当前时间
    //判断是否在前面加0
    let getTimeNow = function () {
        function getNow(s) {
            return s < 10 ? '0' + s: s;
        }
        var myDate = new Date();
        var year=myDate.getFullYear();        //获取当前年
        var month=myDate.getMonth()+1;   //获取当前月
        var date=myDate.getDate();            //获取当前日
        var h=myDate.getHours();              //获取当前小时数(0-23)
        var m=myDate.getMinutes();          //获取当前分钟数(0-59)
        var s=myDate.getSeconds();
        var now=year+'-'+getNow(month)+"-"+getNow(date)+" "+getNow(h)+':'+getNow(m)+":"+getNow(s);
        this.getTime = function () {
            return now;
        };
    }

    //登陆按钮的鼠标移上判断用户
    let cli = false;
    loginButton.click(function () {
        if(session==="session"){
            if(!cli){
                orderForm.css({"display":"inline"})
                cli = true;
            }else {
                orderForm.css({"display":"none"})
                cli = false;
            }
        }else {
            location.href = $("#PageContext").val()+"/jsp/login.jsp";
        }
    });
    //当登陆成功，鼠标移出用户信息列表呢后的事件
    orderForm.hover(function () {
    },function () {
        orderForm.css({"display":"none"})
        cli = false;
    })

    //猜你喜欢的点击事件
    youLikeVegOne.click(function () {
        if(session == null){
            layerNOLogin();
        }else if(session==="session"){
            layerMsgCur("youLikeVegOne",youLikeVeg01.getVegId(),youLikeVeg01.getVegName(),youLikeVeg01.getVegUrl(),youLikeVeg01.getVegCount(),youLikeVeg01.getVegPrice());
        }
    });
    youLikeVegTwo.click(function () {
        if(session==null){
            layerNOLogin();
        }else if(session==="session"){
            layerMsgCur("youLikeVegTwo",youLikeVeg02.getVegId(),youLikeVeg02.getVegName(),youLikeVeg02.getVegUrl(),youLikeVeg02.getVegCount(),youLikeVeg02.getVegPrice());
        }
    });
    youLikeVegThree.click(function () {
        if(session==null){
            layerNOLogin();
        }else if(session==="session"){
            layerMsgCur("youLikeVegThree",youLikeVeg03.getVegId(),youLikeVeg03.getVegName(),youLikeVeg03.getVegUrl(),youLikeVeg03.getVegCount(),youLikeVeg03.getVegPrice());
        }
    });
    youLikeVegFour.click(function () {
        if(session==null){
            layerNOLogin();
        }else if(session==="session"){
            layerMsgCur("youLikeVegFour",youLikeVeg04.getVegId(),youLikeVeg04.getVegName(),youLikeVeg04.getVegUrl(),youLikeVeg04.getVegCount(),youLikeVeg04.getVegPrice());
        }
    });

    //右边的四大天王
    schoolEat.click(function () {
        if(session==null){
            layerNOLogin();
        }else if(session==="session"){
            layerNoMethod();
        }
    });
    oneMoney.click(function () {
        if(session==null){
            layerNOLogin();
        }else if(session==="session"){
            layerNoMethod();
        }
    });
    snack.click(function () {
        if(session==null){
            layerNOLogin();
        }else if(session==="session"){
            layerNoMethod();
        }
    });
    group.click(function () {
        if(session==null){
            layerNOLogin();
        }else if(session==="session"){
            layerNoMethod();
        }
    });
    //nav导航栏的点击事件
    navSlide01.click(function () {
        if(session==null){
            layerNOLogin();
        }else if(session==="session"){
            layerNoMethod();
        }
    });
    navSlide02.click(function () {
        if(session==null){
            layerNOLogin();
        }else if(session==="session"){
            layerNoMethod();
        }
    });
    navSlide03.click(function () {
        if(session==null){
            layerNOLogin();
        }else if(session==="session"){
            layerNoMethod();
        }
    });
    navSlide04.click(function () {
        if(session==null){
            layerNOLogin();
        }else if(session==="session"){
            layerNoMethod();
        }
    });
    navSlide05.click(function () {
        if(session==null){
            layerNOLogin();
        }else if(session==="session"){
            layerNoMethod();
        }
    });
    navSlide06.click(function () {
        if(session==null){
            layerNOLogin();
        }else if(session==="session"){
            layerNoMethod();
        }
    });


    //提取方法(未登录)
    let layerNOLogin = function (){
        layer.msg("温馨提示，请登录使用！",{
            icon:3,
            anim:1,
            skin: "layui-layer-molv",
            offset: '400px',
        });
    }
    //方法未实现
    let layerNoMethod = function (){
        layer.msg("功能正在完善，敬请期待！",{
            icon: 6,
            anim:1,
            skin: "layui-layer-molv",
            offset: '400px',
        });
    }

    //自定义验证规则
    form.verify({
        name: [
            /^[\S]{1,9}$/
            ,'名字不能有空格，且长度不超过10位'
        ]
    });
    //点击商品弹出层的方法
    function layerMsgCur(youLike,id,title,src,count,price){
        layer.open({
            type: 1,
            title: title,
            anim: 1,
            offset: '220px',
            area: '500px',
            skin: 'demo-class',
            content: "<img src='"+src+"' style='width:500px;height: 300px'/><p style='font: 600 16px STHeiti Light [STXihei]'>"+"剩余"+count+"份"+"</p>" +
                "<p style='font: 600 42px SourceHanSansSC;margin-top: 5px;float: right;margin-right: 70px;color: #936868'>"+price+"￥"+"<p/>",
            btn:['购买','取消'],
            yes: function (index,layero) {
                //选择地址
                //如果地址为null;则添加地址不为空,则选择地址
                //请求有没有地址
                $.ajax({
                    url: $("#PageContext").val()+'/IndexServlet?pid=43',
                    type: 'get',
                    dataType: 'json',
                    success: function (data) {
                        if(data>0){
                            layer.msg('勾选单选框，选择地址！',{
                                icon: 6,
                                anim: 5,
                                offset: '350px',
                                skin: 'layui-layer-molv',
                                time: 5000
                            });
                            //出现地址管理
                            userAddressRecord();
                            //调用方法监听单选框被点击，
                            radioSelect(id,title,price,youLike,true)
                        }else if(data[0]===0){
                            layer.msg('检测到你没有地址，请添加地址！',{
                                icon: 3,
                                anim: 5,
                                offset: '350px',
                                skin: 'layui-layer-molv',
                                time: 500
                            });
                            setTimeout(function () {
                                let bj = true;
                                insertAddress(bj);
                            },500)
                        }
                    },
                    error: function (data) {
                        layer.msg("出现错误！",function () {})
                    }
                })
                layer.close(index);
            }
        });
    }
    //添加地址的方法
    function insertAddress(bj) {
        $('.payAddressPhone').css({
            'display':'inline'
        });
        $('.main').css({
            'opacity': '0.5',
            'filter': 'blur(5px)',
            'pointer-events': 'none'
        });
        $('.last').click(function () {
            $('.payAddressPhone').css({
                'display':'none'
            });
            $('.main').css({
                'opacity': '1',
                'filter': 'none',
                'pointer-events': 'auto'
            });
        })
        form.on('submit(next)',function (data) {
            let field = data.field;
            let dat = {userName:field.name,
                userPhone:field.phone,
                userAddress:field.address}
            $.ajax({
                url: $("#PageContext").val()+'/IndexServlet?pid=37',
                type: 'get',
                dataType: 'json',
                data: dat,
                success: function (data) {
                    if(data[0]==="false"){
                        layer.msg('添加地址失败！',{
                            icon:7,
                            offset: 'auto',
                            anim: 1,
                            skin: 'layui-layer-molv'
                        });
                    }else if(data[0]==="true"){
                        if(bj){
                            layer.msg('添加地址成功,请重新购买',{
                                icon:6,
                                offset: 'auto',
                                anim: 3,
                                skin: 'layui-layer-molv'
                            });
                        }else{
                            layer.msg('添加地址成功！',{
                                icon:6,
                                offset: 'auto',
                                anim: 3,
                                skin: 'layui-layer-molv'
                            });
                            userAddressRecord ();
                        }
                    }
                    $('.payAddressPhone').css({
                        'display':'none'
                    });
                    $('.main').css({
                        'opacity': '1',
                        'filter': 'none',
                        'pointer-events': 'auto'
                    });
                },
                error: function (data) {
                    layer.msg("出现错误！",function () {})
                }
            })
        })
    }
    //轮播图的ajax
    function ajaxCur(data,name){
        $.ajax({
            url: $("#PageContext").val()+'/IndexServlet?pid='+data,
            type: 'get',
            dataType: 'json',
            data: {name: name},
            success: function (data) {
                CurName = name;
                CurId = data[0].id;
                CurMany = data[0].count;
                CurPrice = data[0].price;
                CurUrl = data[0].url;
                layerMsgCur(null,CurId,CurName,CurUrl,CurMany,CurPrice);
            },
            error: function (data) {
                layer.msg('出现错误！',function () {});
            }
        });
    }
    //为轮播图绑定单击事件
    $('#carousel').on('click',function (obj) {
        if(session==="session"){
            switch (obj.target.align){
                case "1":
                    ajaxCur("25","健康的水果和蔬菜");
                    break;
                case "2":
                    ajaxCur("26","蔬菜沙拉猕猴桃");
                    break;
                case "3":
                    ajaxCur("27","松饼甜点");
                    break;
                case "4":
                    ajaxCur("28","早餐麦片牛奶");
                    break;
                case "5":
                    ajaxCur("29","意大利烤宽面条");
                    break;
                case "6":
                    ajaxCur("30","巧克力甜点草莓");
                    break;
            }
        }else{
            layerNOLogin();
        }
    });
    //猜你喜欢四张图
    $.ajax({
        url: $("#PageContext").val()+'/IndexServlet?pid=24',
        type: 'get',
        dataType: 'json',
        data: {limit:limit},
        success: function (data) {
            youLikeVeg01 = new vegTables(data[0].id,data[0].name,data[0].money,data[0].many,data[0].url);
            youLikeVeg02 = new vegTables(data[0].id,data[1].name,data[1].money,data[1].many,data[1].url);
            youLikeVeg03 = new vegTables(data[0].id,data[2].name,data[2].money,data[2].many,data[2].url);
            youLikeVeg04 = new vegTables(data[0].id,data[3].name,data[3].money,data[3].many,data[3].url);
            img01.attr("src",youLikeVeg01.getVegUrl());
            p01.html(youLikeVeg01.getVegName() + "  " +youLikeVeg01.getVegPrice()+"元");
            img02.attr("src",youLikeVeg02.getVegUrl());
            p02.html(youLikeVeg02.getVegName() + "  " +youLikeVeg02.getVegPrice()+"元");
            img03.attr("src",youLikeVeg03.getVegUrl());
            p03.html(youLikeVeg03.getVegName() + "  " +youLikeVeg03.getVegPrice()+"元");
            img04.attr("src",youLikeVeg04.getVegUrl());
            p04.html(youLikeVeg04.getVegName() + "  " +youLikeVeg04.getVegPrice()+"元");
            if(data[4] === "null"){
                session = null;
            }else{
                userAdmin = new users(data[4].usersId,data[4].usersName,data[4].usersSex,data[4].usersAge,data[4].account,data[4].usersEmail,data[4].usersPhone,data[4].usersMoney)
                loginButtonA.html(userAdmin.getName());
                $('#loginButton').css({"background-color":"#ffd6d6"})
                session = "session";
            }
        },
        error:function (data) {
            layer.msg('页面信息加载出现错误！',function (){});
        }
    });
    //用户查看余额
    userMoney.click(function () {
        if(userAdmin!==undefined){
            layer.open({
                type: 1,
                title:'余额',
                closeBtn:0,
                area: ['350px','180px'],
                offset: '340px',
                shadeClose: true,
                skin:'moneyClass',
                content: '<p style="font: 600 34px SimHei;text-align: center;margin-top: 50px">'+userAdmin.getMoney().toString()+'￥'+'</p>'
            });
        }
    })
    //用户充值
    userTopUp.click(function () {
        layer.prompt({
            //文本
            formType: 0,
            title: '充值',
            area: ['350px','180px'],
            offset:'340px',
            btn: ['充值','取消'],
        }, function(value, index, elem){
            //是数字
            if(!isNaN(value)){
                let data = parseFloat(value);
                $.ajax({
                    url: $("#PageContext").val()+'/IndexServlet?pid=31',
                    type:'get',
                    dataType:"json",
                    data: {money:data,dateTime:new getTimeNow().getTime(),userId:userAdmin.getId()},
                    success: function (data) {
                        if(data[0]!=="null"){
                            layer.msg('充值成功!',{
                                icon: 6,
                                skin:'layui-layer-molv',
                                anim: 4,
                                offset: '350px'
                            });
                            userAdmin.setMoney(data[0])
                        }
                    },error: function (data) {
                        layer.msg('充值失败!',{
                            icon: 5,
                            skin:'layui-layer-molv',
                            anim: 4,
                            offset: '350px'
                        })
                    }
                })
                layer.close(index);
            }else{
                layer.msg('请正确输入数值',function () {});
                elem.input.val('');
            }
        });
    })
    //地址管理
    userAddress.click(userAddressRecord);
    //封装地址管理方法
    function userAddressRecord () {
        radioSelect(null,null,null,null,false);
        $('.addressRecord').css({
            "display":'inline'
        }).html('<table id="addressRecord" lay-filter="test"></table><button id="insertAddress">添加地址</button><button id="tableButton">关闭</button><button id="deleteAddress">删除地址</button>');
        table.render({
            elem: '#addressRecord',
            type: 'post',
            url: $("#PageContext").val()+'/IndexServlet?pid=39',
            skin: 'row|line',
            //隔行背景
            even: true,
            cols: [ [
                {type: 'radio'}
                ,{field: 'addressId', title: '地址编号',sort: true,align:'left'}
                ,{field: 'addressName', title: '地址名称',width:200,align:'left',edit: 'test'}
                ,{field: 'addressUser', title: '联系人',align:'left',edit: 'test'}
                ,{field: 'addressPhone', title: '联系电话',width:150,align:'left',edit: 'test'}
            ] ],
        });
        $('.main').css({
            'opacity': '0.5',
            'filter': 'blur(5px)',
            'pointer-events': 'none'
        });
        $('#tableButton').css({
            'width': '100px',
            'height': '42px',
            'border-radius': '4px',
            'float': 'right',
            'background-color': '#1e9fff',
            'letter-spacing': '5px',
            'text-align': 'center',
            'border': '0',
            'color':'white',
            'font':'600 18px SourceHanSansSC',
            'cursor': 'pointer'
        }).on('click',function () {
            $('.addressRecord').css({
                "display":'none'
            }).html('');
            $('.main').css({
                'opacity': '1',
                'filter': 'none',
                'pointer-events': 'auto'
            })
        });
        //添加地址
        $('#insertAddress').css({
            'width': '100px',
            'height': '42px',
            'border-radius': '4px',
            'float': 'left',
            'background-color': '#1e9fff',
            'letter-spacing': '5px',
            'text-align': 'center',
            'border': '0',
            'color':'white',
            'font':'600 18px SourceHanSansSC',
            'cursor': 'pointer'
        }).on('click',function () {
            $('.addressRecord').css({
                "display":'none'
            }).html('');
            let bj = false;
            insertAddress(bj);
        });
        //删除地址
        $('#deleteAddress').css({
            'width': '100px',
            'height': '42px',
            'border-radius': '4px',
            'float': 'left',
            'margin-left':'150px',
            'background-color': '#36a1ef',
            'letter-spacing': '5px',
            'text-align': 'center',
            'border': '0',
            'color':'white',
            'font':'600 18px STKaiti',
            'cursor': 'pointer'
        }).on('click',deleteAdd);
    }
    table.on('edit(test)', function(obj){
        var old=$(this).prev().text();//旧值
        let value = obj.value; //得到修改后的值
        let field = obj.field; //当前编辑的字段名
        let message = obj.data; //所在行的所有相关数据
        layer.confirm('确定要修改表格数据吗？', {
            offset:'350px',
            btn: ['确定','取消'] //按钮
        }, function(){
            switch (field) {
                case 'addressName': updateAddress(40,value,message.addressId);break;
                case 'addressUser': updateAddress(41,value,message.addressId);break;
                case 'addressPhone': updateAddress(42,value,message.addressId);break;
            }
        },function () {
            //取消的话让他数据回显
            setTimeout(function () {
                switch (field){
                    case 'addressId':  obj.update({addressId:old}) ;break;// 更新当前字段在缓存中的数据
                    case 'addressName': obj.update({addressName:old}) ;break;
                    case 'addressUser':  obj.update({addressUser:old}) ;break;
                    case 'addressPhone':  obj.update({addressPhone:old}) ;break;
                }
            },100)
        });
    });
    //单选框选择(封装)
    function radioSelect(id,title,price,youLike,flag) {
        table.on('radio(test)', function(obj){
            // console.log(obj); //当前行的一些常用操作集合
            // console.log(obj.checked); //当前是否选中状态
            // console.log(obj.data); //选中行的相关数据
            //标记 区别是订餐还是选中删除地址
            if(flag===true){
                if(obj.checked){
                    addressRadio = new addressRecord(obj.data.addressId,obj.data.addressName,obj.data.addressPhone,obj.data.addressUser,userAdmin.getId());
                    payOver(id,title,price,obj.data.addressId,youLike)
                }
            }else if(flag===false){
                deleteAddress = new addressRecord()
                if(obj.checked){
                    deleteAddress.setAddressId(obj.data.addressId);
                }
            }
        });
    }
    //删除地址的函数
    function deleteAdd () {
        $.ajax({
            url: $("#PageContext").val()+'/IndexServlet?pid=47',
            type: 'get',
            dataType: 'json',
            data: {id:deleteAddress.getAddressId()},
            success: function (data) {
                if(data){
                    layer.msg('删除成功',{
                        icon: 1,
                        skin: 'layui-layer-molv',
                        anim: 4,
                        offset: '350px'
                    })
                }else{
                    layer.msg('该地址因与订单表等表关联，为了保留订单信息，系统不给于删除权限！',function () {});
                }
                userAddressRecord();
            },
            error: function (data) {
                layer.msg('出现异常！',function () {});
            }
        });
        $('.addressRecord').css({
            "display": 'none'
        }).html('');
        $('.main').css({
            'opacity': '1',
            'filter': 'none',
            'pointer-events': 'auto'
        })
    }
    //选择完地址后的函数
    function payOver(id,title,price,addressId,youLike) {
        //菜品名称
        let dat = {payTime:new getTimeNow().getTime(),
            vegPrice:price,
            vegMany:1,
            vegId:id,
            vegName:title,
            addressId: addressId,}
        $.ajax({
            url: $("#PageContext").val()+'/IndexServlet?pid=44',
            type: 'get',
            dataType: 'json',
            data: dat,
            success: function (data) {
                if(data[0]==="notMoney"){
                    layer.msg('您的余额不足，请及时充值！',{
                        icon:7,
                        offset: 'auto',
                        anim: 1,
                        skin: 'layui-layer-molv'
                    });
                }else{
                    userAdmin.setMoney(data)
                    layer.msg('支付成功,请耐性等待配送！',{
                        icon:6,
                        offset: 'auto',
                        anim: 3,
                        skin: 'layui-layer-molv'
                    });
                    if(youLike==="youLikeVegOne"){
                        youLikeVeg01.setVegCount((youLikeVeg01.getVegCount())-1);
                    }else if(youLike==="youLikeVegTwo"){
                        youLikeVeg02.setVegCount((youLikeVeg02.getVegCount())-1);
                    }else if(youLike==="youLikeVegThree"){
                        youLikeVeg03.setVegCount((youLikeVeg03.getVegCount())-1);
                    }else if(youLike==="youLikeVegFour"){
                        youLikeVeg04.setVegCount((youLikeVeg04.getVegCount())-1);
                    }
                }
                $('.addressRecord').css({
                    "display":'none'
                }).html('');
                $('.main').css({
                    'opacity': '1',
                    'filter': 'none',
                    'pointer-events': 'auto'
                })
            },
            error: function (data) {
                layer.msg("出现错误！",function () {})
            }
        })

    };
    //更新表格数据的ajax请求
    function updateAddress(pid,value,id) {
        $.ajax({
            url: $("#PageContext").val()+'/IndexServlet?pid='+pid,
            type: 'get',
            dataType: 'json',
            data: {value:value,id:id},
            success: function (data) {
                if(data.message === 'true'){
                    layer.msg('修改成功',{
                        icon: 1,
                        anim:4,
                        offset: '350px',
                        skin: 'layui-layer-molv'
                    })
                }else if(data.message === 'false') {
                    layer.msg('修改失败',{
                        icon: 2,
                        anim:4,
                        offset: '350px',
                        skin: 'layui-layer-molv'
                    })
                }
            },
            error: function (data) {
                layer.msg('请正确填写信息,只能为字符串！',function () {})
            }
        })
    }
    //订单管理
    userOrderForm.click(function () {
        $('.orderFormRecord').css({
            "display":'inline'
        }).html('<table id="orderForm"></table><button id="tableButton">关闭</button>');
        table.render({
            elem: '#orderForm',
            type: 'post',
            height: 480,
            url: $("#PageContext").val()+'/IndexServlet?pid=38',
            skin: 'row|line',
            even: true,
            cols: [[
                {field: 'oId', title: '订单编号',fixed: 'left',align:'left'}
                ,{field: 'vegName', title: '菜品名称',width:210,align:'left'}
                ,{field: 'vegMany', title: '菜品数量',sort: true,align:'left'}
                ,{field: 'vegPrice', title: '菜品价格',sort: true,align:'left'}
                ,{field: 'user', title: '联系人',align:'left'}
                ,{field: 'phone', title: '联系电话',align:'left'}
                ,{field: 'address', title: '地址',width:350,align:'left'}
                ,{field: 'payMoney', title: '支付金额',sort: true,align:'left'}
                ,{field: 'payTime', title: '支付时间',width:175,sort: true,align:'left'}
            ]],
        });
        $('.main').css({
            'opacity': '0.5',
            'filter': 'blur(5px)',
            'pointer-events': 'none'
        });
        $('#tableButton').css({
            'width': '100px',
            'height': '42px',
            'border-radius': '4px',
            'float': 'right',
            'background-color': '#1e9fff',
            'letter-spacing': '5px',
            'text-align': 'center',
            'border': '0',
            'color':'white',
            'font':'600 18px SourceHanSansSC',
            'cursor': 'pointer'
        }).on('click',function () {
            $('.orderFormRecord').css({
                "display":'none'
            }).html('');
            $('.main').css({
                'opacity': '1',
                'filter': 'none',
                'pointer-events': 'auto'
            })
        });
    })
    //修改密码
    modifyPassword.click(function () {
        $('.updatePassword').css({
            'display':'inline',
        });
        $('.main').css({
            'opacity': '0.5',
            'filter': 'blur(5px)',
            'pointer-events': 'none'
        });
        $('.last').click(function () {
            $('.main').css({
                'opacity': '1',
                'filter': 'none',
                'pointer-events': 'auto'
            });
            $('.updatePassword').css({
                'display':'none',
            });
        });
        form.on('submit(go)',function (data) {
            let field = data.field;
            let old = field.old;
            let newPass = field.new;
            let dat = {newPass:newPass,account:userAdmin.getAccount()}
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
    })
    //充值记录
    topUp.click(function () {
        $('.orderFormRecord').css({
            "display":'none'
        }).html('');
        $('.topupRecord').css({
            "display":'inline'
        }).html('<table id="topUpRecord"></table><button id="topUpClose">关闭</button>');
        table.render({
            elem: '#topUpRecord',
            type: 'post',
            height: 400,
            url: $("#PageContext").val()+'/IndexServlet?pid=36',
            skin: 'row|line',
            even: true,
            cols: [[
                {field: 'topUpId', title: '编号', fixed: 'left',}
                ,{field: 'topUpMoney', title: '金额（元）'}
                ,{field: 'topUpTime', title: '时间', width:200,sort: true}
            ]],
        });
        $('.main').css({
            'opacity': '0.5',
            'filter': 'blur(5px)',
            'pointer-events': 'none'
        });
        $('#topUpClose').css({
            'width': '100px',
            'height': '42px',
            'border-radius': '4px',
            'float': 'right',
            'background-color': '#1e9fff',
            'letter-spacing': '5px',
            'text-align': 'center',
            'border': '0',
            'color':'white',
            'font':'600 18px SourceHanSansSC',
            'cursor': 'pointer'
        }).on('click',function () {
            $('.topupRecord').css({
                "display":'none'
            }).html('');
            $('.main').css({
                'opacity': '1',
                'filter': 'none',
                'pointer-events': 'auto'
            })
        });
    })

    //退出
    exit.click(function () {
        $.ajax({
            url:$("#PageContext").val()+'/IndexServlet?pid=35',
            type:'get',
            dataType:"json",
            success: function (data) {
                if(data[0]==="true"){
                    layer.msg('退出!',{
                        icon: 1,
                        skin:'layui-layer-molv',
                        anim: 4,
                        offset: '350px'
                    })
                    session = null;
                    setTimeout(function () {
                        window.location.reload()
                    },500)
                }
            }
        })
    })

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

    //轮播图
    carousel.render({
        elem: '#carousel',
        width: '900px',
        height: '530px',
        //切换方式
        anim: 'default',
        //自动播放
        autoplay: true,
        //箭头总是显示
        arrows: 'always',
        //焦点的位置
        indicator: 'none',
    });

    //导航滑动
    $(document).ready(function() {
        setSlip();
    });
    var setSlip = function() {
        var navMarker = $(".nav-span");
        var navCurrent = $(".nav .nav-item");
        navMarker.css("left",navCurrent.position().left);
        let nav = $(".nav-section a");
        nav.mouseenter(function() {
            navMarker.stop().animate({
                width: $(this).width(),
                left: $(this).position().left + "px"
            }, 92);
        });
        nav.mouseleave(function() {
            navMarker.stop().animate({
                width: 0,
                left: navCurrent.position().left + "px"
            }, 800);
        });
    }
    //拼音触发input事件
    input.on('compositionstart',function(){
        flag = false;
    });
    input.on('compositionend',function(){
        flag = true;
    })
    //搜索下拉提示
    input.keyup(function(event){
        if(session==="session"){
            if(flag){
                if(((event.which) <= 105 && (event.which) >= 48) || (event.which) === 32){
                    //删除属性的所有元素
                    options.empty();
                    //获取文本框的值(String类型)
                    let val = input.val();
                    searchAjax(val);
                    hint.addClass("hintCss");
                    input.addClass("inputCss");
                }else if(event.which === 13 || event.which === 38 || event.which === 40){
                    hint.addClass("hintCss");
                    input.addClass("inputCss");
                }else{
                    options.empty();
                    hint.removeClass("hintCss");
                    input.removeClass("inputCss");
                }
            }
            if(typeof (input.val()) === "undefined" || input.val()===''){
                options.empty();
                hint.removeClass("hintCss");
                input.removeClass("inputCss");
            }
        }else {
            layerNOLogin();
        }
    });
    //input框获取焦点方法
    input.on('focus',function(event){
        let tyof = typeof (input.val());
        let val = input.val();
        if(tyof === "undefined" || val === ''){
            hint.removeClass("hintCss");
            input.removeClass("inputCss");
            options.empty();
        }else if(tyof !== "undefined" && val !== ''){
            hint.addClass("hintCss");
            input.addClass("inputCss");
            searchAjax(input.val());
        }
    });
    //封装搜索的ajax
    function searchAjax(val) {
        $.ajax({
            url: $("#PageContext").val()+"/IndexServlet?pid=45",
            type: "post",
            data: {value:val},
            success: function (data) {
                if(data.length===0){
                    //清空他的元素
                    options.empty();
                    let li = $('<li></li>');
                    li.html("没有找到相关信息！");
                    li.addClass('option-li-not');
                    options.append(li);
                }else{
                    //清空他的元素
                    options.empty();
                    //添加元素
                    ulLiLength = data.length;
                    for (let i = 0; i < data.length; i++) {
                        //创建对象
                        searchVeg = new vegTables(data[i].id,data[i].name,data[i].many,data[i].money,data[i].url);
                        searchList.push(searchVeg);

                        let li = $('<li></li>');
                        options.append(li);
                        li.html(data[i].name);
                        li.addClass('option-li');
                        li.on('click',function (){
                            searchIndex = $(this).index();
                            input.val('')
                            searchVeg = searchList[searchIndex];
                            layerMsgCur(null,searchVeg.getVegId(),searchVeg.getVegName(),searchVeg.getVegUrl(),searchVeg.getVegCount(),searchVeg.getVegPrice());
                            options.empty();
                            hint.removeClass("hintCss");
                            input.removeClass("inputCss");
                            searchIndex = -1;
                        });
                    }
                }
            },
        });
    }
    //键盘按下的事件
    input.keydown(function(event){
        let li = $('li');
        let ul = $('ul.options li');
        switch (event.which) {
            //向下箭头
            case 40:
                //删除他的默认事件
                event.preventDefault();
                ul.removeClass('keyLi');
                if(ulNubmer<ulLiLength-1){
                    $('ul.options li:eq('+ ++ulNubmer+')').addClass('keyLi');
                }else{
                    $('ul.options li:eq(0)').addClass('keyLi');
                    ulNubmer = 0;
                }
                break;
            //上
            case 38:
                //删除他的默认事件
                event.preventDefault();
                ul.removeClass('keyLi');
                if(ulNubmer>0){
                    $('ul.options li:eq('+ --ulNubmer+')').addClass('keyLi');
                }else{
                    $('ul.options li:eq('+ (ulLiLength - 1) +')').addClass('keyLi');
                    ulNubmer = (ulLiLength - 1);
                }
                break;
            case 13:
                if(session==="session"){
                    if(input.val() === '' || typeof(input.val()) === 'undefined'){
                        layer.msg('输入信息才可以搜索哦！',{
                            icon: 7,
                            anim: 2,
                            skin: 'layui-layer-molv',
                            offset: '350px'
                        });
                        input.val('');
                    }else if(ulNubmer>-1){
                        var text = li[ulNubmer].innerText;
                        input.val(text);
                    }
                    if(input.val()!==''){
                        searchBut();
                    }
                    ulNubmer = -1;
                    options.empty();
                    hint.removeClass("hintCss");
                    input.removeClass("inputCss");
                    break;
                }else{
                    layerNOLogin();
                }

        }
        if((105>=event.which && event.which>=48)){
            hint.addClass("hintCss");
            input.addClass("inputCss");
        }
    });
    //搜索框失去焦点的事件
    input.on('blur',function(){
        setTimeout(function () {
            options.empty();
            hint.removeClass("hintCss");
            input.removeClass("inputCss").html('');
        },100);

        //不让第一行数据上去
        // ulNubmer = -1;
        // input.val($('li:eq('+ (ulNubmer+1) +')').html());
    });
    //搜索按钮
    searchButton.click(function () {
        if(session==="session"){
            searchBut();
        }else {
            layerNOLogin();
        }
    });
    //搜索按钮封装
    function searchBut() {
        if(input.val()!==''){
            if(ulNubmer !== -1){
                searchVeg = searchList[ulNubmer];
                layerMsgCur(null,searchVeg.getVegId(),searchVeg.getVegName(),searchVeg.getVegUrl(),searchVeg.getVegCount(),searchVeg.getVegPrice())
                input.val('');
            }else if(searchIndex >= 0){
                searchVeg = searchList[searchIndex];
                layerMsgCur(null,searchVeg.getVegId(),searchVeg.getVegName(),searchVeg.getVegUrl(),searchVeg.getVegCount(),searchVeg.getVegPrice())
                input.val('');
            }else{
                $.ajax({
                    url: $("#PageContext").val()+'/IndexServlet?pid=46',
                    dataType: 'json',
                    type: 'get',
                    data: {val:input.val()},
                    success: function (data) {
                        if(data.data.length>0){
                            $('.searchLayer').css({
                                "display":'inline'
                            }).html('<table id="searchLayer" lay-filter="search"></table><button id="searchButton">关闭</button>');
                            table.render({
                                elem: '#searchLayer',
                                type: 'post',
                                url: $("#PageContext").val()+'/IndexServlet?pid=46',
                                skin: 'row|line',
                                where: {val:input.val()},
                                even: true,
                                cols: [ [
                                    {type: 'radio'}
                                    ,{field: 'id', title: '编号',sort: true,align:'left'}
                                    ,{field: 'name', title: '名称',width:200,align:'left'}
                                    ,{field: 'many', title: '数量',align:'left'}
                                    ,{field: 'money', title: '价格',align:'left'},
                                    {field: 'url', title: '图片',width:250,align:'left'}
                                ] ],
                            });
                            $('.main').css({
                                'opacity': '0.5',
                                'filter': 'blur(5px)',
                                'pointer-events': 'none'
                            });
                            $('#searchButton').css({
                                'width': '100px',
                                'height': '42px',
                                'border-radius': '4px',
                                'float': 'right',
                                'background-color': '#1e9fff',
                                'letter-spacing': '5px',
                                'text-align': 'center',
                                'border': '0',
                                'color':'white',
                                'font':'600 18px SourceHanSansSC',
                                'cursor': 'pointer'
                            }).on('click',function () {
                                $('.searchLayer').css({
                                    "display":'none'
                                }).html('');
                                $('.main').css({
                                    'opacity': '1',
                                    'filter': 'none',
                                    'pointer-events': 'auto'
                                })
                            });
                            SearchRadio();
                        }else if(data.data.length===0){
                            layer.msg('本家小店没有您想要的菜品，给你带来麻烦很是抱歉',{
                                icon: 7,
                                anim: 2,
                                skin: 'layui-layer-molv',
                                offset: '350px'
                            });s
                        }
                    }

                })
            }
        }else{
            layer.msg('输入信息才可以搜索哦！',{
                icon: 7,
                anim: 2,
                skin: 'layui-layer-molv',
                offset: '350px'
            });
        }
    }
    //单选框选择(封装)
    function SearchRadio() {
        table.on('radio(search)', function(obj){
            if(obj.checked){
                layerMsgCur(null,obj.data.id,obj.data.name,obj.data.url,obj.data.many,obj.data.money);
            }
        });
    }
    //鼠标移上
    group.hover(function(){
        group.css({
            'z-index':'5','height':'400px','background-size':'90%',
        });
    },function () {
        group.css({
            'height':'327px',
            'background-size':'75%',
            'z-index':'1'
        });
    })
    snack.hover(function(){
        snack.css({
            'width':'400px'
        });
    },function () {
        snack.css({
            'width':'327px'
        });
    })
    schoolEat.hover(function(){
        schoolEat.css({
            'height':'400px','background-size':'100%'
        });
    },function () {
        schoolEat.css({
            'height':'327px','background-size':'85%'
        });
    })
    oneMoney.hover(function(){
        oneMoney.css({
            'width':'400px'
        });
    },function () {
        oneMoney.css({
            'width':'327px'
        });
    })
    //点击图标回到首页
    headIcon.on('click',function () {
        location.href = $("#PageContext").val()+'/index.jsp'
    })
});