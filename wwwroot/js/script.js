"use strict";

// Page Home
function toggleMenu() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.toggle("active");
}

function toggleAnswer(question) {
  const faqItem = question.parentElement;
  faqItem.classList.toggle("active");
}

// --------------------------------------------------------------------------

// Page Login & Signup
// التحقق من صحة نموذج التسجيل
document
  .querySelector(".auth-form form")
  .addEventListener("submit", function (event) {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
      alert("كلمة المرور غير متطابقة!");
      event.preventDefault(); // يمنع إرسال النموذج
    }
  });

// --------------------------------------------------------------------------

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

// تفعيل الأزرار
document.addEventListener("DOMContentLoaded", () => {
  // أزرار عرض التفاصيل
  document.querySelectorAll(".details-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const detailsSection =
        this.closest(".product-item").querySelector(".more-details");
      const isHidden = detailsSection.style.display == "none";
      detailsSection.style.display = isHidden ? "block" : "none";
      this.textContent = isHidden ? "إخفاء التفاصيل" : "عرض المزيد";
      // const productName =
      //   this.closest(".product-item").querySelector(
      //     ".product-name"
      //   ).textContent;
      // alert(`عرض تفاصيل: ${productName}`);
    });
  });

  // أزرار الإضافة للسلة
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", function () {
      const productName =
        this.closest(".product-item").querySelector(
          ".product-name"
        ).textContent;
      const price =
        this.closest(".product-item").querySelector(
          ".product-price"
        ).textContent;
      alert(`تمت إضافة ${productName} (${price}) إلى السلة`);
    });
  });
});
