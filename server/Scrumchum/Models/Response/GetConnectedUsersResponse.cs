using System.Collections.Generic;

namespace Scrumchum.Models.Response
{
    public class GetConnectedUsersResponse
    {
        public GetConnectedUsersResponse()
        {
            Participants = new List<User>();
        }

        public IEnumerable<User> Participants { get; set; }
    }
}