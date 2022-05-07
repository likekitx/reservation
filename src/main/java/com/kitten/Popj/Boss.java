package com.kitten.Popj;
/**
 * @author ASUS
 * 老板表
 */
public class Boss {
    /**
     * 账号
     */
    private String account;
    /**
     * 密码
     */
    private String passWord;
    /**
     * 余额
     */
    private double money;
    /**
     * 收入
     */
    private double income;
    /**
     * 支出
     */
    private double expend;
    /**
     * 人数
     */
    private int count;

    public int getCount() {
        return count;
    }
    public void setCount(int count) {
        this.count = count;
    }
    public String getAccount() {
        return account;
    }
    public void setAccount(String account) {
        this.account = account;
    }
    public String getPassWord() {
        return passWord;
    }
    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }
    public double getMoney() {
        return money;
    }
    public void setMoney(double money) {
        this.money = money;
    }
    public double getIncome() {
        return income;
    }
    public void setIncome(double income) {
        this.income = income;
    }
    public double getExpend() {
        return expend;
    }
    public void setExpend(double expend) {
        this.expend = expend;
    }
}
