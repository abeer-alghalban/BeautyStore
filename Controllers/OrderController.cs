using BeautyStore.Data;
using BeautyStore.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BeautyStore.Controllers
{
    public class OrderController : Controller
    {
        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }

        // عرض السلة
        public IActionResult Cart()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return RedirectToAction("Login", "Account");

            var cartItems = _context.CartItems
                .Include(c => c.Product)  // ضروري لعرض بيانات المنتج داخل السلة
                .Where(c => c.UserId == userId)
                .ToList();

            return View(cartItems);
        }


        [HttpPost]
        public IActionResult AddToCart(int productId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return RedirectToAction("Login", "Account");

            var existingItem = _context.CartItems
                .FirstOrDefault(c => c.UserId == userId && c.ProductId == productId);

            if (existingItem != null)
            {
                existingItem.Quantity++;
            }
            else
            {
                _context.CartItems.Add(new CartItem
                {
                    UserId = userId,
                    ProductId = productId,
                    Quantity = 1
                });
            }

            _context.SaveChanges();

            return RedirectToAction("Cart");
        }


        // تنفيذ الطلب من السلة
        [HttpPost]
        [HttpPost]
        public IActionResult PlaceOrder()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return RedirectToAction("Login", "Account");

            var user = _context.Users.FirstOrDefault(u => u.Id == userId);
            if (user == null)
                return NotFound("User not found");

            var cartItems = _context.CartItems
                .Include(c => c.Product)
                .Where(c => c.UserId == userId)
                .ToList();

            if (!cartItems.Any())
                return RedirectToAction("Cart");

            var order = new Order
            {
                UserId = userId,
                OrderDate = DateTime.Now,
                Address = user.Address,          // تأكد أن حقل Address موجود في AspNetUsers أو ممدود
                PhoneNumber = user.PhoneNumber,  // تأكد أنه موجود أيضًا
                Email = user.Email,
                OrderItems = cartItems.Select(c => new OrderItem
                {
                    ProductId = c.ProductId,
                    Quantity = c.Quantity,
                    Price = c.Product.Price
                }).ToList()
            };

            _context.Orders.Add(order);
            _context.CartItems.RemoveRange(cartItems); // clear cart after order
            _context.SaveChanges();

            return RedirectToAction("OrderConfirmation");
        }



        public IActionResult AllOrders()
        {
            if (!User.IsInRole("Admin"))
                return Unauthorized();

            var orders = _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .ToList();

            return View(orders);
        }
    }
}
