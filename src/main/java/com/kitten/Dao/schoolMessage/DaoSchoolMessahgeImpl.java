package com.kitten.Dao.schoolMessage;
import com.kitten.Dao.BaseDao;
import com.kitten.Popj.College;
import com.kitten.Popj.Major;
import com.kitten.Popj.School;
import java.sql.*;
/**
 * @author ASUS
 */
public class DaoSchoolMessahgeImpl implements DaoSchoolMessage {
    BaseDao baseDao = null;
    @Override
    public School getSchool(Connection connection) {
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        School school = null;
        baseDao =  new BaseDao();
        if(connection!=null){
            //编写sql
            String sql = "select * from school";
            Object[] params = null;
            //执行sql
            resultSet = baseDao.excute(connection, preparedStatement, params, sql, resultSet);
            try {
                school = new School();
                while(resultSet.next()){
                    school.setSchoolId(resultSet.getInt("school_id"));
                    school.setSchoolName(resultSet.getString("school_name"));
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }finally {
                baseDao.closeResource(connection,preparedStatement,resultSet);
            }
        }
        return school;
    }
    @Override
    public College[] getCollege(Connection connection) {
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        College[] isCollege = null;
        College college = null;
        baseDao =  new BaseDao();
        if(connection!=null){
            //编写sql
            String sql = "select * from college";
            //执行sql
            resultSet = baseDao.excute(connection, preparedStatement, null, sql, resultSet);
            isCollege = new College[9];
            try {
                int i = 0;
                while(resultSet.next()){
                    college = new College();
                    college.setCollegeId(resultSet.getInt("college_id"));
                    college.setCollegeName(resultSet.getString("college_name"));
                    college.setSchoolId(resultSet.getInt("school_id"));
                    isCollege[i++] = college;
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }finally {
                baseDao.closeResource(connection,preparedStatement,resultSet);
            }
        }
        return isCollege;
    }
    @Override
    public Major[] getmajor(Connection connection,int i) {
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        Major major = null;
        Major[] isMajor = null;
        baseDao =  new BaseDao();
        if(connection!=null){
            //编写sql
            String sql = "select * from major where college_id = ?";
            String sq = "select count(*) rec from major maj where college_id ="+i;
            //数据
            Object[] prams = {i};
            //查询行数，并初始化数组
            resultSet = baseDao.excute(connection,preparedStatement,null,sq,resultSet);
            int count = 0;
            try {
                //1、指针移动到最后一行，
//                resultSet.last();
//                isMajor = new Major[resultSet.getRow()];
//                System.out.println(resultSet.getRow());
//                //指针移动到第一个
//                resultSet.beforeFirst();
                if(resultSet.next()){
                    count = resultSet.getInt("rec");
                }
            }catch (SQLException e) {
                e.printStackTrace();
            }
            isMajor = new Major[count];
            try {
                //执行sql
                resultSet = baseDao.excute(connection, preparedStatement, prams, sql, resultSet);
                int j = 0;
                while(resultSet.next()){
                    major = new Major();
                    major.setMajorId(resultSet.getInt("major_id"));
                    major.setMajorName(resultSet.getString("major_name"));
                    major.setCollegeId(resultSet.getInt("college_id"));
                    isMajor[j++] = major;
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }finally {
                baseDao.closeResource(connection,preparedStatement,resultSet);
            }
        }
        return isMajor;
    }
}
