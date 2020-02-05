using System;
using iCloset.Models;
using iCloset.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace iCloset.Controllers
{
    [Route("api/User")]
    public class UserController : Controller
    {
        private readonly IUserRepository<User> _repository;
        public UserController(IUserRepository<User> repository){
            _repository = repository;
        }
        [HttpGet()]
        public IActionResult GetAllUsers(){
             try{
                var response = _repository.GetUsers();
                if(response == null){
                    return NotFound();
                }
                return Ok(response);
            }catch(Exception e){
                return BadRequest(e.Message);
            }
        }
        [HttpGet("{id}")]
        public IActionResult Get(Guid id){
            try{
                var user = _repository.GetUserById(id);
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