/*
  Fish On Nick's Lures - homepage product renderer
  ---------------------------------------------------------------------------
  Reads assets/js/products.js and fills:
  - #featured-products
  - #home-category-grid
  - #home-hero-product-link / #home-hero-product-image
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

  function productUrl(product) {
    return '/product?product=' + encodeURIComponent(product.slug);
  }

  function imageTag(src, alt) {
    const safeSrc = escapeHtml(src);
    const safeAlt = escapeHtml(alt || 'Fish On Nick\'s Lures product image');
    return `<img src="${safeSrc}" alt="${safeAlt}" loading="lazy" onerror="this.closest('.card-media,.cat')?.classList.add('image-missing'); this.remove();">`;
  }

  function renderFeaturedProducts() {
    const mount = document.getElementById('featured-products');
    if (!mount) return;

    if (!data || !data.getHomepageProducts) {
      mount.innerHTML = '<p class="placeholder-note">Product data could not load. Check assets/js/products.js.</p>';
      return;
    }

    const products = data.getHomepageProducts();
    if (!products.length) {
      mount.innerHTML = '<p class="placeholder-note">No homepage products selected yet. Set homePage.show to true in assets/js/products.js.</p>';
      return;
    }

    mount.innerHTML = products.map((product) => {
      const badge = product.homePage && product.homePage.label ? product.homePage.label : 'Featured';
      return `
        <a class="product-link" href="${escapeHtml(productUrl(product))}">
          <article class="card">
            <div class="card-media">
              ${imageTag(product.mainImage, product.imageAlt)}
            </div>
            <div class="product-card-top">
              <span class="stars" aria-label="Featured product">★ ★ ★ ★ ★</span>
              <span class="spot-badge">${escapeHtml(badge)}</span>
            </div>
            <h3>${escapeHtml(product.name)}</h3>
            <p class="small">${escapeHtml(product.shortDescription || product.categoryLabel || '')}</p>
            <p class="product-meta">${escapeHtml(product.categoryLabel || '')}</p>
            <div class="price">${escapeHtml(product.price || 'Call for price')}</div>
          </article>
        </a>
      `;
    }).join('');
  }

  function renderCategories() {
    const mount = document.getElementById('home-category-grid');
    if (!mount) return;

    if (!data || !Array.isArray(data.categories)) {
      mount.innerHTML = '<p class="placeholder-note">Category data could not load. Check assets/js/products.js.</p>';
      return;
    }

    mount.innerHTML = data.categories.map((category) => `
      <a class="cat" href="${escapeHtml(category.url || 'products.html#' + category.slug)}">
        <img src="${escapeHtml(category.image)}" alt="${escapeHtml(category.name)}" loading="lazy" onerror="this.parentElement.classList.add('image-missing'); this.remove();">
        <h3>${escapeHtml(category.name)}</h3>
        <span class="btn-sm">Shop Now</span>
      </a>
    `).join('');
  }

  function renderHeroProduct() {
    if (!data || !data.getHeroProduct) return;
    const product = data.getHeroProduct();
    if (!product) return;

    const heroLink = document.getElementById('home-hero-product-link');
    const heroImage = document.getElementById('home-hero-product-image');
    const primaryLink = document.getElementById('hero-primary-link');

    if (heroLink) heroLink.href = productUrl(product);
    if (primaryLink) primaryLink.href = productUrl(product);
    if (heroImage) {
      heroImage.src = product.mainImage;
      heroImage.alt = product.imageAlt || product.name;
    }
  }

  function boot() {
    renderHeroProduct();
    renderFeaturedProducts();
    renderCategories();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window, document);
