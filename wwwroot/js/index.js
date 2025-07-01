"use strict";

function toggleMenu() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.toggle("active");
}

function toggleAnswer(question) {
  const faqItem = question.parentElement;
  faqItem.classList.toggle("active");
}
