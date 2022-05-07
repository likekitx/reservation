<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta name="referrer" content="no-referrer">
    <title>boss</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/layui/css/layui.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/boss.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/footer.css">
</head>
<body>
<input id="PageContext" type="hidden" value="${pageContext.request.contextPath}" />
<header>
    <div class="headIcon">
        <img src="../img/icon.png" alt="" class="icon">
        <h1>西航下下饭</h1>
    </div>
    <img src="" alt="">
    <hr>
</header>
<div class="main">
    <section class="icon-section">
        <div class="dialog">
            <p>即使无法和云相拥，也望着同一片天空！</p>
        </div>
        <img src="../img/diaGirlOne.png" alt="人物">
    </section>
    <section class="nav-section">
        <div class="nav">
            <a id="navItemOne" class="nav-item" href="javascript:void(0)">用户数量</a>
            <div id="navItemNumber"></div>
            <a id="navItemTwo" class="nav-item" href="javascript:void(0)">收入</a>
            <div id="navItemInCome"></div>
            <a id="navItemThree" class="nav-item" href="javascript:void(0)">余额</a>
            <div id="navItemBalance"></div>
            <a id="navItemFour" class="nav-item" href="javascript:void(0)">支出</a>
            <div id="navItemExpend"></div>
            <a id="navItemFive" class="nav-item" href="javascript:void(0)">查看菜品</a>
            <a id="navItemSex" class="nav-item" href="javascript:void(0)">添加菜品</a>
        </div>
    </section>
    <section class="mainThis" id="mainThis">
        <form class="layui-form" method="post" id="myform">
            <div class="layui-form-item">
                <img src="../img/bossVegName.png" alt="名称">
                <label class="layui-form-label">名称:</label>
                <div class="layui-input-block">
                    <input type="text" name="name" required  lay-verify="required" placeholder="名称" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <img src="../img/bossVegNumber.png" alt="数量">
                <label class="layui-form-label">数量:</label>
                <div class="layui-input-block">
                    <input type="text" name="count" required  lay-verify="required" placeholder="数量" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <img src="../img/bossVegMoney.png" alt="价格">
                <label class="layui-form-label">价格:</label>
                <div class="layui-input-block">
                    <input type="text" name="price" required  lay-verify="required" placeholder="价格" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <img src="../img/bossVegUrl.png" alt="">
                <label class="layui-form-label">url:</label>
                <div class="layui-input-block">
                    <input type="text" name="url" required  lay-verify="required" placeholder="url" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-submit">
                <button type="button" class="layui-btn" id="sub">提交</button>
            </div>
        </form>
    </section>
    <section class="vegTable">
        <table id="vegTable" lay-filter="test"></table>
        <button class="deleteVeg" id="deleteVeg">删除菜品</button>
    </section>
</div>
<%@include file="footer.jsp"%>
<script type="text/javascript" charset="UTF-8" src="${pageContext.request.contextPath}/static/layui/layui.js"></script>
<script type="text/javascript" charset="UTF-8" src="${pageContext.request.contextPath}/js/boss.js"></script>
</body>
</html>
