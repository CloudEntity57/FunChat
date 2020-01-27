using System.Linq;

namespace iCloset.Services.Interfaces
{
    public interface IGenericRepository<TEntity,T>
        where TEntity: class
    {
         IQueryable<TEntity> GetAll();

        IQueryable<TEntity> GetById(T id);

        TEntity Create(TEntity entity);

        TEntity Update(T id, TEntity entity);

        void Delete(T id);

    }
}