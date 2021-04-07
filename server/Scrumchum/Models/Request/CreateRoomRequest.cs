using System.ComponentModel.DataAnnotations;

namespace Scrumchum.Models.Request
{
    public class CreateRoomRequest
    {
        [Required]
        public string RoomCode { get; set; }

        [Required]
        public User User { get; set; }

        [Required]
        public int CardsetId { get; set; }
    }
}
