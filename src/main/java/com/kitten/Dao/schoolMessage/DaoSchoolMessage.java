package com.kitten.Dao.schoolMessage;
import com.kitten.Popj.College;
import com.kitten.Popj.Major;
import com.kitten.Popj.School;
import java.sql.Connection;
/**
 * @author ASUS
 */
public interface DaoSchoolMessage {
    //获取学校
    public School getSchool(Connection connection);
    //获取学院
    public College[] getCollege(Connection connection);
    //获取专业
    public Major[] getmajor(Connection connection,int i);
}
