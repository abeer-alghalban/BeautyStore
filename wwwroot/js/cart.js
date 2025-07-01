"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.querySelector(".cart-items");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // عرض محتوى السلة أول مرة
    renderCartItems();

    // دالة عرض المنتجات في السلة
    function renderCartItems() {
        if (cart.length === 0) {
            cartContainer.innerHTML = `
        <div class="empty-cart-message">
          <p>سلة المشتريات فارغة</p>
          <a href="products.html" class="browse-products">تصفح المنتجات</a>
        </div>
      `;
            document.querySelector(".cart-summary").style.display = "none";
        } else {
            cartContainer.innerHTML = cart
                .map(
                    (item, index) => `
          <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
              <h3 class="cart-item-name">${item.name}</h3>
              <p class="cart-item-price">${item.price.replace(
                        /\D/g,
                        ""
                    )} شيكل</p>
            </div>
            <button class="remove-item" data-index="${index}">إزالة</button>
          </div>
        `
                )
                .join("");

            document.querySelector(".cart-summary").style.display = "block";
            updateCartTotal();
            setupEventListeners();
        }
    }

    /* ------------------------------------------------------------------------------------------- */

    // دالة تحديث المجموع الكلي
    function updateCartTotal() {
        let total = 0;
        cart.forEach((item) => {
            total += parseInt(item.price.replace(/\D/g, ""));
        });
        document.querySelector(".summary-row span:last-child").textContent =
            total + " شيكل";
    }

    /* ------------------------------------------------------------------------------------------- */

    function setupEventListeners() {
        // إزالة عنصر من السلة
        document.querySelectorAll(".remove-item").forEach((btn) => {
            btn.addEventListener("click", function () {
                const index = this.dataset.index;
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCartItems();
            });
        });
    }

    /* ------------------------------------------------------------------------------------------- */

    // زر إلغاء الشراء
    document.querySelector(".cancel-btn")?.addEventListener("click", () => {
        if (confirm("هل أنت متأكد من إلغاء الشراء؟")) {
            cart = [];
            localStorage.removeItem("cart");
            renderCartItems();
        }
    });

    /* ------------------------------------------------------------------------------------------- */

    // زر إتمام الشراء
    document.querySelector(".checkout-btn")?.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("السلة فارغة! أضف منتجات أولاً");
            return;
        }

        if (confirm("هل تريد إتمام عملية الشراء؟")) {
            const cartItemsJson = JSON.stringify(cart);

            fetch("/Order/PlaceOrder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: "cartItemsJson=" + encodeURIComponent(cartItemsJson),
            })
                .then((response) => {
                    if (response.ok) {
                        alert("شكراً لشرائك! سيتم تجهيز طلبك قريباً.");
                        cart = [];
                        localStorage.removeItem("cart");
                        renderCartItems();
                    } else {
                        alert("حدث خطأ أثناء تقديم الطلب.");
                    }
                })
                .catch(() => {
                    alert("تعذر الاتصال بالخادم.");
                });
        }
    });
});
