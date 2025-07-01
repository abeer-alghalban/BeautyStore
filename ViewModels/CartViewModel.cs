namespace BeautyStore.ViewModels
{
    public class CartItemViewModel
    {
        public int ProductId { get; set; }
        public string Name { get; set; } // لو بدك تعرض الاسم
        public int Quantity { get; set; } = 1;
        public decimal Price { get; set; }
    }

}
