using System;
using System.Collections.Generic;

namespace Scrumchum.Models.Response
{
    public class JoinedRoomResponse
    {
        public JoinedRoomResponse()
        {

        }

        public DateTime CreatedAt { get; set; }
        public User CreatedBy { get; set; }
        public string RoomCode { get; set; }
    }
}