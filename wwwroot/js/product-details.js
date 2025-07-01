"use strict";

// زر الإضافة للسلة في صفحة التفاصيل
document.querySelector(".add-to-cart").addEventListener("click", function () {
  const product = {
    id:
      window.location.pathname.split("/").pop().replace(".html", "") ||
      Date.now(),
    name: document.querySelector(".product-detail-info h1").textContent,
    price: document.querySelector(".price").textContent.replace(/\D/g, ""),
    image: document.querySelector(".product-detail-img").src,
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));

  alert(`تمت إضافة ${product.name} إلى السلة`);
});
