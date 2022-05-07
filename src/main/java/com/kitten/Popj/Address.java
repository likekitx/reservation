package com.kitten.Popj;
/**
 * @author ASUS
 * 地址表
 */
public class Address {
    /**
     * 地址编号
     */
    private int addressId;
    /**
     * 用户名称
     */
    private String addressUser;
    /**
     * 地址名称
     */
    private String addressName;
    /**
     * 用户电话
     */
    private String addressPhone;
    /**
     * 引用users表的id字段
     */
    private int usersId;
    public int getAddressId() {
        return addressId;
    }
    public void setAddressId(int addressId) {
        this.addressId = addressId;
    }
    public String getAddressUser() {
        return addressUser;
    }
    public void setAddressUser(String addressUser) {
        this.addressUser = addressUser;
    }
    public String getAddressName() {
        return addressName;
    }
    public void setAddressName(String addressName) {
        this.addressName = addressName;
    }

    public String getAddressPhone() {
        return addressPhone;
    }

    public void setAddressPhone(String addressPhone) {
        this.addressPhone = addressPhone;
    }

    public int getUsersId() {
        return usersId;
    }
    public void setUsersId(int usersId) {
        this.usersId = usersId;
    }
}
