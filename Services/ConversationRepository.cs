using System.Linq;
using iCloset.Models;
using iCloset.DataAccess;
using System.Collections.Generic;
using System;
using iCloset.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace iCloset.Services
{
    public class ConversationRepository : GenericRepository<Conversation, Guid>,
    IConversationRepository<Conversation>
    {
        private readonly ClothsyDBContext _context;
        public IQueryable<ConversationDto> Merged(){
            return _context.Conversation
            .Include(p=>p.Message).Select(p => new ConversationDto
            {
                ID = p.ID,
                StartDate = p.StartDate,
                Topic = p.Topic,
                Message = p.Message,
                UserConversation = p.UserConversation
            });

        }
        private IQueryable<Conversation> _entities;
        private IQueryable<ConversationDto> _entitiesDto;
        public ConversationRepository(ClothsyDBContext dbContext) : base(dbContext)
        {
            _context = dbContext;
            _entities = dbContext.Conversation;
            _entitiesDto = Merged();
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