package com.kitten.Service.schoolMessage;
import com.kitten.Popj.College;
import com.kitten.Popj.Major;
import com.kitten.Popj.School;
/**
 * @author ASUS
 */
public interface ServiceSchoolMessage {
    //获取学校
    public School getSchool();
    //获取学院
    public College[] getCollege();
    //获取专业
    public Major[] getMajor(int i);
}
