package com.kitten.Dao.Boss;
import com.kitten.Dao.BaseDao;
import com.kitten.Popj.Boss;
import com.kitten.Popj.Vegetables;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
/**
 * @author ASUS
 */
public class BossDaoImpl implements BossDao{
    PreparedStatement preparedStatement = null;
    ResultSet resultSet,resultSet1 = null;
    Boss boss = null;
    Vegetables vegetables = null;
    int excute = 0;
    List<Object> li = null;
    BaseDao baseDao = null;
    //查询收入、用户、余额支出信息
    @Override
    public Boss selectMessageDao(Connection connection) {
        baseDao = new BaseDao();
        if(connection!=null){
            boss = new Boss();
            String sql = "select count(*) res from users";
            String sql2 = "select income,expend,money from boss";
            resultSet = baseDao.excute(connection, preparedStatement, null, sql, resultSet);
            resultSet1 = baseDao.excute(connection,preparedStatement,null,sql2,resultSet1);
            try {
               if(resultSet.next() && resultSet1.next()){
                   boss.setCount(resultSet.getInt("res"));
                   boss.setIncome(resultSet1.getDouble("income"));
                   boss.setExpend(resultSet1.getDouble("expend"));
                   boss.setMoney(resultSet1.getDouble("money"));
               }
            } catch (SQLException e) {
                e.printStackTrace();
            }finally {
                baseDao.closeResource(connection,preparedStatement,resultSet);
            }
        }
        return boss;
    }
    //插入菜品
    @Override
    public int insertBossDao(Connection connection, String name, int count, double price, String url) {
        baseDao = new BaseDao();
        if(connection!=null){
            String sqlSelect = "select count(*) res from vegetables where name = ? or url = ?";
            Object[] data = {name,url};

            String sql = "insert into vegetables (name,price,many,url) values (?,?,?,?)";
            Object[] params = {name,price,count,url};

            resultSet = baseDao.excute(connection, preparedStatement, data, sqlSelect, resultSet);
            try {
                while (resultSet.next()){
                    int res = resultSet.getInt("res");
                    if(res>0){
                        excute = 888;
                    }else {
                        excute = baseDao.excute(connection, preparedStatement, params, sql);
                    }
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
            //扣除老板yue
            String bossMoney = "update boss set money = money - ?,expend = expend + ?";
            Object[] bossMoneyParams = {price,price};
            baseDao.excute(connection,preparedStatement,bossMoneyParams,bossMoney);
            baseDao.closeResource(connection,preparedStatement,resultSet);
        }
        return excute;
    }
    //显示表格数据进行分页
    @Override
    public List<Object> updataBossDao(Connection connection,int page,int limit) {
        baseDao = new BaseDao();
        if(connection!=null){
            String count = "select count(*) res from vegetables";
            resultSet1 = baseDao.excute(connection,preparedStatement,null,count,resultSet1);
            try {
                while (resultSet1.next()){
                    excute = resultSet1.getInt("res");
                }
                li = new ArrayList<>(9);
                String sql = "select * from vegetables limit ?,?";
                Object[] lim = {((page-1)*limit),limit};
                resultSet = baseDao.excute(connection, preparedStatement, lim, sql, resultSet);
                while (resultSet.next()){
                    vegetables = new Vegetables();
                    vegetables.setId(resultSet.getInt("id"));
                    vegetables.setName(resultSet.getString("name"));
                    vegetables.setMoney(resultSet.getDouble("price"));
                    vegetables.setMany(resultSet.getInt("many"));
                    li.add(vegetables);
                }
                li.add(excute);
            } catch (SQLException e) {
                e.printStackTrace();
            }finally {
                baseDao.closeResource(connection,preparedStatement,resultSet);
            }
        }
        return li;
    }
    //修改表格
    @Override
    public int updateTable(Connection connection, String field, String value, int id) {
        baseDao = new BaseDao();
        if(connection!=null){
            if("name".equals(field)){
                Object[] params = {value,id};
                String sql = "update vegetables set name = ? where id = ?";
                excute = baseDao.excute(connection, preparedStatement, params, sql);
            }else if("many".equals(field)){
                String sql = "update vegetables set many = ? where id = ?";
                Object[] params = {Integer.parseInt(value),id};
                excute = baseDao.excute(connection, preparedStatement, params, sql);
            }else if("money".equals(field)){
                Object[] params = {Double.parseDouble(value),id};
                String sql = "update vegetables set money = ? where id = ?";
                excute = baseDao.excute(connection, preparedStatement, params, sql);
            }
            baseDao.closeResource(connection,preparedStatement,null);
        }
        return excute;
    }
    //删除菜品
    @Override
    public boolean deleteVeg(Connection connection, String id) {
        baseDao = new BaseDao();
        boolean flag = false;
        if(connection!=null){
            String sql = "delete from vegetables where id = ?";
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
}
