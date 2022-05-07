package com.kitten.Dao.Login;
import java.sql.Connection;
import java.util.List;
/**
 * @author ASUS
 */
public interface LoginDao {
    //登陆
    public List<Object> loginDao(Connection connection, String account, String password);
    //忘记密码
    public int selectDao(Connection connection,String name,String phone,int account);
    //修改密码
    public int updatePassword(Connection connection,String password,int account);
    /**
     * 封装方法，获取用户，在将在indexServlet中使用，所以进行封装
     */
    public List<Object> getUser(int excute,List<Object> list,Connection connection,Object[] params);
}
