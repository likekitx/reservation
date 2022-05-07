package com.kitten.Popj;
/**
 * @author ASUS
 * 专业表
 */
public class Major {
    /**
     * 专业编号
     */
    private int majorId;
    /**
     * 专业名称
     */
    private String majorName;
    /**
     * 引用college表的id字段
     */
    private int collegeId;
    public int getMajorId() {
        return majorId;
    }
    public void setMajorId(int majorId) {
        this.majorId = majorId;
    }
    public String getMajorName() {
        return majorName;
    }
    public void setMajorName(String majorName) {
        this.majorName = majorName;
    }
    public int getCollegeId() {
        return collegeId;
    }
    public void setCollegeId(int collegeId) {
        this.collegeId = collegeId;
    }
}
