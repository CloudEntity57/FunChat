using System;
using System.Collections.Generic;
using System.Linq;
using iCloset.DataAccess;
using iCloset.Models;
using iCloset.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace iCloset.Controllers
{
    [Route("api/message")]
    public class MessageController : Controller
    {
        private readonly IMessageRepository<Message> _repository;
        public MessageController(IMessageRepository<Message> repository)
        {
            _repository = repository;
        }
        [HttpGet()]
        [Authorize]

        public IActionResult GetMessages()
        {
            var result = _repository.GetMessages();
            try{
                if(result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }catch(Exception e) {
                return BadRequest(e.Message);
            }
        }
        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult DeleteMessage(Guid id)
        {
            try{
                _repository.Delete(id);
                return Ok(true);
            }catch(Exception e) {
                return BadRequest(e.Message);
            }
        }
        [Route("conversation")]
        [HttpGet("{id}")]
        [Authorize]
        public IActionResult GetMessagesByConversation(Guid id)
        {
            var result = _repository.GetMessagesByConversation(id);
            try{
                if(result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }catch(Exception e) {
                return BadRequest(e.Message);
            }
        }
        [HttpPost]
        [Authorize]
        public IActionResult PostMessage([FromBody]Message message)
        {
            
            try{
                var result = _repository.Create(message);
                return Ok(result);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }

    }
}