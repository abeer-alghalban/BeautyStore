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
            _context = context; // هنا كان الخطأ، لازم نستخدم _context
        }

        public IActionResult Index(string category = "شعر", string searchQuery = "")
        {
            var products = _context.Products
            .Include(p => p.Category)  // حتى نحمل الفئة مع المنتج
            .Where(p => p.Category.Name == category)
             .ToList();


            if (!string.IsNullOrEmpty(searchQuery))
            {
                products = products.Where(p => p.Name.Contains(searchQuery) || p.Description.Contains(searchQuery)).ToList();
            }

            ViewData["searchQuery"] = searchQuery;
            ViewData["selectedCategory"] = category;

            var viewModel = new ProductViewModel
            {
                Products = products
            };

            return View(viewModel);
        }
        public IActionResult Details(int id)
        {
            var product = _context.Products.FirstOrDefault(p => p.Id == id);
            if (product == null) return NotFound();
            return View(product);
        }
        public IActionResult add()
        {
            // ✅ التحقق من تسجيل الدخول
            if (!User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Login", "Account");
            }

            return View();
        }

    }
}