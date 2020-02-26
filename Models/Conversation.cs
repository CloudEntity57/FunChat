using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace iCloset.Models
{
    public class Conversation : IEntity<Guid>
    {
        public Conversation(){

        }
        public Guid ID { get; set; }
        public DateTime StartDate { get; set; }
        public string Topic { get; set; }
        public ICollection<Message> Message { get; set; }
        public ICollection<UserConversation> UserConversation { get; set; }
    }
}