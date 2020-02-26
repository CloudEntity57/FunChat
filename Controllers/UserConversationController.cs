using System;
using System.Linq;
using iCloset.DataAccess;
using iCloset.Models;
using iCloset.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace iCloset.Controllers
{
    [Route("api/UserConversation")]
    public class UserConversationController : Controller
    {
        private readonly IUserConversationRepository<UserConversation> _repository;
        private readonly ClothsyDBContext _context;
        public UserConversationController(IUserConversationRepository<UserConversation> repository, ClothsyDBContext context){
            _repository = repository;
            _context = context;
        }

        [HttpPost()]
        public IActionResult CreateUserConversation([FromBody]UserConversation conversation){
            try{
                var result = _repository.Create(conversation);
                return Ok(result);
            }catch(Exception e){
                return BadRequest(e.Message);
            }
        }
    }
}