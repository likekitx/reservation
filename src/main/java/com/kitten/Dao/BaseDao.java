package com.kitten.Dao;
import org.junit.Test;

import java.sql.*;
import java.util.ResourceBundle;
/**
 * @author ASUS
 * 操作数据库
 */
public class BaseDao {
    private static String driver;
    private static String url;
    private static String user;
    private static String password;
    //静态代码块，类加载的时候就会初始化
    static {
//        ResourceBundle resourceBundle = ResourceBundle.getBundle("db");
//        driver = resourceBundle.getString("driver");
//        url = resourceBundle.getString("url");
//        user = resourceBundle.getString("user");
//        password = resourceBundle.getString("password");
        driver = "com.mysql.cj.jdbc.Driver";
        url = "jdbc:mysql://localhost:3306/reservation?serverTimezone=UTC&useSSL=false&allowPublicKeyRetrieval=true&characterEncoding=utf8";
        user = "root";
        password = "226326";
    }
    /**
     * 获取连接
     */
    public Connection getConnection(){
        System.out.println(url);
        Connection connection = null;
        try {
            //加载驱动
            Class.forName(driver);
            //获取连接
            connection = DriverManager.getConnection(url, user, password);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return connection;
    }
    /**
     *查询公共方法
     */
    public ResultSet excute(Connection connection, PreparedStatement preparedStatement,
                                   Object[] params,String sql,ResultSet resultSet){
        try {
            //预编译
            preparedStatement = connection.prepareStatement(sql);
            if(params!=null){
                for(int i = 0;i < params.length;i++){
                    //赋值
                    preparedStatement.setObject(i+1,params[i]);
                }
            }
            //返回结果
            resultSet = preparedStatement.executeQuery();

        }catch (SQLException e){
            e.printStackTrace();
        }
        return resultSet;
    }
    /**
     * 增删改公共方法
     */
    public int excute(Connection connection,PreparedStatement preparedStatement, Object[] params,String sql){
        int count = 0;
        try {
            //预编译
            preparedStatement = connection.prepareStatement(sql);
            if(params!=null){
                for (int i = 0; i < params.length; i++) {
                    //传值
                    preparedStatement.setObject(i+1,params[i]);
                }
            }
            count = preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return count;
    }
    /**
     * 公共的关闭连接的方法
     */
    public boolean closeResource(Connection connection,PreparedStatement preparedStatement,ResultSet resultSet){
        //默认为开启
        boolean flag = true;
        if(resultSet != null){
            try {
                resultSet.close();
                //GC回收
                resultSet = null;
            } catch (SQLException e) {
                e.printStackTrace();
                //如果没关闭成功，就为false
                flag = false;
            }
        }
        if(preparedStatement != null){
            try {
                preparedStatement.close();
                //Gc回收
                preparedStatement = null;
            } catch (SQLException e) {
                e.printStackTrace();
                //如果没关闭成功，就为false
                flag = false;
            }
        }
        if(connection != null){
            try {
                connection.close();
                //GC回收
                connection = null;
            } catch (SQLException e) {
                e.printStackTrace();
                //如果没关闭成功，就为false
                flag = false;
            }
        }
        return flag;
    }
}
