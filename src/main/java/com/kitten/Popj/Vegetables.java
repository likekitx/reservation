package com.kitten.Popj;
/**
 * @author ASUS
 */
public class Vegetables {
    /**
     * 菜品编号
     */
    private int id;
    /**
     * 菜品名字
     */
    private String name;
    /**
     * 菜品价格
     */
    private double money;
    /**
     * 菜品数量
     */
    private int many;
    /**
     * 菜品的url
     */
    private String url;
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
    public double getMoney() {
        return money;
    }
    public void setMoney(double money) {
        this.money = money;
    }
    public int getMany() {
        return many;
    }
    public void setMany(int many) {
        this.many = many;
    }
    public String getUrl() {
        return url;
    }
    public void setUrl(String url) {
        this.url = url;
    }
}
