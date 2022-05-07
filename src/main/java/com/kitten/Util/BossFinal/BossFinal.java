package com.kitten.Util.BossFinal;

import com.kitten.Dao.BaseDao;

import java.awt.image.RescaleOp;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author ASUS
 */
public class BossFinal {
    public static String account,password;
    BaseDao baseDao = new BaseDao();
    public BossFinal() {
        Connection connection = baseDao.getConnection();
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        String boss = "select account,password from boss";
        resultSet = baseDao.excute(connection, preparedStatement, null, boss, resultSet);
        try {
            if(resultSet.next()){
                account = resultSet.getString("account");
                password = resultSet.getString("password");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            baseDao.closeResource(connection,preparedStatement,resultSet);
        }
    }
}
