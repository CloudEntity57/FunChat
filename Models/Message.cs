using System;

namespace iCloset.Models
{
    public class Message : IEntity<Guid>
    {
        public Message()
        {
        }
        public Guid ID {get; set;}
        public string Body { get; set;}
        public DateTime MessageTimeStamp { get; set; }
        public Guid AuthorID { get; set; }
        public Guid ConversationID { get; set; }
        public Conversation Conversation{ get; set; }
    }
}