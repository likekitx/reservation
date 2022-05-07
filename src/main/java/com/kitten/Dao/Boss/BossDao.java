package com.kitten.Dao.Boss;
import com.kitten.Popj.Boss;
import java.sql.Connection;
import java.util.List;
/**
 * @author ASUS
 */
public interface BossDao {
    //查询余额等数据
    public Boss selectMessageDao(Connection connection);
    //插入菜品数据
    public int insertBossDao(Connection connection,String name,int count,double price,String url);
    //渲染表格数据
    public List<Object> updataBossDao(Connection connection, int page, int limit);
    //更新表格数据
    public int updateTable(Connection connection,String field,String value,int id);
    //删除菜品
    public boolean deleteVeg(Connection connection, String id);
}
