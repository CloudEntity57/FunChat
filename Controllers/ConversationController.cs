using System;
using iCloset.Models;
using iCloset.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace iCloset.Controllers
{
    [Route("api/Conversation")]
    public class ConversationController : Controller
    {
        private readonly IConversationRepository<Conversation> _repository;
        public ConversationController(IConversationRepository<Conversation> repository){
            _repository = repository;
        }
        [HttpGet()]
        public IActionResult GetAll(){
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
        [HttpGet("{id}")]
        public IActionResult Get(Guid id){
            try{
                var conversation = _repository.GetConversationById(id);
                if( conversation != null){
                    return Ok(conversation);
                }
                return NotFound($"Chat with ID {id} not found");

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