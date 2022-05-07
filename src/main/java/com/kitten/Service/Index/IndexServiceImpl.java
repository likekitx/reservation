package com.kitten.Service.Index;
import com.kitten.Dao.BaseDao;
import com.kitten.Dao.Index.IndexDao;
import com.kitten.Dao.Index.IndexDaoImpl;
import java.sql.Connection;
import java.util.List;
public class IndexServiceImpl implements IndexService {
    Connection connection = null;
    IndexDao indexDao = null;
    List<Object> list = null;
    int excute = 0;
    boolean flag = false;
    BaseDao baseDao = null;
    public IndexServiceImpl() {
        baseDao = new BaseDao();
        connection = baseDao.getConnection();
        indexDao = new IndexDaoImpl();
    }
    //渲染猜你喜欢的service
    @Override
    public List<Object> indexUrlPrice(int limit) {
        list = indexDao.indexUrlPrice(connection,limit);
        extracted(connection);
        return list;
    }
    //封装判断connection是否为空，
    private void extracted(Connection connection) {
        if(connection!=null){
            baseDao.closeResource(connection,null,null);
        }
    }
    // 轮播图信息数据返回
    @Override
    public List<Object> orderFormShow(String name) {
        list = indexDao.orderFormShow(connection, name);
        extracted(connection);
        return list;
    }
    //充值
    @Override
    public boolean topUp(Double money,String dateTime,int id) {
        flag = indexDao.topUp(connection, money, dateTime,id);
        extracted(connection);
        return flag;
    }
    //充值记录
    @Override
    public List<Object> topUpRecord(int id) {
        list = indexDao.topUpRecord(connection,id);
        extracted(connection);
        return list;
    }
//    设置地址
    @Override
    public List<Object> setAddress(String userName,String userPhone,String userAddress,int userId) {
        list = indexDao.setAddress(connection,userName,userPhone,userAddress,userId);
        extracted(connection);
        return list;
    }
//    订单记录
    @Override
    public List<Object> orderFormRecord(int id) {
        list = indexDao.orderFormRecord(connection,id);
        extracted(connection);
        return list;
    }
    //地址管理
    @Override
    public List<Object> addressRecord(int id) {
        list = indexDao.addressRecord(connection,id);
        extracted(connection);
        return list;
    }
    //更新地址
    @Override
    public boolean updateAddressTable(String addressName, String value, int id) {
        flag = indexDao.updateAddressTable(connection,addressName,value,id);
        extracted(connection);
        return flag;
    }
    //查询有没有地址
    @Override
    public int selectAddressCount(int usersId) {
        excute = indexDao.selectAddressCount(connection,usersId);
        extracted(connection);
        return excute;
    }
//    更新个人信息
    @Override
    public List<Object> updateMessage(String vegName, int vegId, int vegMany, double vegPrice, String payTime, int addressId,int userId) {
        list = indexDao.updateMessage(connection,vegName,vegId,vegMany,vegPrice,payTime,addressId,userId);
        extracted(connection);
        return list;
    }
    //搜索
    @Override
    public List<Object> search(String val) {
        list = indexDao.search(connection,val);
        extracted(connection);
        return list;
    }
//    删除地址
    @Override
    public boolean deleteAddress(String id) {
        flag = indexDao.deleteAddress(connection,id);
        extracted(connection);
        return flag;
    }
//搜索结果表格
    @Override
    public List<Object> tableSearch(String val) {
        list = indexDao.tableSearch(connection,val);
        extracted(connection);
        return list;
    }
}
