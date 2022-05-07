package com.kitten.Service.schoolMessage;
import com.kitten.Dao.BaseDao;
import com.kitten.Dao.schoolMessage.DaoSchoolMessage;
import com.kitten.Dao.schoolMessage.DaoSchoolMessahgeImpl;
import com.kitten.Popj.College;
import com.kitten.Popj.Major;
import com.kitten.Popj.School;
import java.sql.Connection;
/**
 * @author ASUS
 */
public class ServiceSchoolMessageImpl implements ServiceSchoolMessage{
    DaoSchoolMessage daoSchoolMessage = null;
    BaseDao baseDao = null;
    public ServiceSchoolMessageImpl() {
        baseDao = new BaseDao();
        daoSchoolMessage = new DaoSchoolMessahgeImpl();
    }
    @Override
    //获取学校
    public School getSchool() {
        Connection connection = null;
        School school = null;
        //获取链接
        connection  = baseDao.getConnection();
        //调用Dao层获取school
        school = daoSchoolMessage.getSchool(connection);
        if(connection!=null){
            baseDao.closeResource(connection,null,null);
        }
        return school;
    }
    @Override
    //获取学院
    public College[] getCollege() {
        Connection connection = null;
        College[] college = null;
        //获取链接
        connection  = baseDao.getConnection();
        //调用Dao层获取school
        college = daoSchoolMessage.getCollege(connection);
        if(connection!=null){
            baseDao.closeResource(connection,null,null);
        }
        return college;
    }
    @Override
    //获取专业
    public Major[] getMajor(int i) {
        Connection connection = null;
        Major[] major = null;
        //获取链接
        connection  = baseDao.getConnection();
        //调用Dao层获取school
        major = daoSchoolMessage.getmajor(connection,i);
        if(connection!=null){
            baseDao.closeResource(connection,null,null);
        }
        return major;
    }
}
