using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using iCloset.Models;
using iCloset.Services;
using iCloset.Services.Interfaces;

namespace iCloset.Controllers
{
    [Route("api/SampleData")]
    public class SampleDataController : Controller
    {
        private readonly IUserRepository<User> _repository;
    
        public SampleDataController(IUserRepository<User> repository){
            _repository = repository;
        }
        [Route("UserData")]
        [HttpGet()]
        public IActionResult UserData(){
            Console.WriteLine("Found this function");
            try{
                var response = _repository.GetAll();
                if(response == null){
                    return NotFound();
                }
                return Ok(response);
            }catch(Exception e){
                return BadRequest(e.Message);
            }
            
        }


    }
}
