using BeautyStore.Data;
using BeautyStore.Models;
using Microsoft.EntityFrameworkCore;

namespace BeautyStore.Seeding
{
    public class ProductSeeder
    {
        public static async Task SeedProducts(ApplicationDbContext context)
        {
            // أولاً، نضيف الفئات إن لم تكن موجودة
            if (!await context.Categories.AnyAsync())
            {
                var skinCategory = new Category { Name = "بشرة" };
                var hairCategory = new Category { Name = "شعر" };

                context.Categories.AddRange(skinCategory, hairCategory);
                await context.SaveChangesAsync(); // لحفظ الفئات وأخذ الـ ID
            }

            // نحصل على الفئات من القاعدة
            var skin = await context.Categories.FirstOrDefaultAsync(c => c.Name == "بشرة");
            var hair = await context.Categories.FirstOrDefaultAsync(c => c.Name == "شعر");

            if (!await context.Products.AnyAsync())
            {
                var products = new List<Product>
                {
                    new Product
                    {
                        Name = "كريم الترطيب الفائق",
                        Description = "شامبو طبيعي مناسب لجميع أنواع الشعر",
                        Price = 45.00m,
                        ImageUrl = "Img/كريم ترطيب.jpg",
                        CategoryId = skin.Id
                    },
                    new Product
                    {
                        Name = "واقي الشمس بعامل حماية",
                        Description = "شامبو طبيعي مناسب لجميع أنواع الشعر",
                        Price = 45.00m,
                        ImageUrl = "Img/واقي شمس.jpg",
                        CategoryId = skin.Id
                    },
                    new Product
                    {
                        Name = "تونر تجديد البشرة",
                        Description = "شامبو طبيعي مناسب لجميع أنواع الشعر",
                        Price = 45.00m,
                        ImageUrl = "Img/تونر البشرة2.jpg",
                        CategoryId = skin.Id
                    },
                    new Product
                    {
                        Name = "سيروم فيتامين C للتفتيح",
                        Description = "شامبو طبيعي مناسب لجميع أنواع الشعر",
                        Price = 45.00m,
                        ImageUrl = "Img/سيروم فيتامين.jpg",
                        CategoryId = skin.Id
                    },
                    new Product
                    {
                        Name = "ماسك الطين المنقي",
                        Description = "شامبو طبيعي مناسب لجميع أنواع الشعر",
                        Price = 45.00m,
                        ImageUrl = "Img/ماسك الطين.jpg",
                        CategoryId = skin.Id
                    },
                    new Product
                    {
                        Name = "غسول الوجه المنظف العميق",
                        Description = "شامبو طبيعي مناسب لجميع أنواع الشعر",
                        Price = 45.00m,
                        ImageUrl = "Img/غسول الوجه.jpg",
                        CategoryId = skin.Id
                    },
                    new Product
                    {
                        Name = "إكليل الجبل لتغذية الشعر",
                        Description = "شامبو طبيعي مناسب لجميع أنواع الشعر",
                        Price = 45.00m,
                        ImageUrl = "Img/إكليل الجبل.jpg",
                        CategoryId = hair.Id
                    },
                    new Product
                    {
                        Name = "بلسم ترطيب وتنعيم الشعر",
                        Description = "شامبو طبيعي مناسب لجميع أنواع الشعر",
                        Price = 45.00m,
                        ImageUrl = "Img/بلسم للشعر.jpg",
                        CategoryId = hair.Id
                    },
                    new Product
                    {
                        Name = "زيت الأرغان المغذي",
                        Description = "شامبو طبيعي مناسب لجميع أنواع الشعر",
                        Price = 45.00m,
                        ImageUrl = "Img/الأرغان.jpg",
                        CategoryId = hair.Id
                    },
                    new Product
                    {
                        Name = "سيروم إصلاح الأطراف المتقصفة",
                        Description = "شامبو طبيعي مناسب لجميع أنواع الشعر",
                        Price = 45.00m,
                        ImageUrl = "Img/سيروم الأطراف المتقصفة.jpg",
                        CategoryId = hair.Id
                    },
                    new Product
                    {
                        Name = "بخاخ الحماية من الحرارة",
                        Description = "شامبو طبيعي مناسب لجميع أنواع الشعر",
                        Price = 45.00m,
                        ImageUrl = "Img/بخاخ.jpg",
                        CategoryId = hair.Id
                    },
                    new Product
                    {
                        Name = "ماسك الشعر بالبروتين العميق",
                        Description = "شامبو طبيعي مناسب لجميع أنواع الشعر",
                        Price = 45.00m,
                        ImageUrl = "Img/ماسك الشعر.jpg",
                        CategoryId = hair.Id
                    }
                };

                await context.Products.AddRangeAsync(products);
                await context.SaveChangesAsync();
            }
        }
    }
}
