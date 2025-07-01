using Microsoft.AspNetCore.Identity;
namespace BeautyStore.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string? Address { get; set; }
        public override string? PhoneNumber { get; set; }
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
