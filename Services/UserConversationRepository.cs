using System.Linq;
using iCloset.Models;
using iCloset.DataAccess;
using System.Collections.Generic;
using System;
using iCloset.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace iCloset.Services
{
    public class UserConversationRepository : GenericRepository<UserConversation, int>,
    IUserConversationRepository<UserConversation>
    {
        public UserConversationRepository(ClothsyDBContext dBContext) : base(dBContext)
        {

        }
        public UserConversation CreateConversation(UserConversation conversation){
            return Create(conversation);
        }

    }
}