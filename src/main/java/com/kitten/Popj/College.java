package com.kitten.Popj;
/**
 * @author ASUS
 * 学院表
 */
public class College {
    /**
     * 学院编号
     */
    private int collegeId;
    /**
     * 学院名称
     */
    private String collegeName;
    /**
     * 外键字段，引用school表的id；
     */
    private int schoolId;
    public int getCollegeId() {
        return collegeId;
    }
    public void setCollegeId(int collegeId) {
        this.collegeId = collegeId;
    }
    public String getCollegeName() {
        return collegeName;
    }
    public void setCollegeName(String collegeName) {
        this.collegeName = collegeName;
    }
    public int getSchoolId() {
        return schoolId;
    }
    public void setSchoolId(int schoolId) {
        this.schoolId = schoolId;
    }
}
