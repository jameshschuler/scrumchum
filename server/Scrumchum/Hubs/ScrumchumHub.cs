using Microsoft.AspNetCore.SignalR;
using Scrumchum.Models;
using Scrumchum.Models.Request;
using Scrumchum.Models.Response;
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
            try
            {
                // TODO: validate request

                if (_rooms.FirstOrDefault(e => e.RoomCode == request.RoomCode) != null)
                {
                    await Clients.Caller.SendAsync( "Error", new { message = "Room already exists! Try a different room code." } );
                }
                else
                {
                    var room = new Room
                    {
                        RoomCode = request.RoomCode
                    };
                    room.Join( request.User );
                    _rooms.Add( room );

                    await Groups.AddToGroupAsync( Context.ConnectionId, room.RoomCode );

                    await Clients.Caller.SendAsync( "RoomCreated", new RoomCreatedResponse
                    {
                        CreatedAt = DateTime.Now,
                        CreatedBy = request.User,
                        RoomCode = room.RoomCode
                    } );
                }   
            }
            catch (Exception ex)
            {
                // TODO: display error messages that bubble up
                var msg = ex.Message;
                await Clients.Caller.SendAsync( "Error", new { message = "Unable to create room! Please try again." } );
            }
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
