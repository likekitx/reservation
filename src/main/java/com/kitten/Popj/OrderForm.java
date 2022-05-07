package com.kitten.Popj;
import java.sql.Date;
/**
 * @author ASUS
 * 订单表
 */
public class OrderForm {
    /**
     * 订单编号
     */
    private int orderFormId;
    /**
     * 支付时间
     */
    private Date payTime;
    /**
     * 支付金额
     */
    private double payMoney;
    /**
     * 支付用户
     */
    private String users;
    /**
     * 用户电话
     */
    private String phone;
    /**
     * 订单填写地址
     */
    private String address;
    /**
     * 引用users表的id字段
     */
    private int usersId;
    /**
     * 引用address表的id字段
     */
    private int addressId;

    public int getOrderFormId() {
        return orderFormId;
    }

    public void setOrderFormId(int orderFormId) {
        this.orderFormId = orderFormId;
    }

    public Date getPayTime() {
        return payTime;
    }

    public void setPayTime(Date payTime) {
        this.payTime = payTime;
    }

    public double getPayMoney() {
        return payMoney;
    }

    public void setPayMoney(double payMoney) {
        this.payMoney = payMoney;
    }

    public String getUsers() {
        return users;
    }

    public void setUsers(String users) {
        this.users = users;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getUsersId() {
        return usersId;
    }

    public void setUsersId(int usersId) {
        this.usersId = usersId;
    }

    public int getAddressId() {
        return addressId;
    }

    public void setAddressId(int addressId) {
        this.addressId = addressId;
    }
}
