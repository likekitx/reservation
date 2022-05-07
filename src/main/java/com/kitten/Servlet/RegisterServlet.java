package com.kitten.Servlet;
import com.alibaba.fastjson.JSONArray;
import com.kitten.Service.Register.RegisterService;
import com.kitten.Service.Register.RegisterServiceImpl;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
/**
 * @author ASUS
 */
@WebServlet(name = "RegisterServlet", value = "/RegisterServlet")
public class RegisterServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if(request.getParameter("pid").equals("14")){
            register(request,response);
        }
    }
    //注册信息
    public void register(HttpServletRequest request,HttpServletResponse response){
        String name = request.getParameter("name");
        String age = request.getParameter("age");
        String sex = request.getParameter("sex");
        String phone = request.getParameter("phone");
        String email = request.getParameter("email");
        String school = request.getParameter("school");
        String college = request.getParameter("college");
        String major = request.getParameter("major");
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        RegisterService registerService = new RegisterServiceImpl();
        Map<Object,Object> map = new HashMap<>(1);
        boolean b = registerService.selectUserService(username);
        if(b){
            //注册过了
            map.put("message", "false");
        }else{
            //没注册过
            boolean flag = registerService.setRegisterService(name,
                    Integer.parseInt(age), sex, Integer.parseInt(username), password,
                    email, phone, Integer.parseInt(major));
            if(flag){
                //注册成功吧
                map.put("message", "true");
            }
        }
        response.setContentType("application/json");
        PrintWriter writer = null;
        try {
            writer = response.getWriter();
            writer.write(JSONArray.toJSONString(map));
            writer.flush();
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
