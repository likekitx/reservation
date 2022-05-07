package com.kitten.Dao.Index;
import java.sql.Connection;
import java.util.List;
public interface IndexDao {
    //渲染页面的url
    public List<Object> indexUrlPrice(Connection connection,int limit);
    public List<Object> orderFormShow(Connection connection,String name);
    public boolean topUp(Connection connection,Double money,String dateTime,int id);
    public List<Object> topUpRecord(Connection connection,int id);
    //设置地址信息；
    public List<Object> setAddress(Connection connection,String userName,String userPhone,String userAddress,int userId);
    //订单信息
    public List<Object> orderFormRecord(Connection connection,int id);
    //地址管理
    public List<Object> addressRecord(Connection connection, int id);
    //修改表格
    public boolean updateAddressTable(Connection connection, String addressName, String value, int id);
    //查看没有没有地址
    public int selectAddressCount(Connection connection, int usersId);
    //更新信息
    public List<Object> updateMessage(Connection connection, String vegName, int vegId, int vegMany, double vegPrice, String payTime, int addressId,int userId);
    //搜索信息
    public List<Object> search(Connection connection, String val);
    //删除地址
    public boolean deleteAddress(Connection connection, String id);
    //搜索表表格信息
    public List<Object> tableSearch(Connection connection, String val);
}
