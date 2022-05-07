package com.kitten.Servlet;
import com.alibaba.fastjson.JSON;
import com.kitten.Dao.BaseDao;
import com.kitten.Dao.Login.LoginDao;
import com.kitten.Dao.Login.LoginDaoImpl;
import com.kitten.Popj.OrderForm;
import com.kitten.Popj.OrderFormVegetable;
import com.kitten.Popj.Users;
import com.kitten.Service.Index.IndexService;
import com.kitten.Service.Index.IndexServiceImpl;
import com.kitten.Util.SessionConstants.Constants;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@WebServlet(name = "IndexServlet", value = "/IndexServlet")
public class IndexServlet extends HttpServlet {
    List<Object> list = null;
    IndexService indexService = null;
    int excute = 0;
    Map<Object,Object> map = null;
    Map<String,String> mapString = null;
    //订单信息
    OrderForm orderForm = null;
    //订单菜品信息
    OrderFormVegetable orderFormVegetable = null;
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String pid = request.getParameter("pid");
        if("24".equals(pid)){
            //猜你喜欢的四张图的信息返回
            urlPrice(request,response,(Users) request.getSession().getAttribute(Constants.CONSTANTSSESSION));
        }else if("25".equals(pid)){
            //轮播图的第一张
            orderForm(request,response,request.getParameter("name"));
        }else if("26".equals(pid)){
            // 轮播图的第二张
            orderForm(request,response,request.getParameter("name"));
        }else if("27".equals(pid)){
            // 轮播图的第三张
            orderForm(request,response,request.getParameter("name"));
        }else if("28".equals(pid)){
            // 轮播图的第四张
            orderForm(request,response,request.getParameter("name"));
        }else if("29".equals(pid)){
            // 轮播图的第五张
            orderForm(request,response,request.getParameter("name"));
        }else if("30".equals(pid)){
            // 轮播图的第六张
            orderForm(request,response,request.getParameter("name"));
        }else if("31".equals(pid)){
            //充值
            topUp(request,response);
        }else if("35".equals(pid)){
            //退出
           exit(request,response);
        }else if("36".equals(pid)){
            //充值记录
           topupRecord(request,response);
        }else if("37".equals(pid)){
            //添加地址
           setAddress(request,response);
        }else if("38".equals(pid)){
            //订单管理
           orderFormRecord(request,response);
        }else if("39".equals(pid)){
            //地址管理
           addressRecord(request,response);
        }else if("40".equals(pid)){
            //修改地址表格的地址名称
            updateAddressTable(request,response,"addressName");
        }else if("41".equals(pid)){
            //修改地址表格的地址用户
            updateAddressTable(request,response,"addressUser");
        }else if("42".equals(pid)){
            //修改地址表格的用户电话
            updateAddressTable(request,response,"addressPhone");
        }else if("43".equals(pid)){
            //请求有没有地址
            selectAddressCount(request,response);
        }else if("44".equals(pid)){
            //更新底层信息
            updateMessage(request,response);
        }else if("45".equals(pid)){
            //搜索框
            search(request,response);
        }else if("46".equals(pid)){
            //搜索框
            tableSearch(request,response);
        }else if("47".equals(pid)){
            //删除地址
            deleteAddress(request,response);
        }
    }
    //删除地址
    private void deleteAddress(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("id");
        indexService = new IndexServiceImpl();
        boolean b = indexService.deleteAddress(id);
        writeReturn(response,b);
    }
    //搜索框搜索后的表格
    private void tableSearch(HttpServletRequest request, HttpServletResponse response) {
        String val = request.getParameter("val");
        indexService = new IndexServiceImpl();
        list = indexService.tableSearch(val);
        map = extracted(list, new HashMap<Object, Object>());
        writeReturn(response,map);
    }
    //搜索框
    private void search(HttpServletRequest request, HttpServletResponse response) {
        String val = request.getParameter("value");
        indexService = new IndexServiceImpl();
        list = indexService.search(val);
        writeReturn(response,list);
    }
    //购买成功后更新信息
    private void updateMessage(HttpServletRequest request, HttpServletResponse response) {
        String vegName = request.getParameter("vegName");
        String vegId = request.getParameter("vegId");
        String vegMany = request.getParameter("vegMany");
        String vegPrice = request.getParameter("vegPrice");
        String payTime = request.getParameter("payTime");
        String addressId = request.getParameter("addressId");
        Users user = (Users) request.getSession().getAttribute(Constants.CONSTANTSSESSION);
        indexService = new IndexServiceImpl();
        list = indexService.updateMessage(vegName,Integer.parseInt(vegId),
                Integer.parseInt(vegMany),Double.parseDouble(vegPrice),
                payTime,Integer.parseInt(addressId),user.getUsersId());
        writeReturn(response,list);
    }
    //查询地址数量
    private void selectAddressCount(HttpServletRequest request, HttpServletResponse response) {
        indexService = new IndexServiceImpl();
        Users user = (Users) request.getSession().getAttribute(Constants.CONSTANTSSESSION);
        int count = indexService.selectAddressCount(user.getUsersId());
        list = new ArrayList<>();
        list.add(count);
        writeReturn(response,list);
    }
    //更新地址表格信息
    private void updateAddressTable(HttpServletRequest request, HttpServletResponse response, String addressName) {
        String value = request.getParameter("value");
        String id = request.getParameter("id");
        indexService = new IndexServiceImpl();
        boolean b = indexService.updateAddressTable(addressName, value, Integer.parseInt(id));
        map = new HashMap<>(1);
        if(b){
            map.put("message","true");
        }else{
            map.put("message","false");
        }
       writeReturn(response,map);
    }
    //地址记录
    private void addressRecord(HttpServletRequest request, HttpServletResponse response) {
        indexService = new IndexServiceImpl();
        Users user = (Users) request.getSession().getAttribute(Constants.CONSTANTSSESSION);
        list = indexService.addressRecord(user.getUsersId());
        map = extracted(list,new HashMap<>());
        writeReturn(response,map);
    }
    //订单记录
    private void orderFormRecord(HttpServletRequest request, HttpServletResponse response) {
        indexService = new IndexServiceImpl();
        Users user = (Users) request.getSession().getAttribute(Constants.CONSTANTSSESSION);
        list = indexService.orderFormRecord(user.getUsersId());
        map = extracted(list,new HashMap<>());
        writeReturn(response,map);
    }
    //添加地址
    private void setAddress(HttpServletRequest request, HttpServletResponse response) {
        String userName = request.getParameter("userName");
        String userPhone = request.getParameter("userPhone");
        String userAddress = request.getParameter("userAddress");
        Users user = (Users) request.getSession().getAttribute(Constants.CONSTANTSSESSION);
        indexService = new IndexServiceImpl();
        list = indexService.setAddress(userName,userPhone,userAddress,user.getUsersId());
        writeReturn(response,list);
    }
    //充值记录
    private void topupRecord(HttpServletRequest request, HttpServletResponse response) {
        Users attribute = (Users) request.getSession().getAttribute(Constants.CONSTANTSSESSION);
        indexService = new IndexServiceImpl();
        list = indexService.topUpRecord(attribute.getUsersId());
        map = extracted(list,new HashMap<>());
        writeReturn(response,map);
    }
    //退出
    private void exit(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();
        session.removeAttribute(Constants.CONSTANTSSESSION);
        session.invalidate();
        list = new ArrayList<>();
        list.add("true");
        writeReturn(response,list);
    }
    /**
     * 充值成功后我要更新余额，所以获取现在用户的信息；并把yue回显
     * @param request
     * @param response
     */
    private void topUp(HttpServletRequest request, HttpServletResponse response) {
        indexService = new IndexServiceImpl();
        String money = request.getParameter("money");
        String dateTime = request.getParameter("dateTime");
        String userId = request.getParameter("userId");
        boolean f = indexService.topUp(Double.parseDouble(money),dateTime,Integer.parseInt(userId));
        //获取用户
        Users user = (Users) request.getSession().getAttribute(Constants.CONSTANTSSESSION);
        Object[] params = {user.getAccount(),user.getPassWord()};
        LoginDao loginDao = new LoginDaoImpl();
        list = loginDao.getUser(1, new ArrayList<Object>(), new BaseDao().getConnection(), params);
        Users users = (Users) list.get(0);
        request.getSession().setAttribute(Constants.CONSTANTSSESSION,users);
        Users attribute = (Users) request.getSession().getAttribute(Constants.CONSTANTSSESSION);

        list = new ArrayList<>(1);
        if(!f){
            list.add("null");
        }else{
            list.add(users.getUsersMoney());
        }
        writeReturn(response,list);
    }
    //轮播图回显数据
    private void orderForm(HttpServletRequest request, HttpServletResponse response, String name) {
        indexService = new IndexServiceImpl();
        list = indexService.orderFormShow(name);
        writeReturn(response,list);
    }
    //提取渲染表格数据的方法
    private void urlPrice(HttpServletRequest request, HttpServletResponse response,Users users) {
        String limit = request.getParameter("limit");
        indexService = new IndexServiceImpl();
        list = indexService.indexUrlPrice(Integer.parseInt(limit));
        if(users!=null){
            list.add(users);
        }if(users==null){
            list.add("null");
        }
        writeReturn(response,list);
    }
    //封装响应数据的方法
    public void writeReturn(HttpServletResponse response,Object list){
        response.setContentType("application/json");
        try {
            PrintWriter writer = response.getWriter();
            writer.write(JSON.toJSONString(list));
            writer.flush();
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    //封装返回表格数据格式
    private Map<Object,Object> extracted(List<Object> list,Map<Object,Object> map) {
        map.put("code",0);
        map.put("msg","");
        map.put("count",Integer.parseInt(list.get(list.size()-1).toString()));
        //删除最后一个位置的元素，因为不是表格数据
        list.remove(list.size()-1);
        map.put("data",list);
        return map;
    }
}
