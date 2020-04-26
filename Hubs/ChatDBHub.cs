using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace iCloset{

    public class ChatDBHub : Hub
    {
        public void Echo(string message){
            Clients.All.SendAsync("Send",message);
        }

        public async Task JoinRoom(Guid convId){
            var id = convId.ToString();
            await Groups.AddToGroupAsync(Context.ConnectionId, id);
        }

        public Task SendMessageToRoom(string groupID, string message)
        {
            return Clients.Group(groupID).SendAsync("ReceiveMessage", message);
        }
    }
}