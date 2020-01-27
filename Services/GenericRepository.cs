using iCloset.DataAccess;
using Microsoft.EntityFrameworkCore;
using iCloset.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using iCloset.Models;

namespace iCloset.Services
{
    public class GenericRepository<TEntity, TKeyType> : IGenericRepository<TEntity, TKeyType>
        where TEntity : class,
        IEntity<TKeyType>
    {

        private readonly ClothsyDBContext dbContext;
     
        public GenericRepository(ClothsyDBContext dbContext)
        {
            this.dbContext = dbContext; 
        }

        public TEntity Create(TEntity entity)
        {
            dbContext.Set<TEntity>().Add(entity);
            dbContext.SaveChanges();

            return entity;
        }

        public void Delete(TKeyType id)
        {
            var entity = dbContext.Find<TEntity>(id);
            dbContext.Set<TEntity>().Remove(entity);
            dbContext.SaveChanges();
        }

        public IQueryable<TEntity> GetAll()
        {
            return dbContext.Set<TEntity>()
                .AsNoTracking();
               
        }

        public IQueryable<TEntity> GetById(TKeyType id)
        {
            var t = dbContext.Set<TEntity>(); 
            var x = t.Where(e => e.ID.Equals(id));
            return x; 
        }
        public TEntity Update(TKeyType id, TEntity entity)
        {
            dbContext.Set<TEntity>().Update(entity);
            dbContext.SaveChanges();
            return entity;
        }
    }
}