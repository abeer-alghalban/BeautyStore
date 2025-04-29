using BeautyStore.Data;
using BeautyStore.Models;
using Microsoft.EntityFrameworkCore;

namespace BeautyStore.Seeding
{
    public class ProductSeeder
    {
        public static async Task SeedProducts(ApplicationDbContext context)
        {
            if (!await context.Products.AnyAsync())
            {
                var products = new List<Product>
                {
                    new Product
                    {
                        Name = "كريم الترطيب الفائق",
                        Description = "شامبو طبيعي مناسب لجميع أنواع الشعر",
                        Price = 45.00m,
                        Category = "بشرة",
                        ImageUrl = "Img/كريم ترطيب.jpg"
                    },
                    new Product
                    {
                        Name = "واقي الشمس بعامل حماية",
                        Description = "شامبو طبيعي مناسب لجميع أنواع الشعر",
                        Price = 45.00m,
                        Category = "بشرة",
                        ImageUrl = "Img/واقي شمس.jpg"
                    },
                    new Product
                    {
                        Name = "تونر تجديد البشرة",
                        Description = "شامبو طبيعي مناسب لجميع أنواع الشعر",
                        Price = 45.00m,
                        Category = "بشرة",
                        ImageUrl = "Img/تونر البشرة2.jpg"
                    },
                    new Product
                    {
                        Name = "سيروم فيتامين C للتفتيح",
                        Description = "شامبو طبيعي مناسب لجميع أنواع الشعر",
                        Price = 45.00m,
                        Category = "بشرة",
                        ImageUrl = "Img/سيروم فيتامين.jpg"
                    },
                    new Product
                    {
                        Name = "ماسك الطين المنقي",
                        Description = "شامبو طبيعي مناسب لجميع أنواع الشعر",
                        Price = 45.00m,
                        Category = "بشرة",
                        ImageUrl = "Img/ماسك الطين.jpg"
                    },
                    new Product
                    {
                        Name = "غسول الوجه المنظف العميق",
                        Description = "شامبو طبيعي مناسب لجميع أنواع الشعر",
                        Price = 45.00m,
                        Category = "بشرة",
                        ImageUrl = "Img/غسول الوجه.jpg"
                    },
                    new Product
                    {
                        Name = "إكليل الجبل لتغذية الشعر",
                        Description = "شامبو طبيعي مناسب لجميع أنواع الشعر",
                        Price = 45.00m,
                        Category = "شعر",
                        ImageUrl = "Img/إكليل الجبل.jpg"
                    },
                    new Product
                    {
                        Name = "بلسم ترطيب وتنعيم الشعر",
                        Description = "شامبو طبيعي مناسب لجميع أنواع الشعر",
                        Price = 45.00m,
                        Category = "شعر",
                        ImageUrl = "Img/بلسم للشعر.jpg"
                    },
                    new Product
                    {
                        Name = "زيت الأرغان المغذي",
                        Description = "شامبو طبيعي مناسب لجميع أنواع الشعر",
                        Price = 45.00m,
                        Category = "شعر",
                        ImageUrl = "Img/الأرغان.jpg"
                    },
                    new Product
                    {
                        Name = "سيروم إصلاح الأطراف المتقصفة",
                        Description = "شامبو طبيعي مناسب لجميع أنواع الشعر",
                        Price = 45.00m,
                        Category = "شعر",
                        ImageUrl = "Img/سيروم الأطراف المتقصفة.jpg"
                    },
                    new Product
                    {
                        Name = "بخاخ الحماية من الحرارة",
                        Description = "شامبو طبيعي مناسب لجميع أنواع الشعر",
                        Price = 45.00m,
                        Category = "شعر",
                        ImageUrl = "Img/بخاخ.jpg"
                    },
                    new Product
                    {
                        Name = "ماسك الشعر بالبروتين العميق",
                        Description = "شامبو طبيعي مناسب لجميع أنواع الشعر",
                        Price = 45.00m,
                        Category = "شعر",
                        ImageUrl = "Img/ماسك الشعر.jpg"
                    }
                };

                await context.Products.AddRangeAsync(products);
                await context.SaveChangesAsync();
            }
        }
    }
}
