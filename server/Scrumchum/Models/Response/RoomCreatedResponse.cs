using System;
using System.Collections.Generic;

namespace Scrumchum.Models.Response
{
    public class RoomCreatedResponse
    {
        public RoomCreatedResponse( )
        {
            Participants = new List<User>( );
        }

        public DateTime CreatedAt { get; set; }
        public User CreatedBy { get; set; }
        public string RoomCode { get; set; }
        public IEnumerable<User> Participants { get; set; }
    }
}
