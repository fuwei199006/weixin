/* 
* @Author: Kasar
* @Date:   2015-03-12 13:22:20
* @Last Modified by:   Kasar
* @Last Modified time: 2015-03-31 13:53:45
*/

using System;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;

namespace DataBase.Dal
{
    public class BaseRepository<T> where T : class
    {
        //创建EF框架的上下文
        //EF上下文的实例保证线程内唯一
        //获取的是当前线程内部的上下文实例，而且保证了线程内上下文唯一
        private readonly DbContext _db = EfContextFactory.GetCurrentDbContext();

        #region 实现对数据库的单个对象的操作(增删改查)的基类 + bool  AddEntity(T entity)

        /// <summary>
        ///     实现对数据库的单个对象的操作(增删改查)的基类
        /// </summary>
        /// <typeparam name="T">定义泛型，约束其是一个类</typeparam>
        public bool AddEntity(T entity)
        {
            try
            {
                //1.对现有的类进行包装 形成EF的单个对象
                var dbEntity = _db.Entry(entity);
                //2.对象的状态进行修改
                dbEntity.State = EntityState.Added;
                //3.对db的操作进行保存
                return _db.SaveChanges() > 0;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        #endregion

        #region 数据库的批量入库  +int AddEntities(IQueryable<T> entities)
        /// <summary>
        /// 数据库的批量入库
        /// </summary>
        /// <param name="entities">入库的list</param>
        /// <returns></returns>
        public int AddEntities(IQueryable<T> entities)
        {
            try
            {
                foreach (var entity in entities)
                {
                    //1.对现有的类进行包装 形成EF的单个对象
                    var dbEntity = _db.Entry(entity);
                    //2.对象的状态进行修改
                    dbEntity.State = EntityState.Added;
                }
                //3.对db的操作进行保存
                return _db.SaveChanges();
            }
            catch (Exception e)
            {
                throw e;
            }

        } 
        #endregion

        #region 实现对数据库单个对象的修改功能  + bool UpdateEntity(T entity)

        /// <summary>
        ///     实现对数据库单个对象的修改功能
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public bool UpdateEntity(T entity)
        {
            try
            {
                //2.修改对象的状态
                _db.Entry(entity).State = EntityState.Modified;
                return _db.SaveChanges() > 0;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        #endregion

        #region 实现对数据的批量更新，只访问一次数据库 + int UpdateEntities(IQueryable<T> entities)
        /// <summary>
        ///实现对数据的批量更新，只访问一次数据库
        /// </summary>
        /// <param name="entities"></param>
        /// <returns></returns>
        public int UpdateEntities(IQueryable<T> entities)
        {
            try
            {
                foreach (var entity in entities)
                {
                    //2.修改对象的状态
                    _db.Entry(entity).State = EntityState.Modified;
                }
                return _db.SaveChanges();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 实现对数据库的删除功能   + bool DeleteEntity(T entity)

        /// <summary>
        ///     实现对数据库的删除功能
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public bool DeleteEntity(T entity)
        {
            try
            {
                _db.Set<T>().Attach(entity);
                _db.Entry(entity).State = EntityState.Deleted;
                return _db.SaveChanges() > 0;
            }
            catch (Exception)
            {
                return false;
            }
        }
        #endregion

        #region 实现批量删除数据的功能  + int DeleteEntities(IQueryable<T> entities)
        /// <summary>
        /// 实现批量删除数据的功能，效率高
        /// </summary>
        /// <param name="entities">对象实体的集合</param>
        /// <returns></returns>
        public int DeleteEntities(IQueryable<T> entities)
        {
            try
            {
                foreach (var entity in entities)
                {
                    _db.Entry(entity).State = EntityState.Deleted;
                }
                return _db.SaveChanges();
            }
            catch (Exception e)
            {
                throw e;

            }

        }
        #endregion

        #region 实现对数据库的查询  --简单查询 + IQueryable<T> LoadEntities(Expression<Func<T, bool>> whereLambda)

        /// <summary>
        ///     实现对数据库的查询  --简单查询
        /// </summary>
        /// <param name="whereLambda">lambda表达式</param>
        /// <returns></returns>
        public IQueryable<T> LoadEntities(Expression<Func<T, bool>> whereLambda)
        {
            try
            {
                return _db.Set<T>().Where<T>(whereLambda).AsQueryable();
            }
            catch (Exception e)
            {
                throw e;
            }
            
        }

        #endregion


        #region 实现对数据库的查询，无需更新,提高性能  --简单查询 +IQueryable<T> LoadEntitiesWithoutUpdate(Expression<Func<T, bool>> whereLambda)

        /// <summary>
        ///     实现对数据库的查询  --简单查询
        /// </summary>
        /// <param name="whereLambda">lambda表达式</param>
        /// <returns></returns>
        public IQueryable<T> LoadEntitiesWithoutUpdate(Expression<Func<T, bool>> whereLambda)
        {
            //有时我们的实体只需要显示，无需更新，所以为了提高性能，我们不需要实体被EF context追踪。此时可以使用NoTracking的查询来得到实体，这样实体的状态会是Detached状态。
            try
            {
                return _db.Set<T>().Where<T>(whereLambda).AsNoTracking().AsQueryable();
            }
            catch (Exception e)
            {
                throw e;
            }

        }

        #endregion

        #region 实现对数据库的查询，无需更新,提高性能  --简单查询 +IQueryable<T> LoadEntitiesWithoutUpdate()

        /// <summary>
        ///     实现对数据库的查询  --简单查询
        /// </summary>
        /// <param name="whereLambda">lambda表达式</param>
        /// <returns></returns>
        public IQueryable<T> LoadEntitiesWithoutUpdate()
        {
            //EF4.0的写法
            //return db.CreateObjectSet<T>().Where<T>(whereLambda).AsQueryable();
            //EF5.0的写法
            try
            {
                return _db.Set<T>().AsQueryable();
            }
            catch (Exception exp)
            {
                throw exp;
            }

        }
        #endregion
        #region 实现对数据库的查询  --简单查询 + IQueryable<T> LoadEntities()

        /// <summary>
        ///     实现对数据库的查询  --简单查询
        /// </summary>
        /// <param name="whereLambda">lambda表达式</param>
        /// <returns></returns>
        public IQueryable<T> LoadEntities()
        {
            //EF4.0的写法
            //return db.CreateObjectSet<T>().Where<T>(whereLambda).AsQueryable();
            //EF5.0的写法
            try
            {
                return _db.Set<T>().AsQueryable();
            }
            catch (Exception exp)
            {
                throw exp;
            }
           
        }

        #endregion

        #region 实现对数据的分页查询 + IQueryable<T> LoadPageEntities<S>(int pageIndex, int pageSize, out int total, Expression<Func<T, bool>> whereLambda, bool isAsc, Expression<Func<T, S>> orderByLambda)

        /// <summary>
        ///     实现对数据的分页查询
        /// </summary>
        /// <typeparam name="S">按照某个类进行排序</typeparam>
        /// <param name="pageIndex">当前第几页</param>
        /// <param name="pageSize">一页显示多少条数据</param>
        /// <param name="total">总条数</param>
        /// <param name="whereLambda">取得排序的条件</param>
        /// <param name="isAsc">如何排序，根据倒叙还是升序</param>
        /// <param name="orderByLambda">根据那个字段进行排序</param>
        /// <returns></returns>
        public IQueryable<T> LoadPageEntities<S>(int pageIndex, int pageSize, out int total,
            Expression<Func<T, bool>> whereLambda,
            bool isAsc, Expression<Func<T, S>> orderByLambda)
        {
            //EF4.0和上面的查询一样
            //EF5.0
            var temp = _db.Set<T>().Where<T>(whereLambda);
            total = temp.Count(); //得到总的条数
            //排序,获取当前页的数据
            if (isAsc)
            {
                temp = temp.OrderBy(orderByLambda)
                    .Skip(pageSize * (pageIndex - 1)) //越过多少条
                    .Take(pageSize).AsQueryable(); //取出多少条
            }
            else
            {
                temp = temp.OrderByDescending(orderByLambda)
                    .Skip(pageSize * (pageIndex - 1)) //越过多少条
                    .Take(pageSize).AsQueryable(); //取出多少条
            }
            return temp.AsQueryable();
        }

        #endregion

        #region 根据Sql查询List +IQueryable<T> LoadEntities(string sql)

        /// <summary>
        /// 根据Sql查询List
        /// </summary>
        /// <param name="sql"></param>
        /// <returns></returns>
        public IQueryable<T> LoadEntities(string sql)
        {
            try
            {
                return _db.Database.SqlQuery<T>(sql).AsQueryable();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion

        #region EF 执行存储过程 返回类实体list +IQueryable<T> EfProduce(string prodName, SqlParameter[] parameters)

        /// <summary>
        /// EF 执行存储过程 返回类实体
        /// </summary>
        /// <param name="prodName">存储过程的名称</param>
        /// <param name="parameters">参数</param>
        /// <returns></returns>
        public IQueryable<T> EfProduce(string prodName, SqlParameter[] parameters)
        {
            try
            {
                var sql = "EXEC " + prodName + " ";
                sql = parameters.Aggregate(sql,
                    (current, item) => current + (item.ParameterName + "='" + item.Value + "', "));
                sql = sql.Remove(sql.LastIndexOf(','));
                return _db.Database.SqlQuery<T>(sql).AsQueryable();
            }
            catch (Exception exp)
            {
                throw exp;
            }
        }

        #endregion
    }
}