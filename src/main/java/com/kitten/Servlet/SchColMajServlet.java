package com.kitten.Servlet;
import com.alibaba.fastjson.JSONArray;
import com.kitten.Popj.College;
import com.kitten.Popj.Major;
import com.kitten.Popj.School;
import com.kitten.Service.schoolMessage.ServiceSchoolMessage;
import com.kitten.Service.schoolMessage.ServiceSchoolMessageImpl;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
/**
 * @author ASUS
 */
@WebServlet(name = "SchColMajServlet", value = "/SchColMajServlet")
public class SchColMajServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        schColMaj(request,response);
    }
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request,response);
    }
    public void schColMaj(HttpServletRequest request,HttpServletResponse response){
        //ajax请求时携带过来的参数用来判断
        int pid = Integer.parseInt(request.getParameter("pid"));
        ServiceSchoolMessage schoolMessage = new ServiceSchoolMessageImpl();
        School school = schoolMessage.getSchool();
        College[] college = schoolMessage.getCollege();
        Major[] major = schoolMessage.getMajor(pid);
        //创建list集合
        List<Object> list = new ArrayList<>();
        //返回学校信息
        if(pid == 10){
            list.add(school);
        }else if(pid == 11){
            //返回学院信息
            for (int i = 0; i < college.length; i++) {
                list.add(i,college[i]);
            }
        }else if(pid>=1&&pid<=9){
            //返回专业信息
            for (int i = 0; i < major.length; i++) {
                list.add(i,major[i]);
            }
        }
        //设置响应类型为json
        response.setContentType("application/json");
        //使用流返回
        try {
            PrintWriter writer = response.getWriter();
            //写成json
            writer.write(JSONArray.toJSONString(list));
            writer.flush();
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
