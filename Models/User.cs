using System;

namespace iCloset.Models
{
    public class User : IEntity<Guid>
    {
        public User(){

        }
        public Guid ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        
    }
}