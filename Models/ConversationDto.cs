using System;
using System.Collections.Generic;

namespace iCloset.Models
{
    public class ConversationDto : IEntity<Guid>
    {
        public ConversationDto(){

        }
        public Guid ID { get; set; }
        public DateTime StartDate { get; set; }
        public string Topic { get; set; }
    
        public ICollection<Message> Message { get; set; }
        public ICollection<UserConversation> UserConversation { get; set; }
    }
}