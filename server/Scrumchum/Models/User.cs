namespace Scrumchum.Models
{
    public class User
    {
        public string Name { get; set; }
        public UserType UserType { get; set; }
        public string UserTypeDisplay { get { return UserType.GetName( this.UserType ); } }
    }
}
