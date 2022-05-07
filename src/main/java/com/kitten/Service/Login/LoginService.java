package com.kitten.Service.Login;
import java.util.List;
/**
 * @author ASUS
 */
public interface LoginService {
    //用户登陆
    public List<Object> loginService(String account, String password);
    //忘记密码
    public boolean forgetPassword(String password,int account);
    //修改密码
    public boolean selectForget(String name,String phone,int account);
}
