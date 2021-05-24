using System;
using System.Collections.Generic;

namespace Scrumchum.Models.Response
{
    public class RoomUpdatedResponse
    {
        public RoomUpdatedResponse()
        {
            Participants = new List<User>();
        }

        public IEnumerable<User> Participants { get; set; }
    }
}