package com.kitten.Dao.Login;
import com.kitten.Dao.BaseDao;
import com.kitten.Popj.Users;
import com.kitten.Util.BossFinal.BossFinal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
public class LoginDaoImpl implements LoginDao{
    PreparedStatement preparedStatement = null;
    ResultSet resultSet = null;
    int excute = 0;
    Users users = null;
    List<Object> list = null;
    BaseDao baseDao = null;
    //登陆
    @Override
    public List<Object> loginDao(Connection connection, String account, String password) {
        baseDao = new BaseDao();
        BossFinal bossFinal = new BossFinal();
        if(connection!=null){
            list = new ArrayList<>();
            if(account.equals(BossFinal.account) && password.equals(BossFinal.password)){
                list.add("boss");
            }else{
                Object[] params = {Integer.parseInt(account),password};
                String sql = "select count(*) res from users us where users_account = ? and users_password = ?";
                resultSet = baseDao.excute(connection, preparedStatement, params, sql, resultSet);
                try {
                    while (resultSet.next()){
                        excute = resultSet.getInt("res");
                    }
                    list = getUser(excute, list, connection, params);
                } catch (SQLException e) {
                    e.printStackTrace();
                }finally {
                    baseDao.closeResource(connection,preparedStatement,resultSet);
                }
            }
        }
        return list;
    }
    //封装方法获取用户
    @Override
    public List<Object> getUser(int excute, List<Object> list, Connection connection, Object[] params){
        baseDao = new BaseDao();
        if(connection!=null) {
            try {
                if (excute > 0) {
                    users = new Users();
                    String sqlselect = "select * from users where users_account = ? and users_password = ?";
                    resultSet = baseDao.excute(connection, preparedStatement, params, sqlselect, resultSet);
                    while (resultSet.next()) {
                        users.setUsersId(resultSet.getInt("users_id"));
                        users.setAccount(resultSet.getInt("users_account"));
                        users.setPassWord(resultSet.getString("users_password"));
                        users.setUsersEmail(resultSet.getString("users_email"));
                        users.setUsersAge(resultSet.getInt("users_age"));
                        users.setUsersSex(resultSet.getString("users_sex"));
                        users.setUsersName(resultSet.getString("users_name"));
                        users.setUsersPhone(resultSet.getString("users_phone"));
                        users.setUsersMoney(resultSet.getDouble("users_money"));
                        users.setMajorId(resultSet.getInt("major_id"));
                    }
                    list.add(users);
                }
            } catch (SQLException e) {
                e.printStackTrace();
            } finally {
                baseDao.closeResource(connection, preparedStatement, resultSet);
            }
        }
        return list;
    }
    //忘记密码，验证个人信息，验证通过后给予修改密码的权限
    @Override
    public int selectDao(Connection connection, String name, String phone, int account) {
        Object[] params = {name,phone,account};
        baseDao = new BaseDao();
        if(connection!=null){
            String sql = "select count(*) res from users us where users_name = ? and users_phone = ? and users_account = ?";
            resultSet = baseDao.excute(connection,preparedStatement,params,sql,resultSet);
            try {
                if (resultSet.next()){
                    excute = resultSet.getInt("res");
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }finally {
                baseDao.closeResource(connection,preparedStatement,resultSet);
            }
        }
        return excute;
    }

    /**
     * 修改密码
     */
    @Override
    public int updatePassword(Connection connection, String password,int account) {
        Object[] oldParams = {account};
        Object[] params = {password,account};
        String oldPassword = null;
        baseDao = new BaseDao();
        if(connection!=null){
            String oldSql = "select users_password from users where users_account = ?";
            resultSet = baseDao.excute(connection,preparedStatement,oldParams,oldSql,resultSet);
            try {
                if(resultSet.next()){
                    oldPassword = resultSet.getString("users_password");
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
            if(password.equals(oldPassword)){
                excute = 0;
            }else{
                String sql = "update users set users_password = ? where users_account = ?";
                excute = baseDao.excute(connection,preparedStatement,params,sql);
                baseDao.closeResource(connection,preparedStatement,null);
            }
        }
        return excute;
    }
}
