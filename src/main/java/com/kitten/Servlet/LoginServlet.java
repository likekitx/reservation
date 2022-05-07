package com.kitten.Servlet;
import com.alibaba.fastjson.JSONArray;
import com.kitten.Popj.Users;
import com.kitten.Service.Login.LoginService;
import com.kitten.Service.Login.LoginServiceImpl;
import com.kitten.Util.SessionConstants.Constants;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@WebServlet(name = "LoginServlet", value = "/LoginServlet")
public class LoginServlet extends HttpServlet {
    LoginService loginService = null;
    Map<Object,Object> map = null;
    Users users = null;
    List<Object> list = null;
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String pid = request.getParameter("pid");
         loginService = new LoginServiceImpl();
        if("15".equals(pid)){
            usersLogin(request,response);
        }else if("16".equals(pid)){
            forgetServlet(request,response);
        }else if("17".equals(pid)){
            updatePasswordServlet(request,response);
        }
    }
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request,response);
    }
    //接受用户登陆请求
    public void usersLogin(HttpServletRequest request,HttpServletResponse response){
        String account = request.getParameter("account");
        String password = request.getParameter("password");
        list = loginService.loginService(account, password);
        map = new HashMap<>(1);
        if("boss".equals(list.get(0))){
            map.put("message","boss");
        }else{
            map.put("message","true");
            //登陆成功后封装session，
            request.getSession().setAttribute(Constants.CONSTANTSSESSION,list.get(0));
            //有效时间30分钟
            request.getSession().setMaxInactiveInterval(1800);
        }
        writeReturn(response);
    }
    //忘记密码
    public void forgetServlet(HttpServletRequest request,HttpServletResponse response){
        String name = request.getParameter("name");
        String phone = request.getParameter("phone");
        String account = request.getParameter("account");
        boolean flag = loginService.selectForget(name, phone, Integer.parseInt(account));
        map = new HashMap<>(1);
        if(flag){
            map.put("message","true");
        }else{
            map.put("message","false");
        }
        writeReturn(response);
    }
    //修改密码
    public void updatePasswordServlet(HttpServletRequest request,HttpServletResponse response){
        String newPass = request.getParameter("newPass");
        String account = request.getParameter("account");
        boolean flag = loginService.forgetPassword(newPass, Integer.parseInt(account));
        map = new HashMap<>(1);
        if(flag){
            map.put("message","true");
        }else{
            map.put("message","false");
        }
        writeReturn(response);
    }
    //封装向前端响应数据的方法
    public void writeReturn(HttpServletResponse response){
        response.setContentType("application/json");
        try {
            PrintWriter writer = response.getWriter();
            writer.write(JSONArray.toJSONString(map));
            writer.flush();
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
