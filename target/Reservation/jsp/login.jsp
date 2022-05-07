<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta name="referrer" content="no-referrer">
    <title>西航下下饭登陆页</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/layui/css/layui.css" charset="UTF-8">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/login.css" charset="UTF-8">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/footer.css" charset="UTF-8">
</head>
<body>
<input id="PageContext" type="hidden" value="${pageContext.request.contextPath}" />
<!--头部-->
<header>
    <div class="headIcon">
        <img src="../img/icon.png" alt="" class="icon">
        <h1>西航下下饭</h1>
    </div>
    <div class="login">
        <p>没有账号？</p>
        <div class="layui-btn-container">
            <button type="button" class="layui-btn layui-btn-normal layui-btn-radius"><a href="register.jsp">注册</a></button>
        </div>
    </div>
    <hr>
</header>
<!--主体-->
<div class="main">
    <div class="layui-carousel" id="img">
        <div carousel-item>
            <div><img src="../img/loginCarV1.jpg" alt="西航下下饭"></div>
            <div><img src="../img/loginCarV2.jpg" alt="西航下下饭"></div>
            <div><img src="../img/loginCarV3.jpg" alt="西航下下饭"></div>
            <div><img src="../img/loginCarV4.jpg" alt="西航下下饭"></div>
            <div><img src="../img/loginCarV5.jpg" alt="西航下下饭"></div>
            <div><img src="../img/loginCarV6.jpg" alt="西航下下饭"></div>
            <div><img src="../img/loginCarV7.jpg" alt="西航下下饭"></div>
            <div><img src="../img/loginCarV8.jpg" alt="西航下下饭"></div>
            <div><img src="../img/loginCarV9.jpg" alt="西航下下饭"></div>
        </div>
    </div>
    <div class="register">
        <form action="../index.jsp" class="layui-form" method="get">
            <p>登陆</p>
            <!--账 号框-->
            <div class="account">
                <div class="layui-form-item">
                    <img src="../img/loginUser.png" alt="账号">
                    <label class="layui-form-label">账号:</label>
                    <div class="layui-input-block">
                        <input type="text" name="username" lay-verify="account" autocomplete="off" placeholder="请输入账号" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <img src="../img/loginPassWord.png" alt="密码">
                    <label class="layui-form-label">密码:</label>
                    <div class="layui-input-block">
                        <input type="password" name="password" lay-verify="password" placeholder="请输入密码" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <p class="forget">忘记密码</p>
            </div>
            <fieldset class="layui-elem-field">
                <legend>注意</legend>
                <input type="checkbox" name="close" lay-skin="switch" lay-filter="close" title="同意">
                <div class="layui-field-box">
                    我已阅读并同意《<a id="kitten">曹蛋蛋协议</a>》《<a id="Shimoiizaka">西航下下饭使用协议</a>》，并授权西航下下饭保存我的个人信息。
                </div>
            </fieldset>
            <div class="layui-submit">
                <button type="button" id="buttonSubmit" class="layui-btn">登陆</button>
            </div>
        </form>
    </div>
    <div class="forgetPassword">
        <form class="layui-form" method="get">
            <p>找回密码?</p>
            <!--账号框-->
            <div class="forgetForm">
                <div class="layui-form-item">
                    <img src="../img/formName.png" alt="姓名">
                    <label class="layui-form-label">姓名:</label>
                    <div class="layui-input-block">
                        <input type="text" name="name" lay-verify="required|name" autocomplete="off" placeholder="请输入姓名" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <img src="../img/formPhone.png" alt="电话">
                    <label class="layui-form-label">电话:</label>
                    <div class="layui-input-block">
                        <input type="text" name="phone" lay-verify="required|phone" placeholder="请输入电话号码" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <img src="../img/formUser.png" alt="账号">
                    <label class="layui-form-label">账号:</label>
                    <div class="layui-input-block">
                        <input type="text" name="account" lay-verify="required|account" placeholder="请输入账号" autocomplete="off" class="layui-input">
                    </div>
                </div>
            </div>
            <div class="layui-submit">
                <button type="button" class="layui-btn last">上一步</button>
                <button type="button" class="layui-btn" lay-submit lay-filter="next">下一步</button>
            </div>
        </form>
    </div>
    <div class="updatePassword">
        <form class="layui-form" method="get">
            <p>修改密码?</p>
            <!--账号框-->
            <div class="forgetForm">
                <div class="layui-form-item">
                    <img src="../img/formPassWord.png" alt="密码">
                    <label class="layui-form-label">新密码:</label>
                    <div class="layui-input-block">
                        <input type="password" name="old" lay-verify="required|password" autocomplete="off" placeholder="请输入密码" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <img src="../img/updataPassword.png" alt="密码">
                    <label class="layui-form-label">确认密码:</label>
                    <div class="layui-input-block">
                        <input type="password" name="new" lay-verify="required|password" placeholder="请确认密码" autocomplete="off" class="layui-input">
                    </div>
                </div>
            </div>
            <div class="layui-submit">
                <button type="button" class="layui-btn" lay-submit lay-filter="go">提交</button>
            </div>
        </form>
    </div>
</div>
<%@include file="footer.jsp"%>
<script type="text/javascript" charset="UTF-8" src="${pageContext.request.contextPath}/static/layui/layui.js"></script>
<script type="text/javascript" charset="UTF-8" src="${pageContext.request.contextPath}/js/login.js"></script>
</body>
</html>
