package com.kitten.Dao.Register;
import java.sql.Connection;
/**
 * @author ASUS
 */
public interface SetRegister {
    //注册
    public int setRegisterDao(Connection connection, String name, int age, String sex, int username, String password,String email,String phone,int major);
    /**
     * 查找
     */
    public int selectUsersDao(Connection connection,String username);
}
