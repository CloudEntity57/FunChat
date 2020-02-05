using System;
using System.Collections.Generic;

namespace iCloset.Models
{
    public class Conversation : IEntity<Guid>
    {
        public Conversation(){

        }
        public Guid ID { get; set; }
        public DateTime StartDate { get; set; }
        public string Topic { get; set; }
    
        public List<Message> Message { get; set; }
        public List<UserConversation> UserConversation { get; set; }
    }
}