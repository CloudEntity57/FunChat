using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace iCloset{

    public class ChatDBHub : Hub
    {
        // [Authorize]
        public void Echo(string message){
            Clients.All.SendAsync("Send",message);
        }
        // [Authorize]
        public async Task JoinRoom(Guid convId){
            var id = convId.ToString();
            await Groups.AddToGroupAsync(Context.ConnectionId, id);
        }
        // [Authorize]
        public Task SendMessageToRoom(string groupID, string message)
        {
            return Clients.Group(groupID).SendAsync("ReceiveMessage", message);
        }
    }
}