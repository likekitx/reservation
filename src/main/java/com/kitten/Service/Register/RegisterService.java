package com.kitten.Service.Register;
/**
 * @author ASUS
 */
public interface RegisterService {
    /**
     * 向数据库中插入用户信息
     */
    public boolean setRegisterService(String name, int age, String sex, int username, String password, String email, String phone, int major);
    /**
     * 查找数据库中是否有该用户
     */
    public boolean selectUserService(String username);
}
