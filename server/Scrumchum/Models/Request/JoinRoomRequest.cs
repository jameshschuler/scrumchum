using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumchum.Models.Request
{
    public class JoinRoomRequest
    {
        public string RoomCode { get; set; }
        public User User { get; set; }
    }
}
