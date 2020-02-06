using System.Linq;
using iCloset.Models;
using iCloset.DataAccess;
using System.Collections.Generic;
using System;
using iCloset.Services.Interfaces;

namespace iCloset.Services
{
    public class ConversationRepository : GenericRepository<Conversation, Guid>,
    IConversationRepository<Conversation>
    {
        public ConversationRepository(ClothsyDBContext dbContext) : base(dbContext)
        {
        }

        public IQueryable<Conversation> GetConversations(){
            return GetAll();
        }

        public IQueryable<Conversation> GetConversationById(Guid id){
            return GetById(id);
        }

        public Conversation CreateConversation(Conversation conversation){
            return Create(conversation);
        }

    }
}