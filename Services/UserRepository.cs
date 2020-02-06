using System.Linq;
using iCloset.Models;
using iCloset.DataAccess;
using System.Collections.Generic;
using System;
using iCloset.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace iCloset.Services
{
    public class UserRepository : GenericRepository<User, Guid>,
    IUserRepository<User>
    {
        private readonly ClothsyDBContext _context;
        public IQueryable<UserDto> Merged(){
            return _context.AppUser
            .Include(p=>p.UserConversation).Select(p => new UserDto
            {
                ID = p.ID,
                FirstName = p.FirstName,
                LastName = p.LastName,
                Email = p.Email,
                UserConversation = p.UserConversation
            });

        }

        private IQueryable<User> _entities;
        private IQueryable<UserDto> _entitiesDto;

        public UserRepository(ClothsyDBContext dbContext) : base(dbContext)
        {
            _context = dbContext;
            _entities = dbContext.AppUser;
            _entitiesDto = Merged();
        }

        public IQueryable<User> GetUsers(){
            return _entities;
        }

        public IQueryable<User> GetUserById(Guid id){
            return GetById(id);
        }
        public User CreateUser(User user){
            return Create(user);
        }

    }
}