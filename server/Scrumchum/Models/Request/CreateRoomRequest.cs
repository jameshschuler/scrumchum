namespace Scrumchum.Models.Request
{
    public class CreateRoomRequest
    {
        public string RoomCode { get; set; }
        public User CreatedBy { get; set; }
        public int? CardsetId { get; set; }
    }
}
