package com.kitten.Popj;
/**
 * @author ASUS
 * 用户表
 */
public class Users {
    /**
     * 用户编号
     */
    private int usersId;
    /**
     * 用户姓名
     */
    private String usersName;
    /**
     * 用户年龄
     */
    private int usersAge;
    /**
     * 用户性别
     */
    private String usersSex;
    /**
     * 用户账号
     */
    private int account;
    /**
     * 用户密码
     */
    private String passWord;
    /**
     * 用户邮箱
     */
    private String usersEmail;
    /**
     * 用户联系电话
     */
    private String usersPhone;
    /**
     * 用户余额
     */
    private double usersMoney;
    /**
     * 引用专业表major的id字段
     */
    private int majorId;
    public int getUsersId() {
        return usersId;
    }
    public void setUsersId(int usersId) {
        this.usersId = usersId;
    }
    public String getUsersName() {
        return usersName;
    }
    public void setUsersName(String usersName) {
        this.usersName = usersName;
    }
    public int getUsersAge() {
        return usersAge;
    }
    public void setUsersAge(int usersAge) {
        this.usersAge = usersAge;
    }
    public String getUsersSex() {
        return usersSex;
    }
    public void setUsersSex(String usersSex) {
        this.usersSex = usersSex;
    }
    public int getAccount() {
        return account;
    }
    public void setAccount(int account) {
        this.account = account;
    }
    public String getPassWord() {
        return passWord;
    }
    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }
    public String getUsersEmail() {
        return usersEmail;
    }
    public void setUsersEmail(String usersEmail) {
        this.usersEmail = usersEmail;
    }
    public String getUsersPhone() {
        return usersPhone;
    }
    public void setUsersPhone(String usersPhone) {
        this.usersPhone = usersPhone;
    }
    public double getUsersMoney() {
        return usersMoney;
    }
    public void setUsersMoney(double usersMoney) {
        this.usersMoney = usersMoney;
    }
    public int getMajorId() {
        return majorId;
    }
    public void setMajorId(int majorId) {
        this.majorId = majorId;
    }
}
