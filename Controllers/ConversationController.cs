using System;
using System.Linq;
using iCloset.DataAccess;
using iCloset.Models;
using iCloset.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace iCloset.Controllers
{
    [Route("api/Conversation")]
    public class ConversationController : Controller
    {
        private readonly IConversationRepository<Conversation> _repository;
        private readonly ClothsyDBContext _context;
        public ConversationController(IConversationRepository<Conversation> repository, ClothsyDBContext context){
            _repository = repository;
            _context = context;
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
                var conversation = _repository.GetConversationById(id)
                .Include(p=>p.Message).Select(p => new ConversationDto
                {
                    ID = p.ID,
                    StartDate = p.StartDate,
                    Topic = p.Topic,
                    Message = p.Message,
                    UserConversation = p.UserConversation
                }).ToList();
                var messages = conversation[0].Message.OrderBy(msg => msg.MessageTimeStamp);
                conversation[0].Message = messages.ToList();
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
        [HttpGet("PM")]
        public IActionResult GetPMs(){
            IQueryable<Conversation> PMs = _context.Conversation.Where(p => p.Topic == "PM");
            var result = PMs;
            return Ok(result);
        }
    }
}