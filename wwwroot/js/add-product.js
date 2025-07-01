"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // التحقق مما إذا كانت في وضع التعديل
  const urlParams = new URLSearchParams(window.location.search);
  const editId = urlParams.get("edit");

  if (editId) {
    // إذا كانت في وضع التعديل، قم بتحميل بيانات المنتج
    loadProductForEdit(editId);
  }

  // إعداد معاينة الصورة
  setupImagePreview();

  // إعداد حدث النموذج
  document
    .getElementById("product-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      if (editId) {
        updateProduct(editId);
      } else {
        saveProduct();
      }
    });
});

// ---------------------------------------------------------------------------------

function loadProductForEdit(productId) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const product = products.find((p) => p.id === productId);

  if (product) {
    // تحديث عنوان الصفحة
    document.getElementById("page-title").textContent = "تعديل المنتج";

    // تعبئة النموذج ببيانات المنتج
    document.getElementById("product-name").value = product.name;
    document.getElementById("product-price").value = product.price;
    document.getElementById("product-category").value = product.category;
    document.getElementById("product-description").value =
      product.description || "";

    // عرض صورة المنتج إذا كانت موجودة
    const imagePreview = document.getElementById("image-preview");
    imagePreview.innerHTML = `<img src="${product.image}" class="preview-image">`;
    document.querySelector(".preview-image").style.display = "block";
  }
}

function setupImagePreview() {
  const imageInput = document.getElementById("product-image");
  const imagePreview = document.getElementById("image-preview");

  imageInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        imagePreview.innerHTML = `
          <img src="${e.target.result}" class="preview-image">
          <button type="button" class="remove-image-btn" onclick="removeImage()">
            <i class="fas fa-times"></i>
          </button>
        `;
        document.querySelector(".preview-image").style.display = "block";
        document.querySelector(".remove-image-btn").style.display = "flex";
      };

      reader.readAsDataURL(file);
    }
  });
}

function removeImage() {
  const imageInput = document.getElementById("product-image");
  const imagePreview = document.getElementById("image-preview");

  imageInput.value = "";
  imagePreview.innerHTML = `
    <i class="fas fa-image preview-icon"></i>
    <p>سيظهر معاينة الصورة هنا</p>
  `;
}

// ---------------------------------------------------------------------------------

function saveProduct() {
  const name = document.getElementById("product-name").value;
  const price = document.getElementById("product-price").value;
  const category = document.getElementById("product-category").value;
  const description = document.getElementById("product-description").value;
  const imageInput = document.getElementById("product-image");

  // التحقق من وجود صورة
  if (imageInput.files.length === 0) {
    alert("الرجاء اختيار صورة للمنتج");
    return;
  }

  // قراءة الصورة كـ base64
  const reader = new FileReader();
  reader.onload = function (e) {
    const newProduct = {
      id: Date.now().toString(),
      name,
      price,
      category,
      description,
      image: e.target.result,
    };

    // ---------------------------------------------------------------------------------

    // حفظ المنتج الجديد في localStorage فقط
    let savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    savedProducts.push(newProduct);
    localStorage.setItem("products", JSON.stringify(savedProducts));

    alert("تم حفظ المنتج بنجاح!");
    window.location.href = "admin.html";
  };

  reader.readAsDataURL(imageInput.files[0]);
}

// ---------------------------------------------------------------------------------

function updateProduct(productId) {
  const name = document.getElementById("product-name").value;
  const price = document.getElementById("product-price").value;
  const category = document.getElementById("product-category").value;
  const description = document.getElementById("product-description").value;
  const imageInput = document.getElementById("product-image");

  let products = JSON.parse(localStorage.getItem("products")) || [];
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    alert("المنتج غير موجود");
    return;
  }

  // ---------------------------------------------------------------------------------

  // إذا لم يتم تغيير الصورة، استخدم الصورة القديمة
  if (imageInput.files.length === 0) {
    const updatedProduct = {
      ...products[productIndex],
      name,
      price,
      category,
      description,
    };

    products[productIndex] = updatedProduct;
    localStorage.setItem("products", JSON.stringify(products));

    alert("تم تحديث المنتج بنجاح!");
    window.location.href = "admin.html";
  } else {
    // إذا تم تغيير الصورة، قراءة الصورة الجديدة
    const reader = new FileReader();
    reader.onload = function (e) {
      const updatedProduct = {
        ...products[productIndex],
        name,
        price,
        category,
        description,
        image: e.target.result,
      };

      products[productIndex] = updatedProduct;
      localStorage.setItem("products", JSON.stringify(products));

      alert("تم تحديث المنتج بنجاح!");
      window.location.href = "admin.html";
    };

    reader.readAsDataURL(imageInput.files[0]);
  }
}

// ---------------------------------------------------------------------------------

function cancelForm() {
  if (confirm("هل تريد إلغاء التغييرات؟")) {
    window.location.href = "admin.html";
  }
}
