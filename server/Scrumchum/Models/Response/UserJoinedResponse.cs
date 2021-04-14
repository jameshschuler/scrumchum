using System;
using System.Collections.Generic;

namespace Scrumchum.Models.Response
{
    public class UserJoinedResponse
    {
        public UserJoinedResponse()
        {
            Participants = new List<User>();
        }

        public IEnumerable<User> Participants { get; set; }
    }
}