package com.kitten.Servlet;
import com.alibaba.fastjson.JSON;
import com.kitten.Popj.Boss;
import com.kitten.Service.Boss.BossService;
import com.kitten.Service.Boss.BossServiceImpl;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@WebServlet(name = "BossServlet", value = "/BossServlet")
public class BossServlet extends HttpServlet {
    Map<String,Object> map = null;
    List<Object> list = null;
    BossService bossService = null;
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        bossService = new BossServiceImpl();
        String pid = request.getParameter("pid");
        if("18".equals(pid)){
            selectBossMessage(request,response);
        }else if("19".equals(pid)){
            insertBossVeg(request,response);
        }else if("20".equals(pid)){
            updataBossVeg(request,response);
        }else if("21".equals(pid)){
            String field = "name";
            updataTable(field,request,response);
        }else if("22".equals(pid)){
            String field = "many";
            updataTable(field,request,response);
        }else if("23".equals(pid)){
            String field = "money";
            updataTable(field,request,response);
        }else if("24".equals(pid)){
            //删除地址
            deleteVeg(request,response);
        }
    }
//    删除菜品的servlet
    private void deleteVeg(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("id");
        boolean b = bossService.deleteVeg(id);
        writerReturn(response,b);
    }

    //表格数据编辑更新
    private void updataTable(String field,HttpServletRequest request,HttpServletResponse response) {
        String value = request.getParameter("value");
        String id = request.getParameter("id");
        boolean b = bossService.updateTable(field, value, Integer.parseInt(id));
        map = new HashMap<>(1);
        if(b){
            map.put("message","true");
        }else{
            map.put("message","false");
        }
        writerReturn(response,map);
    }

    //表格数据渲染
    private void updataBossVeg(HttpServletRequest request, HttpServletResponse response) {
        String page = request.getParameter("page");
        String limit = request.getParameter("limit");
        list = bossService.updataBossVeg(Integer.parseInt(page),Integer.parseInt(limit));
        map = new HashMap<>(4);
        map.put("code",0);
        map.put("msg","");
        map.put("count",Integer.parseInt(list.get(list.size()-1).toString()));
        //删除最后一个位置的元素，因为不是表格数据
        list.remove(list.size()-1);
        map.put("data",list);
        writerReturn(response,map);
    }
//    插入菜品
    private void insertBossVeg(HttpServletRequest request, HttpServletResponse response) {
        map = new HashMap<>(1);
        String name = request.getParameter("name");
        String count = request.getParameter("count");
        String price = request.getParameter("price");
        String url = request.getParameter("url");
        String str = bossService.insertBossVeg(name, Integer.parseInt(count), Double.parseDouble(price), url);
        if("exist".equals(str)){
            map.put("message","exist");
        }else if("true".equals(str)){
            map.put("message","true");
        }else {
            map.put("message","false");
        }
        writerReturn(response,map);
    }
//    查询人数、收入支出信息
    private void selectBossMessage(HttpServletRequest request,HttpServletResponse response) {
        map = new HashMap<>(4);
        Boss boss = bossService.selectBossMessage();
        double expend = boss.getExpend();
        int count = boss.getCount();
        double income = boss.getIncome();
        double money = boss.getMoney();
        map.put("count",count);
        map.put("income",income);
        map.put("expend",expend);
        map.put("money",money);
        writerReturn(response,map);
    }
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request,response);
    }
    //封装向前端页面输出的方法
    public void writerReturn(HttpServletResponse response,Object obj){
        response.setContentType("application/json");
        try {
            PrintWriter writer = response.getWriter();
            writer.write(JSON.toJSONString(obj));
            writer.flush();
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
