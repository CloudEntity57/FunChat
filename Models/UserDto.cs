using System;
using System.Collections.Generic;

namespace iCloset.Models
{
    public class UserDto : IEntity<Guid>
    {
        public UserDto(){

        }
        public Guid ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public ICollection<UserConversation> UserConversation { get; set; }
    }
}