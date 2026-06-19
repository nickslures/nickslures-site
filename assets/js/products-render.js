async function renderProductGrid(options = {}) {
  const target = document.querySelector(options.target || "[data-product-grid]");
  if (!target) return;

  const products = await ProductStore.getProducts();
  let visibleProducts = products.filter((product) => product.status === "active");

  if (options.featuredOnly) {
    visibleProducts = visibleProducts.filter((product) => product.featured);
  }

  if (options.category) {
    visibleProducts = visibleProducts.filter((product) => product.category === options.category);
  }

  target.innerHTML = visibleProducts.map((product) => `
    <article class="product-card">
      <a href="product.html?id=${encodeURIComponent(product.id)}">
        <img src="${product.image}" alt="${product.name}">
      </a>
      <div class="product-card__body">
        <p class="product-meta">${product.category || "Uncategorized"}</p>
        <h3>${product.name}</h3>
        <p>${product.shortDescription || ""}</p>
        <p class="price">$${Number(product.price).toFixed(2)}</p>
        <a class="button" href="product.html?id=${encodeURIComponent(product.id)}">View Details</a>
      </div>
    </article>
  `).join("");

  if (!visibleProducts.length) {
    target.innerHTML = "<p>No products found yet.</p>";
  }
}

async function renderProductDetail() {
  const target = document.querySelector("[data-product-detail]");
  if (!target) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const product = id ? await ProductStore.getProductById(id) : null;

  if (!product) {
    target.innerHTML = "<p>Product not found.</p>";
    return;
  }

  document.title = `${product.name} | Nick's Lures`;

  target.innerHTML = `
    <div>
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div>
      <p class="product-meta">${product.category || "Uncategorized"}</p>
      <h1>${product.name}</h1>
      <p class="price">$${Number(product.price).toFixed(2)}</p>
      <p>${product.description || product.shortDescription || ""}</p>
      <p><strong>Status:</strong> ${product.inventoryStatus || "in-stock"}</p>
      <a class="button" href="contact.html">Ask About This Lure</a>
    </div>
  `;
}
