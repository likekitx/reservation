package com.kitten.Dao.Index;
import com.kitten.Dao.BaseDao;
import com.kitten.Popj.Address;
import com.kitten.Popj.TopUp;
import com.kitten.Popj.Vegetables;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;
/**
 * @author ASUS
 */
public class IndexDaoImpl implements IndexDao{
    List<Object> list = null;
    Map<String,Object> map = null;
    PreparedStatement preparedStatement = null;
    ResultSet resultSet,resultSet1,resultSet2 = null;
    Vegetables vegetables = null;
    int excute1,excute2;
    boolean flag = false;
    TopUp topUp = null;
    BaseDao baseDao = null;
    //猜你喜欢4张图
    @Override
    public List<Object> indexUrlPrice(Connection connection,int limit) {
        list = new ArrayList<>(4);
        baseDao = new BaseDao();
        if(connection!=null){
            String sql = "select * from vegetables limit ?,4";
            Object[] ob = {limit};
            resultSet = baseDao.excute(connection, preparedStatement, ob, sql, resultSet);
            try {
                while (resultSet.next()){
                    vegetables = new Vegetables();
                    vegetables.setId(resultSet.getInt("id"));
                    vegetables.setMoney(resultSet.getDouble("price"));
                    vegetables.setUrl(resultSet.getString("url"));
                    vegetables.setName(resultSet.getString("name"));
                    vegetables.setMany(resultSet.getInt("many"));
                    list.add(vegetables);
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }finally {
                baseDao.closeResource(connection,preparedStatement,resultSet);
            }
        }
        return list;
    }
//    轮播图的菜品信息
    @Override
    public List<Object> orderFormShow(Connection connection, String name) {
        list = new ArrayList<>(1);
        baseDao = new BaseDao();
        if(connection!=null){
            String sql = "select * from vegetables where name = ?";
            Object[] params = {name};
            resultSet = baseDao.excute(connection, preparedStatement, params, sql, this.resultSet);
            try {
                while (resultSet.next()){
                    map = new HashMap<>(4);
                    map.put("id",resultSet.getInt("id"));
                    map.put("price",resultSet.getString("price"));
                    map.put("count",resultSet.getString("many"));
                    map.put("url",resultSet.getString("url"));
                    list.add(map);
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }finally {
                baseDao.closeResource(connection,preparedStatement,resultSet);
            }
        }
        return list;
    }
    //充值
    @Override
    public boolean topUp(Connection connection, Double money, String dateTime,int id) {
        baseDao = new BaseDao();
        if(connection!=null){
            String sql = "update users set users_money = users_money + ? where users_id = ?";
            String sql2 = "insert into topup(topup_money,topup_time,users_id) values(?,?,?)";
            Object[] params1 = {money,id};
            Object[] params2 = {money,dateTime,id};
            excute1 = baseDao.excute(connection, preparedStatement, params1, sql);
            excute2 = baseDao.excute(connection,preparedStatement,params2,sql2);
            flag = excute1 > 0 && excute2 > 0;
            baseDao.closeResource(connection,preparedStatement,null);
        }
        return flag;
    }
    //充值记录
    @Override
    public List<Object> topUpRecord(Connection connection, int id) {
        baseDao = new BaseDao();
        if(connection!=null){
            String sql4 = "select count(*) res from topup";
            resultSet = baseDao.excute(connection,preparedStatement,null,sql4,resultSet);
            try {
                while (resultSet.next()){
                    excute1 = resultSet.getInt("res");
                }
                list = new ArrayList<>();
                Object[] params3 = {id};
                String sql3 = "select * from topup where users_id = ?";
                resultSet = baseDao.excute(connection, preparedStatement, params3, sql3, resultSet);
                while (resultSet.next()){
                    topUp = new TopUp();
                    topUp.setTopUpId(resultSet.getInt("topup_id"));
                    topUp.setTopUpMoney(resultSet.getDouble("topup_money"));
                    topUp.setTopUpTime(resultSet.getString("topup_time"));
                    list.add(topUp);
                }
                list.add(excute1);
            } catch (SQLException e) {
                e.printStackTrace();
            }finally {
                baseDao.closeResource(connection,preparedStatement,null);
            }
        }
        return list;
    }
    //设置地址
    @Override
    public List<Object> setAddress(Connection connection,String userName,String userPhone,String userAddress,int userId) {
        list = new ArrayList<>();
        int excute = 0;
        baseDao = new BaseDao();
        if(connection!=null){
            //插address表
            Object[] selectAddressIdParams = {userAddress,userName,userPhone,userId};
            String sqlAddress = "insert into address (address_user,address_name,address_phone,users_id) values(?,?,?,?)";
            excute = baseDao.excute(connection, preparedStatement, selectAddressIdParams, sqlAddress);
            if(excute>0){
                list.add("true");
            }else{
                list.add("false");
            }
        }
        return list;
    }
    //订单管理
    @Override
    public List<Object> orderFormRecord(Connection connection,int id) {
        baseDao = new BaseDao();
        if(connection!=null){
            String sql = "select count(*) res from orderform";
            resultSet = baseDao.excute(connection,preparedStatement,null,sql,resultSet);
            try {
                while (resultSet.next()){
                    excute1 = resultSet.getInt("res");
                }
                list = new ArrayList<>();
                Object[] params3 = {id};
                String sql3 = "select ad.address_user adduser,ad.address_name addname,ad.address_phone addphone,veg.name vegname,veg.many vegmany,veg.price vegprice,o.orderform_id oid,o.pay_time opaytime,o.pay_money opaymoney,o.address_id addid from orderform o left join users u on u.users_id = o.users_id left join address ad on ad.address_id = o.address_id left join orderform_vegetable veg on o.orderform_id = veg.orderform_id where u.users_id = ?";
                resultSet = baseDao.excute(connection, preparedStatement, params3, sql3, resultSet);
                while (resultSet.next()){
                    map = new HashMap<>(9);
                    map.put("oId",resultSet.getInt("oid"));
                    map.put("vegName",resultSet.getString("vegname"));
                    map.put("vegMany",resultSet.getInt("vegmany"));
                    map.put("vegPrice",resultSet.getDouble("vegprice"));
                    map.put("user",resultSet.getString("adduser"));
                    map.put("phone",resultSet.getString("addphone"));
                    map.put("address",resultSet.getString("addname"));
                    map.put("payMoney",resultSet.getDouble("opaymoney"));
                    map.put("payTime",resultSet.getString("opaytime"));
                    list.add(map);
                }
                list.add(excute1);
            } catch (SQLException e) {
                e.printStackTrace();
            }finally {
                baseDao.closeResource(connection,preparedStatement,null);
            }
        }
        return list;
    }
//    地址管理
    @Override
    public List<Object> addressRecord(Connection connection, int id) {
        Address address = null;
        baseDao = new BaseDao();
        if(connection!=null){
            String sql1 = "select count(*) res from address where users_id = ?";
            Object[] params = {id};
            resultSet = baseDao.excute(connection,preparedStatement,params,sql1,resultSet);
            try {
                while (resultSet.next()){
                    excute2 = resultSet.getInt("res");
                }
                //查数据
                String sql2 = "select * from address where users_id = ?";
                resultSet = baseDao.excute(connection,preparedStatement,params,sql2,resultSet);
                list = new ArrayList<>();
                while (resultSet.next()){
                    address = new Address();
                    address.setAddressId(resultSet.getInt("address_id"));
                    address.setAddressName(resultSet.getString("address_name"));
                    address.setAddressUser(resultSet.getString("address_user"));
                    address.setAddressPhone(resultSet.getString("address_phone"));
                    list.add(address);
                }
                list.add(excute2);
            } catch (SQLException e) {
                e.printStackTrace();
            }finally {
                baseDao.closeResource(connection,preparedStatement,resultSet);
            }
        }
        return list;
    }
    //修改地址表格
    @Override
    public boolean updateAddressTable(Connection connection, String addressName, String value, int id) {
        baseDao = new BaseDao();
        if(connection!=null){
            if("addressName".equals(addressName)){
                String sql = "update address set address_name = ? where address_id = ?";
                Object[] params = {value,id};
                excute2 = baseDao.excute(connection,preparedStatement,params,sql);
            }else if("addressUser".equals(addressName)){
                String sql = "update address set address_user = ? where address_id = ?";
                Object[] params = {value,id};
                excute2 = baseDao.excute(connection,preparedStatement,params,sql);
            }else if("addressPhone".equals(addressName)){
                String sql = "update address set address_phone = ? where address_id = ?";
                Object[] params = {value,id};
                excute2 = baseDao.excute(connection,preparedStatement,params,sql);
            }
            if (excute2>0) {
                flag = true;
            }
            baseDao.closeResource(connection,preparedStatement,null);
        }
        return flag;
    }
//    查询有没有地址
    @Override
    public int selectAddressCount(Connection connection, int usersId) {
        int addressCount = 0;
        baseDao = new BaseDao();
        if(connection!=null){
            //在插之前 先看有没有这个人的地址记录
            Object[] selectAddressIdParams = {usersId};
            String selectAddressCount = "select count(*) res from address where users_id = ?";
            resultSet2 = baseDao.excute(connection, preparedStatement,selectAddressIdParams,selectAddressCount,resultSet2);
            try {
                while (resultSet2.next()){
                    addressCount = resultSet2.getInt("res");
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }finally {
                baseDao.closeResource(connection,preparedStatement,resultSet2);
            }
        }
        return addressCount;
    }
    //更新个人信息
    @Override
    public List<Object> updateMessage(Connection connection, String vegName, int vegId, int vegMany, double vegPrice, String payTime, int addressId,int userId) {
        list = new ArrayList<>();
        int res1 = 0,res2 = 0;
        //判断更改数据库是否成功
        double excute = 0;
        int excute1 = 0;
        int excute2 = 0;
        int excute3 = 0;
        int excute4 = 0;
        int excute5 = 0;
        baseDao = new BaseDao();
        if(connection!=null){
            //开启事务
            try {
                connection.setAutoCommit(false);
            } catch (SQLException e) {
                e.printStackTrace();
            }
                //先看看这个人钱够不够
                String selectUserMoney = "select users_money from users where users_id = ?";
                Object[] usersIdParams = {userId};
                resultSet1 = baseDao.excute(connection,preparedStatement,usersIdParams,selectUserMoney,resultSet1);
                double usersMoney = 0;
                try {
                    while (resultSet1.next()){
                        usersMoney = resultSet1.getDouble("users_money");
                    }
                } catch (SQLException e) {
                    e.printStackTrace();
                }
                if(usersMoney>vegPrice){
                    //先扣钱
                    String pay = "update users set users_money = users_money - ? where users_id = ?";
                    Object[] payParams = {vegPrice,userId};
                    excute4 = baseDao.excute(connection,preparedStatement,payParams,pay);
                    //老板加钱
                    String bossMoney = "update boss set money = money + ?,income = income + ?";
                    Object[] bossMoneyParams = {vegPrice,vegPrice};
                    excute5 = baseDao.excute(connection, preparedStatement, bossMoneyParams, bossMoney);
                    //在插订单表
                    String sqlOrderForm = "insert into orderform (pay_time,pay_money,users_id,address_id) values(?,?,?,?)";
                    Object[] orderFormParams = {payTime,vegPrice,userId,addressId};
                    excute2 = baseDao.excute(connection, preparedStatement, orderFormParams, sqlOrderForm);
                    //获取订单表的编号
                    String sqlOrderFormId = "select orderform_id from orderform where pay_time = ? and pay_money = ? and users_id = ? and address_id = ?";
                    resultSet = baseDao.excute(connection,preparedStatement,orderFormParams,sqlOrderFormId,resultSet);
                    try {
                        while (resultSet.next()){
                            //订单编号
                            res2 = resultSet.getInt("orderform_id");
                        }
                    } catch (SQLException e) {
                        e.printStackTrace();
                    }
                    //插入订单蔬菜表
                    String sqlOrederFormVeg = "insert into orderform_vegetable (name,many,price,orderform_id) values(?,?,?,?)";
                    Object[] vegParams = {vegName,vegMany,vegPrice,res2};
                    excute3 = baseDao.excute(connection,preparedStatement,vegParams,sqlOrederFormVeg);
                    //菜品的数量-1
                    String vegCount = "update vegetables set many = many - ? where id = ?";
                    Object[] vegCountParams = {vegMany,vegId};
                    baseDao.excute(connection,preparedStatement,vegCountParams,vegCount);
                    //查看用户余额
                    String userMoney = "select users_money from users where users_id = ?";
                    resultSet = baseDao.excute(connection, preparedStatement, usersIdParams, userMoney, this.resultSet);
                    try {
                        while (resultSet.next()){
                            excute = resultSet.getDouble("users_money");
                        }
                    } catch (SQLException e) {
                        e.printStackTrace();
                    }
                    list.add(excute);
                }else {
                    list.add("notMoney");
                }
            //提交
            try {
                connection.commit();
                //自动提交改回来
                connection.setAutoCommit(true);
            } catch (SQLException e) {
                e.printStackTrace();
            }finally {
                baseDao.closeResource(connection,preparedStatement,resultSet);
                baseDao.closeResource(connection,preparedStatement,resultSet1);
            }
        }
        return list;
    }
    //搜索
    @Override
    public List<Object> search(Connection connection, String val) {
        list = new ArrayList<>(14);
        if(connection!=null){
            baseDao = new BaseDao();
            String sql= "select * from vegetables where name like concat('%',?,'%') limit 14";
            try {
                Object[] params = {val};
                resultSet=  baseDao.excute(connection,preparedStatement,params,sql,resultSet);
                while (resultSet.next()){
                    vegetables = new Vegetables();
                    vegetables.setId(resultSet.getInt("id"));
                    vegetables.setName(resultSet.getString("name"));
                    vegetables.setMany(resultSet.getInt("many"));
                    vegetables.setMoney(resultSet.getDouble("price"));
                    vegetables.setUrl(resultSet.getString("url"));
                    list.add(vegetables);
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }finally {
                baseDao.closeResource(connection,preparedStatement,resultSet);
            }
        }
        return list;
    }
    //删除地址
    @Override
    public boolean deleteAddress(Connection connection, String id) {
        baseDao = new BaseDao();
        if(connection!=null){
            String sql = "delete from address where address_id = ?";
            Object[] params = {id};
            int excute = baseDao.excute(connection, preparedStatement, params, sql);
            if(excute>0){
                flag = true;
            }else {
                flag = false;
            }
            baseDao.closeResource(connection,preparedStatement,null);
        }
        return flag;
    }
    //搜索出现的表格
    @Override
    public List<Object> tableSearch(Connection connection, String val) {
        list = new ArrayList<>();
        if(connection!=null){
            baseDao = new BaseDao();
            //先查有几条数据
            try {
                Object[] params = {val};
                String sqlCount = "select count(*) res from vegetables where name like concat('%',?,'%')";
                resultSet = baseDao.excute(connection,preparedStatement,params,sqlCount,resultSet);
                while (resultSet.next()){
                    excute1 = resultSet.getInt("res");
                }
                String sql= "select * from vegetables where name like concat('%',?,'%')";
                resultSet=  baseDao.excute(connection,preparedStatement,params,sql,resultSet);
                while (resultSet.next()){
                    vegetables = new Vegetables();
                    vegetables.setId(resultSet.getInt("id"));
                    vegetables.setName(resultSet.getString("name"));
                    vegetables.setMany(resultSet.getInt("many"));
                    vegetables.setMoney(resultSet.getDouble("price"));
                    vegetables.setUrl(resultSet.getString("url"));
                    list.add(vegetables);
                }
                list.add(excute1);
            } catch (SQLException e) {
                e.printStackTrace();
            }finally {
                baseDao.closeResource(connection,preparedStatement,resultSet);
            }
        }
        return list;
    }
}
