package com.kitten.Popj;
/**
 * @author ASUS
 *  订单表关联的菜品表
 */
public class OrderFormVegetable {
    /**
     * 菜品编号
     */
    private int id;
    /**
     * 菜品名称
     */
    private String name;
    /**
     * 菜品数量
     */
    private int many;
    /**
     * 菜品价格
     */
    private double price;
    /**
     * 引用订单表的id字段
     */
    private int orderFormId;

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getMany() {
        return many;
    }
    public void setMany(int many) {
        this.many = many;
    }
    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }
    public int getOrderFormId() {
        return orderFormId;
    }
    public void setOrderFormId(int orderFormId) {
        this.orderFormId = orderFormId;
    }
}
