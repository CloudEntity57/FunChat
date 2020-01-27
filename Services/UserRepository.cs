using System.Linq;
using iCloset.Models;
using iCloset.DataAccess;
using System.Collections.Generic;
using System;
using iCloset.Services.Interfaces;

namespace iCloset.Services
{
    public class UserRepository : GenericRepository<User, Guid>,
    IUserRepository<User>
    {
        public UserRepository(ClothsyDBContext dbContext) : base(dbContext)
        {
        }

        public IQueryable<User> GetUsers(){
            return GetAll();
        }

    }
}