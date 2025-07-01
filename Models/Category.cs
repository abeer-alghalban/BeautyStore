using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BeautyStore.Models
{
    public class Category
    {
        public int Id { get; set; }

        [Required]
        public string? Name { get; set; }
        [Required]

        // المنتجات المرتبطة
        public ICollection<Product>? Products { get; set; }
    }


}

