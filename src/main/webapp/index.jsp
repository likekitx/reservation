<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta name="referrer" content="no-referrer">
    <title>西航下下饭</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/layui/css/layui.css" charset="UTF-8">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/index.css" charset="UTF-8">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/footer.css" charset="UTF-8">
</head><body>
<input id="PageContext" type="hidden" value="${pageContext.request.contextPath}" />
<!--头部-->
<header>
    <div class="headIcon">
        <img src="img/icon.png" alt="" class="icon">
        <h1>西航下下饭</h1>
    </div>
    <section class="nav-section">
        <div class="nav">
            <a class="nav-item" id="navSlide01">小吃快餐</a>
            <a class="nav-item" id="navSlide02">甜点饮食</a>
            <a class="nav-item" id="navSlide03">川湘菜</a>
            <a class="nav-item" id="navSlide04">冒菜</a>
            <a class="nav-item" id="navSlide05">东北菜</a>
            <a class="nav-item" id="navSlide06">特色菜</a>
            <span class="nav-span"></span>
        </div>
    </section>
    <section class="icon-section">
        <button type="button" class="layui-btn layui-btn-normal" id="loginButton"><a id="loginButtonA">登陆</a></button>
    </section>
    <hr>
</header>
<!--主体-->
<div class="main">
    <div class="search" id="search">
        <input id="input-search" type="text" autocomplete="off" name="input-search">
        <button id="search-button"></button>
        <div class="hint" id="hint"></div>
        <hr class="searchHr">
    </div>
    <!--    轮播图-->
    <div class="layui-carousel" id="carousel" lay-filter="carofilter">
        <div carousel-item>
            <div><img src="img/index01.jpg" alt="西航下下饭" align="1"></div>
            <div><img src="img/index02.jpg" alt="西航下下饭" align="2"></div>
            <div><img src="img/index03.jpg" alt="西航下下饭" align="3"></div>
            <div><img src="img/index04.jpg" alt="西航下下饭" align="4"></div>
            <div><img src="img/index05.jpg" alt="西航下下饭" align="5"></div>
            <div><img src="img/index06.jpg" alt="西航下下饭" align="6"></div>
        </div>
    </div>
    <!--    右边的小连接-->
    <div class="grid">
        <div class="snack" id="snack"><p>9块9</p><p class="p1">小吃快餐</p></div>
        <div class="schoolEat" id="schoolEat"><p>好吃5折</p><p class="p1">学校必吃</p></div>
        <div class="oneMoney" id="oneMoney"><p>一元购</p><p class="p1">每日必点</p></div>
        <div class="group" id="group"><p>拼团</p><p class="p1">优惠拼团</p></div>
        <div class="centerImg"><img src="img/centerImg.png" alt="猪猪"></div>
    </div>
    <!--    猜你喜欢-->
    <div class="youLike">
        <p class="youLikeP">猜你喜欢</p>
        <div class="youLikeVegOne">
            <img src="" alt="" id="img01">
            <p class="youLikePP" id="p01"></p>
        </div>
        <div class="youLikeVegTwo">
            <img src="" alt="" id="img02">
            <p class="youLikePP" id="p02"></p>
        </div>
        <div class="youLikeVegThree">
            <img src="" alt="" id="img03">
            <p class="youLikePP" id="p03"></p>
        </div>
        <div class="youLikeVegFour">
            <img src="" alt="" id="img04">
            <p class="youLikePP" id="p04"></p>
        </div>
    </div>
    <div class="orderForm">
        <a class="orderFormItem" id="userMoney">余额</a>
        <a class="orderFormItem" id="userTopUp">充值</a>
        <a class="orderFormItem" id="userAddress">地址管理</a>
        <a class="orderFormItem" id="userOrderForm">订单管理</a>
        <a class="orderFormItem" id="modifyPassword">修改密码</a>
        <a class="orderFormItem" id="topupRecord">充值记录</a>
        <a class="orderFormItem" id="exit">退出</a>
    </div>
</div>
<%--充值记录--%>
<div class="topupRecord"></div>
<%--订单管理--%>
<div class="orderFormRecord"></div>
<%--地址管理--%>
<div class="addressRecord"></div>
<%--搜索框弹窗--%>
<div class="searchLayer"></div>
<%--添加地址--%>
<div class="payAddressPhone">
    <form class="layui-form">
        <div class="forgetForm">
            <div class="layui-form-item">
                <img src="img/formName.png" alt="联系人">
                <label class="layui-form-label">联系人:</label>
                <div class="layui-input-block">
                    <input type="text" name="name" lay-verify="required|name" autocomplete="off" placeholder="联系人" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <img src="img/formPhone.png" alt="电话">
                <label class="layui-form-label">电话:</label>
                <div class="layui-input-block">
                    <input type="text" name="phone" lay-verify="required|phone" placeholder="电话" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <img src="img/payAddress.png" alt="地址">
                <label class="layui-form-label">地址:</label>
                <div class="layui-input-block">
                    <input type="text" name="address" lay-verify="required|address" placeholder="备注详细地址" autocomplete="off" class="layui-input">
                </div>
            </div>
        </div>
        <div class="layui-submit">
            <button type="button" class="layui-btn last">取消</button>
            <button type="button" class="layui-btn" lay-submit lay-filter="next">添加</button>
        </div>
    </form>
</div>
<%--修改密码--%>
<div class="updatePassword">
    <form class="layui-form" method="get">
        <p>修改密码?</p>
        <!--账号框-->
        <div class="forgetForm">
            <div class="layui-form-item">
                <img src="img/formPassWord.png" alt="密码">
                <label class="layui-form-label">新密码:</label>
                <div class="layui-input-block">
                    <input type="password" name="old" lay-verify="required|password" autocomplete="off" placeholder="请输入密码" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <img src="img/updataPassword.png" alt="密码">
                <label class="layui-form-label">确认密码:</label>
                <div class="layui-input-block">
                    <input type="password" name="new" lay-verify="required|password" placeholder="请确认密码" autocomplete="off" class="layui-input">
                </div>
            </div>
        </div>
        <div class="layui-submit">
            <button type="button" class="layui-btn last">取消</button>
            <button type="button" class="layui-btn" lay-submit lay-filter="go">提交</button>
        </div>
    </form>
</div>
<%@include file="/jsp/footer.jsp"%>
<script type="text/javascript" charset="UTF-8" src="${pageContext.request.contextPath}/static/layui/layui.js"></script>
<script type="text/javascript" charset="UTF-8" src="${pageContext.request.contextPath}/js/index.js"></script>
</body>
</html>
