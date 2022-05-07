package com.kitten.Service.Boss;
import com.kitten.Popj.Boss;
import java.util.List;
/**
 * @author ASUS
 */
public interface BossService {
    //查询余额等数据
    public Boss selectBossMessage();
    //添加菜品数据
    public String insertBossVeg(String name,int count,double price,String url);
    //渲染表格数据
    public List<Object> updataBossVeg(int page, int limit);
    //更新表格数据
    public boolean updateTable(String field,String value,int id);
    //删除菜品
    public boolean deleteVeg(String id);
}
