﻿//using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace BeautyStore.ViewModels
{
    public class RegisterViewModel
    {
        [Required]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        public string LastName { get; set; } = string.Empty;


        [Required(ErrorMessage = "Email is required")]
        [EmailAddress]
        [Display(Name = "Email")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [StringLength(40, ErrorMessage = "The {0} must be at least {2} charachters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string? password { get; set; }

        [Required(ErrorMessage = "Confitm password is required")]
        [DataType(DataType.Password)]
        [Display(Name = "Confirm Password")]
        [Compare("password", ErrorMessage = "The password and confirmation password do not match!")]
        public string? ConfirmPassword { get; set; }
        
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
    }
}