package com.kitten.Service.Register;
import com.kitten.Dao.BaseDao;
import com.kitten.Dao.Register.SetRegister;
import com.kitten.Dao.Register.SetRegisterImpl;
import java.sql.Connection;
/**
 * @author ASUS
 */
public class RegisterServiceImpl implements RegisterService{
    SetRegister setRegister = null;
    BaseDao baseDao = null;
    public RegisterServiceImpl(){
        baseDao = new BaseDao();
        setRegister =  new SetRegisterImpl();
    }
    @Override
    public boolean setRegisterService(String name, int age, String sex, int username, String password,String email,String phone,int major) {
        Connection connection;
        int excute;
        boolean flag = false;
        //获取连接
        connection = baseDao.getConnection();
        excute = setRegister.setRegisterDao(connection, name, age, sex, username, password, email, phone, major);
        if(excute>0){
            flag = true;
        }
        if(connection!=null){
            baseDao.closeResource(connection,null,null);
        }
        return flag;
    }
    @Override
    public boolean selectUserService(String username) {
        Connection connection = null;
        int excute = 0;
        boolean flag = false;
        connection = baseDao.getConnection();
        excute = setRegister.selectUsersDao(connection,username);
        if(excute>=1){
            flag = true;
        }
        if(connection!=null){
            baseDao.closeResource(connection,null,null);
        }
        return flag;
    }
}
