async function renderAdminProducts() {
  const target = document.querySelector("[data-admin-products]");
  if (!target) return;

  const products = await ProductStore.getProducts();

  target.innerHTML = `
    <table class="admin-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Featured</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${products.map((product) => `
          <tr>
            <td>${product.name}</td>
            <td>${product.category || ""}</td>
            <td>$${Number(product.price).toFixed(2)}</td>
            <td>${product.featured ? "Yes" : "No"}</td>
            <td>${product.status || "draft"}</td>
            <td>
              <a href="product-edit.html?id=${encodeURIComponent(product.id)}">Edit</a>
              |
              <button data-delete-product="${product.id}">Delete</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

async function setupProductEditor() {
  const form = document.querySelector("[data-product-form]");
  if (!form) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const existing = id ? await ProductStore.getProductById(id) : null;

  if (existing) {
    form.elements.name.value = existing.name || "";
    form.elements.sku.value = existing.sku || "";
    form.elements.price.value = existing.price || "";
    form.elements.shortDescription.value = existing.shortDescription || "";
    form.elements.description.value = existing.description || "";
    form.elements.category.value = existing.category || "";
    form.elements.image.value = existing.image || "";
    form.elements.featured.value = existing.featured ? "true" : "false";
    form.elements.status.value = existing.status || "draft";
    form.elements.inventoryStatus.value = existing.inventoryStatus || "in-stock";
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = form.elements.name.value.trim();
    const productId = existing?.id || ProductStore.makeSlug(name);

    const product = {
      id: productId,
      name,
      slug: ProductStore.makeSlug(name),
      sku: form.elements.sku.value.trim(),
      price: Number(form.elements.price.value || 0),
      shortDescription: form.elements.shortDescription.value.trim(),
      description: form.elements.description.value.trim(),
      category: form.elements.category.value,
      image: form.elements.image.value.trim() || "assets/images/products/placeholder-product.svg",
      featured: form.elements.featured.value === "true",
      status: form.elements.status.value,
      inventoryStatus: form.elements.inventoryStatus.value,
      tags: [],
      gallery: []
    };

    await ProductStore.saveProduct(product);
    window.location.href = "products.html";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.matches("[data-admin-page]")) {
    AdminAuth.requireLogin();
  }

  renderAdminProducts();
  setupProductEditor();
});

document.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-delete-product]");
  if (!button) return;

  const id = button.getAttribute("data-delete-product");
  const ok = confirm("Delete this product? This demo deletion only affects this browser.");
  if (!ok) return;

  await ProductStore.deleteProduct(id);
  renderAdminProducts();
});
