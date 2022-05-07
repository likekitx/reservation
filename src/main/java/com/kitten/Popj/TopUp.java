package com.kitten.Popj;

/**
 * @author ASUS
 * 充值表
 */
public class TopUp {
    /**
     * 充值编号
     */
    private int topUpId;
    /**
     * 充值金额
     */
    private double topUpMoney;
    /**
     * 充值时间
     */
    private String topUpTime;
    /**
     * 引用的users表的id字段
     */
    private int usersId;

    public int getTopUpId() {
        return topUpId;
    }
    public void setTopUpId(int topUpId) {
        this.topUpId = topUpId;
    }
    public double getTopUpMoney() {
        return topUpMoney;
    }
    public void setTopUpMoney(double topUpMoney) {
        this.topUpMoney = topUpMoney;
    }
    public String getTopUpTime() {
        return topUpTime;
    }
    public void setTopUpTime(String topUpTime) {
        this.topUpTime = topUpTime;
    }
    public int getUsersId() {
        return usersId;
    }
    public void setUsersId(int usersId) {
        this.usersId = usersId;
    }
}
