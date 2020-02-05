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
        IQueryable<TResponse> GetUserById(Guid id);
        TResponse CreateUser(TResponse user);
    }
}