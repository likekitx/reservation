package com.kitten.Dao.Register;
import com.kitten.Dao.BaseDao;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
/**
 * @author ASUS
 */
public class SetRegisterImpl implements SetRegister{
    PreparedStatement preparedStatement = null;
    BaseDao baseDao = null;
    @Override
    public int setRegisterDao(Connection connection, String name, int age, String sex, int username, String password,String email,String phone,int major) {
        Object[] params = {name,age,sex,username,password,email,phone,0,major};
        int execte = 0;
        baseDao = new BaseDao();
        if(connection!=null){
            String sql = "insert into users(users_name,users_age,users_sex,users_account,users_password,users_email,users_phone,users_money,major_id) values(?,?,?,?,?,?,?,?,?)";
            execte = baseDao.excute(connection,preparedStatement,params,sql);
            baseDao.closeResource(connection,preparedStatement,null);
        }
        return execte;
    }
    //查询是否有该用户
    @Override
    public int selectUsersDao(Connection connection,String username) {
        int account = Integer.parseInt(username);
        ResultSet resultSet = null;
        int excute = 0;
        baseDao = new BaseDao();
        if(connection!=null){
            String sql = "select count(*) rec from users us where users_account = "+account;
            //查询记录
            resultSet = baseDao.excute(connection, preparedStatement, null, sql, resultSet);
            try {
                if (resultSet.next()){
                    excute = resultSet.getInt("rec");
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }finally {
                baseDao.closeResource(connection,preparedStatement,resultSet);
            }
        }
        return excute;
    }
}
