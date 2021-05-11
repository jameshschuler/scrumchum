using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumchum.Models
{
    public class Room
    {
        private IList<User> _users;

        public string RoomCode { get; set; }
        public IEnumerable<User> Users { get { return _users; } }

        public Room()
        {
            _users = new List<User>();
        }

        public void Join(User user)
        {
            if (_users.FirstOrDefault(e => e.Name == user.Name) != null)
            {
                // TODO: throw error
                return;
            }

            _users.Add(user);
        }

        public void Leave(string name)
        {
            var user = _users.FirstOrDefault(e => e.Name == name);
            if (user != null)
            {
                _users.Remove(user);
            }
        }
    }
}
