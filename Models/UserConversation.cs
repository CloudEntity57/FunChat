using System;

namespace iCloset.Models
{
    public class UserConversation : IEntity<int>
    {
        public UserConversation(){

        }
        public int ID { get; set; }
        public Guid ConvID { get; set; }
        public Guid UserID { get; set; }
        public User User { get; set; }
        public Conversation Conversation { get; set; }

    }
}