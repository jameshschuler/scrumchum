using Microsoft.AspNetCore.SignalR;
using Scrumchum.Models;
using Scrumchum.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumchum.Hubs
{
    public class ScrumchumHub : Hub
    {
        private static readonly IList<Room> _rooms = new List<Room>();

        public ScrumchumHub()
        {

        }

        public async Task CreateRoom(CreateRoomRequest request)
        {
            if (request.CardsetId == null)
            {
                request.CardsetId = 1;
            }

            // TODO: create group and add (group-roomcode)?
        }

        public async Task JoinRoom(JoinRoomRequest request)
        {
            var room = _rooms.FirstOrDefault( e => e.RoomCode == request.RoomCode );
            if ( room == null )
            {
                // return error
            }

            room.Join(request.User);
        }

        public override Task OnConnectedAsync( )
        {
            Clients.Caller.SendAsync( "Welcome", new { message = "Welcome to Scrumchum!" } );

            return base.OnConnectedAsync( );
        }
    }
}
