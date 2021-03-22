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
                // TODO: set to default cardset?
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
    }
}
