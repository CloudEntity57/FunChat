using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using iCloset.Models;
using System.Collections.Generic;

namespace iCloset.Services.Interfaces
{
    public interface IConversationRepository<TResponse>: IGenericRepository<Conversation, Guid>
    where TResponse: class
    {
        IQueryable<TResponse> GetConversations();
        IQueryable<TResponse> GetConversationById(Guid id);
        TResponse CreateConversation(TResponse conversation);
    }
}