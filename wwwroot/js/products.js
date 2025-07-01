"use strict";

// وظيفة لإضافة المنتجات المحفوظة إلى الصفحة
function loadSavedProducts() {
  const savedProducts = JSON.parse(localStorage.getItem("products")) || [];

  savedProducts.forEach((product) => {
    const productHtml = `
      <article class="product-item" data-id="${product.id}">
        <img src="${product.image}" alt="${product.name}" class="product-img">
        <div class="product-details">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">${product.price} شيكل</p>
          <div class="product-actions">
            <button class="details-btn">عرض المزيد</button>
            <button class="add-to-cart">إضافة للسلة</button>
          </div>
        </div>
      </article>
    `;

    if (product.category === "skin") {
      document
        .getElementById("skin-section")
        .insertAdjacentHTML("beforeend", productHtml);
    } else {
      document
        .getElementById("hair-section")
        .insertAdjacentHTML("beforeend", productHtml);
    }
  });

  // إعادة ربط الأحداث للمنتجات الجديدة
  bindProductEvents();
}

// ---------------------------------------------------------------------------------

// وظيفة البحث
function searchProducts() {
  const term = document.getElementById("searchInput").value.toLowerCase();
  const activeSection = document.querySelector(
    '.product-category:not([style*="display: none"])'
  );

  if (activeSection) {
    const products = activeSection.querySelectorAll(".product-item");
    products.forEach((product) => {
      const name = product
        .querySelector(".product-name")
        .textContent.toLowerCase();
      product.style.display = name.includes(term) ? "block" : "none";
    });
  }
}

// ---------------------------------------------------------------------------------

// تبديل بين الفئات
function showCategory(category, event) {
  // إخفاء جميع الأقسام
  document.querySelectorAll(".product-category").forEach((section) => {
    section.style.display = "none";
  });

  // إظهار القسم المحدد
  document.getElementById(`${category}-section`).style.display = "grid";

  // تحديث الأزرار النشطة
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");
}

// ---------------------------------------------------------------------------------

// ربط أحداث المنتجات
function bindProductEvents() {
  // أزرار عرض التفاصيل
  document.querySelectorAll(".details-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const detailsSection =
        this.closest(".product-item").querySelector(".more-details");
      const isHidden = detailsSection.style.display == "none";
      detailsSection.style.display = isHidden ? "block" : "none";
      this.textContent = isHidden ? "إخفاء التفاصيل" : "عرض المزيد";
    });
  });

  // ---------------------------------------------------------------------------------

  // أزرار الإضافة للسلة
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", function () {
      const productItem = this.closest(".product-item, .product-item2");
      if (!productItem) {
        console.error("لم يتم العثور على عنصر المنتج");
        return;
      }
      const product = {
        id: productItem.dataset.id,
        name: productItem.querySelector(".product-name").textContent,
        price: productItem.querySelector(".product-price").textContent,
        image: productItem.querySelector("img").src,
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));

      alert(`تمت إضافة ${product.name} إلى السلة`);
    });
  });
}

// ---------------------------------------------------------------------------------

// تحميل المنتجات المحفوظة عند بدء الصفحة
document.addEventListener("DOMContentLoaded", () => {
  loadSavedProducts();

  // عرض قسم البشرة افتراضياً
  document.getElementById("skin-section").style.display = "grid";
  document.querySelector(".tab-btn").classList.add("active");
});
