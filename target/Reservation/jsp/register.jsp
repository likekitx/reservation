<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
  <meta name="referrer" content="no-referrer">
  <title>西航下下饭注册页</title>
  <link rel="stylesheet" href="${pageContext.request.contextPath}/static/layui/css/layui.css" charset="UTF-8">
  <link rel="stylesheet" href="${pageContext.request.contextPath}/css/register.css" charset="UTF-8">
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
    <p>已有账号？</p>
    <div class="layui-btn-container">
      <button type="button" class="layui-btn layui-btn-normal layui-btn-radius"><a href="login.jsp">登陆</a></button>
    </div>
  </div>
  <hr>
</header>
<!--主体-->
<div class="main">
<%--  轮播图--%>
  <div class="layui-carousel" id="img">
    <div carousel-item>
      <div><img src="../img/v1.png" alt="西航下下饭"></div>
      <div><img src="../img/v2.png" alt="西航下下饭"></div>
      <div><img src="../img/v3.png" alt="西航下下饭"></div>
      <div><img src="../img/v4.png" alt="西航下下饭"></div>
      <div><img src="../img/v5.png" alt="西航下下饭"></div>
      <div><img src="../img/v6.png" alt="西航下下饭"></div>
      <div><img src="../img/v7.png" alt="西航下下饭"></div>
      <div><img src="../img/v8.png" alt="西航下下饭"></div>
      <div><img src="../img/v9.png" alt="西航下下饭"></div>
    </div>
  </div>
<%--  注册--%>
  <div class="register">
    <form class="layui-form">
      <p>账号注册</p>
      <div class="layui-form-item">
        <img src="../img/formName.png" alt="姓名">
        <label class="layui-form-label">姓名:</label>
        <div class="layui-input-block">
          <input type="text" name="name"  lay-verify="required|name" placeholder="姓甚名谁" autocomplete="off" class="layui-input">
        </div>
      </div>
      <div class="layui-form-item">
        <img src="../img/formAge.png" alt="">
        <label class="layui-form-label">年龄:</label>
        <div class="layui-input-block">
          <input type="text" name="age" required  lay-verify="required|age" placeholder="芳龄" autocomplete="off" class="layui-input">
        </div>
      </div>
      <div class="layui-form-item">
        <img src="../img/formSex.png" alt="">
        <label class="layui-form-label">性别:</label>
        <div class="layui-input-block">
          <input type="radio" name="sex" value="男" title="男">
          <input type="radio" name="sex" value="女" title="女" checked>
        </div>
      </div>
      <div class="layui-form-item">
        <img src="../img/formPhone.png" alt="">
        <label class="layui-form-label">电话:</label>
        <div class="layui-input-inline">
          <input type="tel" name="phone" lay-verify="required|phone" autocomplete="off" class="layui-input">
        </div>
      </div>
      <div class="layui-form-item">
        <img src="../img/formEmail.png" alt="">
        <label class="layui-form-label">邮箱:</label>
        <div class="layui-input-inline">
          <input type="text" name="email" lay-verify="email" autocomplete="off" class="layui-input">
        </div>
      </div>
      <div class="school">
        <div class="layui-inline">
          <img src="../img/formSchool.png" alt="学校">
          <label class="layui-form-label">学校:</label>
          <div class="layui-input-inline">
            <select name="school" lay-filter="school" id="school" value="school" lay-verify="required" lay-search></select>
          </div>
        </div>
        <div class="layui-inline">
          <img src="../img/formCollege.png" alt="学院">
          <label class="layui-form-label">学院:</label>
          <div class="layui-input-inline">
            <select name="college" lay-filter="college" id="college" lay-verify="required" lay-search></select>
          </div>
        </div>
        <div class="layui-inline">
          <img src="../img/formMajor.png" alt="专业">
          <label class="layui-form-label">专业: </label>
          <div class="layui-input-inline">
            <select name="major" id="major" lay-verify="required" lay-filter="major" lay-search></select>
          </div>
        </div>
      </div>
      <!--账号框-->
      <div class="account">
        <div class="layui-form-item">
          <img src="../img/formUser.png" alt="账号">
          <label class="layui-form-label">账号:</label>
          <div class="layui-input-block">
            <input type="text" name="username" lay-verify="required|account" autocomplete="off" placeholder="6-12位自定义账号" class="layui-input">
          </div>
        </div>
        <div class="layui-form-item">
          <img src="../img/formPassWord.png" alt="">
          <label class="layui-form-label">密码:</label>
          <div class="layui-input-block">
            <input type="password" name="password" lay-verify="required|password" placeholder="请输入密码" autocomplete="off" class="layui-input">
          </div>
        </div>
      </div>
<%--      协议--%>
      <fieldset class="layui-elem-field">
        <legend>注意</legend>
<%--        开关--%>
        <input type="checkbox" name="close" lay-skin="switch" lay-filter="close" title="同意">
        <div class="layui-field-box">
          我已阅读并同意《<a id="kitten">曹蛋蛋协议</a>》《<a id="Shimoiizaka">西航下下饭使用协议</a>》，并授权西航下下饭保存我的个人信息。
        </div>
      </fieldset>
      <div class="layui-submit">
        <button type="button" lay-submit id="button" class="layui-btn">注册</button>
      </div>
    </form>
  </div>
</div>
<%@include file="footer.jsp"%>
<script type="text/javascript" charset="UTF-8" src="${pageContext.request.contextPath}/static/layui/layui.js"></script>
<script type="text/javascript" charset="UTF-8" src="${pageContext.request.contextPath}/js/register.js"></script>
</body>
</html>
