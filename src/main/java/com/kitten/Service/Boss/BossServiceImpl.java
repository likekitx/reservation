package com.kitten.Service.Boss;
import com.kitten.Dao.BaseDao;
import com.kitten.Dao.Boss.BossDao;
import com.kitten.Dao.Boss.BossDaoImpl;
import com.kitten.Popj.Boss;
import java.sql.Connection;
import java.util.List;
/**
 * @author ASUS
 */
public class BossServiceImpl implements BossService{
    Connection connection = null;
    Boss boss = null;
    BossDao bossDao = null;
    String flag;
    boolean b = false;
    List<Object> list;
    BaseDao baseDao = null;
    //构造函数
    public BossServiceImpl() {
        baseDao = new BaseDao();
        connection = baseDao.getConnection();
        boss = new Boss();
        bossDao = new BossDaoImpl();
    }
    //返回人数、余额、收入支出信息
    @Override
    public Boss selectBossMessage() {
        boss = bossDao.selectMessageDao(connection);
        extracted(connection);
        return boss;
    }
    //插入菜品
    @Override
    public String insertBossVeg(String name, int count, double price, String url) {
        int i = bossDao.insertBossDao(connection, name, count, price, url);
        if(i==888){
            flag = "exist";
        }else if(i==1){
            flag = "true";
        }else {
            flag = "false";
        }
        extracted(connection);
        return flag;
    }
    //更新查看菜品数据的表格信息进行分页
    @Override
    public List<Object> updataBossVeg(int page, int limit) {
        list = bossDao.updataBossDao(connection,page,limit);
        extracted(connection);
        return list;
    }
    //修改表格
    @Override
    public boolean updateTable(String field, String value, int id) {
        int i = bossDao.updateTable(connection, field, value, id);
        if(i>0){
            b = true;
        }
        extracted(connection);
        return b;
    }
//    删除菜品
    @Override
    public boolean deleteVeg(String id) {
        boolean b = bossDao.deleteVeg(connection,id);
        extracted(connection);
        return b;
    }
    //提取关闭的方法
    private void extracted(Connection connection) {
        if(connection!=null){
            baseDao.closeResource(connection,null,null);
        }
    }
}
