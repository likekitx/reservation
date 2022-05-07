package com.kitten.Service.Login;
import com.kitten.Dao.BaseDao;
import com.kitten.Dao.Login.LoginDao;
import com.kitten.Dao.Login.LoginDaoImpl;
import java.sql.Connection;
import java.util.List;
public class LoginServiceImpl implements LoginService{
    LoginDao loginDao = null;
    Connection connection = null;
    List<Object> list = null;
    int excute = 0;
    boolean flag = false;
    BaseDao baseDao = null;
    //构造方法
    public LoginServiceImpl() {
        baseDao = new BaseDao();
        loginDao = new LoginDaoImpl();
        connection = baseDao.getConnection();
    }
    //登陆方法
    @Override
    public List<Object> loginService(String account, String password) {
        list = loginDao.loginDao(connection, account, password);
        if(connection != null){
            baseDao.closeResource(connection,null,null);
        }
        return list;
    }
    //修改密码
    @Override
    public boolean selectForget(String name, String phone, int account) {
        excute = loginDao.selectDao(connection,name,phone,account);
        if(excute>0){
            //查到了
            flag = true;
        }
        if(connection != null){
            baseDao.closeResource(connection,null,null);
        }
        return flag;
    }
    //忘记密码
    @Override
    public boolean forgetPassword(String password,int account) {
        excute = loginDao.updatePassword(connection,password,account);
        if(excute>0){
            flag = true;
        }
        if(connection!=null){
            baseDao.closeResource(connection,null,null);
        }
        return flag;
    }
}
