(function () {
  const store = window.FISH_ON_STORE || { products: [], categories: [] };
  const products = Array.isArray(store.products) ? store.products : [];
  const params = new URLSearchParams(window.location.search);
  const requestedSlug = params.get('product') || window.location.hash.replace('#', '');
  const product = products.find((item) => item.slug === requestedSlug) ||
    products.find((item) => item.status === 'active' && item.heroSpot) ||
    products.find((item) => item.status === 'active');

  const app = document.getElementById('product-app');
  if (!app) return;

  function money(value) {
    return typeof value === 'number'
      ? value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
      : 'Price coming soon';
  }

  function stars(item) {
    const count = Math.max(0, Math.min(5, Math.round(item.rating || 0)));
    if (!count) return 'New product';
    return `${'★'.repeat(count)} ${item.reviewCount ? `<span>(${item.reviewCount})</span>` : ''}`;
  }

  function productUrl(item) {
    return `product.html?product=${encodeURIComponent(item.slug)}`;
  }

  function specRows(specs) {
    if (!specs) return '';
    const rows = Object.entries(specs).map(([key, value]) => {
      const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, (char) => char.toUpperCase());
      const displayValue = Array.isArray(value) ? value.join(', ') : value;
      return `<tr><th>${label}</th><td>${displayValue}</td></tr>`;
    });
    return rows.join('');
  }

  function renderProductNotFound() {
    app.innerHTML = `
      <section class="product-shell">
        <div class="product-copy full-width">
          <p class="eyebrow">Product page</p>
          <h1>Product not found</h1>
          <p>The product slug in the URL does not match the product data. Choose a product below.</p>
          <div class="related-grid">
            ${products.filter((item) => item.status === 'active').map((item) => `<a class="mini-card" href="${productUrl(item)}"><img src="${item.image}" alt="${item.alt || item.name}"><strong>${item.name}</strong></a>`).join('')}
          </div>
        </div>
      </section>
    `;
  }

  if (!product) {
    renderProductNotFound();
    return;
  }

  document.title = `${product.name} | Fish On Nick's Lures`;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.setAttribute('content', product.shortDescription || product.description || product.name);

  const gallery = Array.from(new Set([product.image].concat(product.gallery || []))).filter(Boolean);
  const related = products
    .filter((item) => item.status === 'active' && item.slug !== product.slug && item.categorySlug === product.categorySlug)
    .slice(0, 3);

  app.innerHTML = `
    <section class="product-shell">
      <div class="product-gallery">
        <div class="main-product-image">
          <img id="main-product-image" src="${product.image}" alt="${product.alt || product.name}">
        </div>
        ${gallery.length > 1 ? `<div class="thumb-row">${gallery.map((image, index) => `<button type="button" class="thumb${index === 0 ? ' active' : ''}" data-image="${image}" aria-label="View product image ${index + 1}"><img src="${image}" alt=""></button>`).join('')}</div>` : ''}
      </div>

      <div class="product-copy">
        <p class="eyebrow">${product.categoryName || 'Product'}</p>
        <h1>${product.name}</h1>
        <div class="rating-line">${stars(product)}</div>
        <div class="product-price">${money(product.price)}</div>
        <p class="lead">${product.shortDescription || ''}</p>
        <p>${product.description || ''}</p>

        <div class="product-actions">
          <a class="btn primary" href="mailto:${store.business.email}?subject=Question about ${encodeURIComponent(product.name)}">Ask About This</a>
          <a class="btn secondary" href="index.html#products">Back to Products</a>
        </div>

        <div class="admin-note">
          <strong>Control-panel ready:</strong> this product page is filled from <code>assets/js/products.js</code>. Add another product object there and link to <code>product.html?product=your-slug</code>.
        </div>
      </div>
    </section>

    <section class="details-section">
      <div class="details-grid">
        <div class="spec-card">
          <h2>Product Specs</h2>
          <table>${specRows(product.specs)}</table>
        </div>
        <div class="spec-card">
          <h2>Ordering Notes</h2>
          <p>Prices, review counts, package counts, and exact options are placeholders until Nick confirms them.</p>
          <p>For jig labels, the top row is weight in ounces and the bottom row is hook size. Hook sizes like 1/0 are pronounced “one aught.”</p>
        </div>
      </div>
    </section>

    ${related.length ? `
      <section class="related-section">
        <h2>Related Products</h2>
        <div class="related-grid">
          ${related.map((item) => `<a class="mini-card" href="${productUrl(item)}"><img src="${item.image}" alt="${item.alt || item.name}"><strong>${item.name}</strong><span>${money(item.price)}</span></a>`).join('')}
        </div>
      </section>
    ` : ''}
  `;

  document.querySelectorAll('.thumb').forEach((button) => {
    button.addEventListener('click', () => {
      const mainImage = document.getElementById('main-product-image');
      if (mainImage) mainImage.src = button.dataset.image;
      document.querySelectorAll('.thumb').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
    });
  });
})();
