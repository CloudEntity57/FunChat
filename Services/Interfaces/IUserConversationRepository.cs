using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using iCloset.Models;
using System.Collections.Generic;

namespace iCloset.Services.Interfaces
{
    public interface IUserConversationRepository<TResponse>: IGenericRepository<UserConversation, int>
    where TResponse: class
    {
        TResponse CreateConversation(TResponse conversation);
    }
}