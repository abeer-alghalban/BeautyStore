using BeautyStore.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BeautyStore.ViewModels;
using BeautyStore.Models;

namespace BeautyStore.Controllers
{
    public class ProductController : Controller
    {
        private readonly BeautyStore.Models.ApplicationDbContext _context;
        public ProductController(BeautyStore.Models.ApplicationDbContext context)
        {
            _context = context; // هنا كان التعارض، لازم نستخدم _context
        }

        public IActionResult Index()
        {
            var products = _context.Products.ToList(); // استرجاع المنتجات من قاعدة البيانات

            var viewModel = new ProductViewModel
            {
                Products = products
            };

            return View(viewModel); // نرسل الـ ViewModel للواجهة
        }


    }
}
