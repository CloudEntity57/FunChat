using System;
using System.Linq;
using iCloset.DataAccess;
using iCloset.Models;
using iCloset.Services.Interfaces;

namespace iCloset.Services
{
    public class MessageRepository : GenericRepository<Message, Guid>,
    IMessageRepository<Message>
    {
        public MessageRepository(ClothsyDBContext dbContext) : base(dbContext)
        {
           
        }
        public IQueryable<Message> GetMessages()
        {
            return GetAll();
        }
        public IQueryable<Message> GetMessagesByConversation(Guid id)
        {
            return GetAll().Where(message => message.ConversationID == id)
            .OrderByDescending(d => d.MessageTimeStamp);
        }

        public IQueryable<Message> GetMessageByID(Guid id)
        {
            return GetById(id);
        }
        public Message CreateMessage(Message message){
            return Create(message);
        }
    }
}