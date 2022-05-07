package com.kitten.Service.Index;
import java.util.List;
/**
 * @author ASUS
 */
public interface IndexService {
    //渲染url到页面
    public List<Object> indexUrlPrice(int limit);
    public List<Object> orderFormShow(String name);
    public boolean topUp(Double money,String dateTime,int id);
    public List<Object> topUpRecord(int id);
    //设置地址信息
    public List<Object> setAddress(String userName,String userPhone,String userAddress,int userId);
    //订单管理
    public List<Object> orderFormRecord(int id);
    //地址管理
    public List<Object> addressRecord(int id);
    //修改表格
    public boolean updateAddressTable(String addressName, String value, int id);
    //查看有没有地址
    public int selectAddressCount(int usersId);
    //更新信息
    public List<Object> updateMessage(String vegName, int vegId, int vegMany, double vegPrice, String payTime, int addressId,int userId);
    //搜索信息
    public List<Object> search(String val);
    //删除地址
    public boolean deleteAddress(String id);
    //搜索表格数据
    public List<Object> tableSearch(String val);
}
