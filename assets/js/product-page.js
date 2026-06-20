/*
  Fish On Nick's Lures - reusable product detail page renderer
  ---------------------------------------------------------------------------
  URL pattern:
    /product?product=paddle-tail-swim-bait-chartreuse
*/
(function (window, document) {
  'use strict';

  const data = window.NICKS_LURES_DATA;

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function getRequestedSlug() {
    const params = new URLSearchParams(window.location.search);
    return params.get('product') || '';
  }

  function renderSpecs(specs) {
    if (!specs || typeof specs !== 'object') return '';
    return Object.entries(specs).map(([label, value]) => `
      <div class="spec-row">
        <dt>${escapeHtml(label)}</dt>
        <dd>${escapeHtml(value)}</dd>
      </div>
    `).join('');
  }

  function productUrl(product) {
    return '/product?product=' + encodeURIComponent(product.slug);
  }

  function renderRelatedProducts(currentProduct) {
    const mount = document.getElementById('related-products');
    if (!mount || !data || !Array.isArray(data.products)) return;
    const related = data.products
      .filter((product) => product.slug !== currentProduct.slug && product.status !== 'draft')
      .slice(0, 4);

    mount.innerHTML = related.map((product) => `
      <a class="related-card" href="${escapeHtml(productUrl(product))}">
        <div class="related-img">
          <img src="${escapeHtml(product.mainImage)}" alt="${escapeHtml(product.imageAlt || product.name)}" loading="lazy" onerror="this.parentElement.classList.add('image-missing'); this.remove();">
        </div>
        <strong>${escapeHtml(product.name)}</strong>
        <span>${escapeHtml(product.price || 'Call for price')}</span>
      </a>
    `).join('');
  }

  function renderNotFound() {
    const mount = document.getElementById('product-detail');
    if (!mount) return;
    const products = data && Array.isArray(data.products) ? data.products : [];
    mount.innerHTML = `
      <section class="not-found-panel">
        <p class="eyebrow">Product Not Found</p>
        <h1>We could not find that lure.</h1>
        <p>The product URL may be missing or the product slug may not exist in <code>assets/js/products.js</code>.</p>
        <div class="actions">
          <a class="btn primary" href="index.html#products">View Featured Products</a>
          <a class="btn secondary dark" href="products.html">Back to Catalog</a>
        </div>
        ${products.length ? '<h2>Available product slugs</h2><ul class="slug-list">' + products.map((product) => `<li><a href="${escapeHtml(productUrl(product))}">${escapeHtml(product.slug)}</a></li>`).join('') + '</ul>' : ''}
      </section>
    `;
  }

  function renderProduct(product) {
    const mount = document.getElementById('product-detail');
    if (!mount) return;

    document.title = `${product.name} | Fish On Nick's Lures`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute('content', product.shortDescription || product.description || product.name);

    mount.innerHTML = `
      <section class="product-shell">
        <div class="product-gallery">
          <div class="main-product-image">
            <img src="${escapeHtml(product.mainImage)}" alt="${escapeHtml(product.imageAlt || product.name)}" onerror="this.parentElement.classList.add('image-missing'); this.remove();">
          </div>
          <p class="image-note">Product photos and exact specs should be reviewed by Nick before launch.</p>
        </div>
        <div class="product-copy">
          <p class="eyebrow">${escapeHtml(product.categoryLabel || 'Fish On Nick\'s Lures')}</p>
          <h1>${escapeHtml(product.name)}</h1>
          <p class="lead">${escapeHtml(product.shortDescription || '')}</p>
          <div class="product-price">${escapeHtml(product.price || 'Call for price')}</div>
          <p>${escapeHtml(product.description || '')}</p>
          <div class="buy-box">
            <a class="btn primary" href="tel:17025103365">Call to Order</a>
            <a class="btn secondary dark" href="mailto:info@nickslures.com?subject=${encodeURIComponent('Question about ' + product.name)}">Email About This Product</a>
          </div>
          <p class="fine-print">Pricing, pack count, ratings, inventory, weights, and hook sizes are placeholders until confirmed.</p>
        </div>
      </section>
      <section class="specs-section">
        <h2>Product Details</h2>
        <dl class="spec-grid">${renderSpecs(product.specs)}</dl>
      </section>
      <section class="related-section">
        <h2>More From Fish On Nick's Lures</h2>
        <div class="related-grid" id="related-products"></div>
      </section>
    `;
    renderRelatedProducts(product);
  }

  function boot() {
    if (!data || !data.getProductBySlug) {
      renderNotFound();
      return;
    }
    const slug = getRequestedSlug();
    const product = data.getProductBySlug(slug) || (data.getHeroProduct && data.getHeroProduct());
    if (!product) {
      renderNotFound();
      return;
    }
    renderProduct(product);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window, document);
