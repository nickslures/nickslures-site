document.addEventListener("DOMContentLoaded", () => {
  const featuredGrid = document.querySelector("[data-featured-products]");
  if (featuredGrid) {
    renderProductGrid({ target: "[data-featured-products]", featuredOnly: true });
  }

  const catalogGrid = document.querySelector("[data-product-grid]");
  if (catalogGrid) {
    renderProductGrid({ target: "[data-product-grid]" });
  }

  const detail = document.querySelector("[data-product-detail]");
  if (detail) {
    renderProductDetail();
  }
});
