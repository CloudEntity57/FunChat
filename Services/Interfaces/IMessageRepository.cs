using System;
using System.Linq;
using iCloset.Models;

namespace iCloset.Services.Interfaces
{
    public interface IMessageRepository<TResponse> : IGenericRepository<Message, Guid>
    where TResponse:class
    {
         IQueryable<TResponse> GetMessages();
         IQueryable<TResponse> GetMessageByID(Guid id);
         IQueryable<TResponse> GetMessagesByConversation(Guid id);
         TResponse CreateMessage(TResponse message);
    }
}