using System;
using System.Linq;
using iCloset.DataAccess;
using iCloset.Models;
using iCloset.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace iCloset.Controllers
{
    [Route("api/User")]
    public class UserController : Controller
    {

        private readonly IUserRepository<User> _repository;
        private readonly ClothsyDBContext _context;
        public IQueryable<UserDto> Merged(){
            return _context.AppUser
            .Include(p=>p.UserConversation)
            .Select(p => new UserDto
            {
                ID = p.ID,
                FirstName = p.FirstName,
                LastName = p.LastName,
                Email = p.Email,
                UserConversation = p.UserConversation
            });

        }
        public UserController(IUserRepository<User> repository, ClothsyDBContext context){
            _repository = repository;
            _context = context;
        }
        [HttpGet()]
        [Authorize]
        public IActionResult GetAllUsers(){
             try{
                // var response = _repository.GetUsers();
                var response = Merged();
                if(response == null){
                    return NotFound();
                }
                return Ok(response);
            }catch(Exception e){
                return BadRequest(e.Message);
            }
        }
        [HttpGet("{id}")]
        [Authorize]
        public IActionResult Get(Guid id){
            try{
                var user = _repository.GetUserById(id)
                .Include(p => p.UserConversation)
                .Select(p => new UserDto{
                    ID = p.ID,
                    FirstName = p.FirstName,
                    LastName = p.LastName,
                    Email = p.Email,
                    UserConversation = p.UserConversation
                });
                if( user != null){
                    return Ok(user);
                }
                return NotFound($"User with ID {id} not found");

            }
            catch(Exception e){
#if DEBUG
            return BadRequest(e);
#else
            return BadRequest("Error encountered while trying to request data");
#endif
            }

        }
    }
}