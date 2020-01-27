using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using iCloset.Models;
using System.Collections.Generic;

namespace iCloset.Services.Interfaces
{
    public interface IUserRepository<TResponse>: IGenericRepository<User, Guid>
    where TResponse: class
    {
        // IEnumerable<User> GetAll();
        IQueryable<TResponse> GetUsers();

        // IEnumerable<User> GetById(int id);
    }
}