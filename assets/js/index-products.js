(function () {
  const store = window.FISH_ON_STORE || { products: [], categories: [] };
  const products = Array.isArray(store.products) ? store.products : [];
  const categories = Array.isArray(store.categories) ? store.categories : [];

  function money(value) {
    return typeof value === 'number'
      ? value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
      : 'Price coming soon';
  }

  function stars(product) {
    const count = Math.max(0, Math.min(5, Math.round(product.rating || 0)));
    const starText = count ? '★'.repeat(count) : 'New';
    const reviewText = product.reviewCount ? ` <span class="small">(${product.reviewCount})</span>` : '';
    return `${starText}${reviewText}`;
  }

  function productUrl(product) {
    return `product.html?product=${encodeURIComponent(product.slug)}`;
  }

  function activeProducts() {
    return products.filter((product) => product.status === 'active');
  }

  function renderHeroSpot() {
    const heroProduct = activeProducts().find((product) => product.heroSpot) ||
      activeProducts().find((product) => product.homePage && product.homePage.show);
    if (!heroProduct) return;

    const heroLink = document.getElementById('home-hero-product-link');
    const heroImg = document.getElementById('home-hero-product-image');
    const primaryLink = document.getElementById('hero-primary-link');

    if (heroLink) {
      heroLink.href = productUrl(heroProduct);
      heroLink.setAttribute('aria-label', `View ${heroProduct.name}`);
      heroLink.dataset.productSlug = heroProduct.slug;
    }

    if (heroImg) {
      heroImg.src = heroProduct.image;
      heroImg.alt = heroProduct.alt || heroProduct.name;
    }

    if (primaryLink) {
      primaryLink.href = productUrl(heroProduct);
    }
  }

  function renderFeaturedProducts() {
    const grid = document.getElementById('featured-products');
    if (!grid) return;

    const featured = activeProducts()
      .filter((product) => product.homePage && product.homePage.show)
      .sort((a, b) => (a.homePage.order || 999) - (b.homePage.order || 999));

    if (!featured.length) {
      grid.innerHTML = '<div class="placeholder-note">No homepage products are selected yet. Set <strong>homePage.show</strong> to true in <code>assets/js/products.js</code>.</div>';
      return;
    }

    grid.innerHTML = featured.map((product) => `
      <a class="product-link" href="${productUrl(product)}" data-homepage-slot="${product.homePage.order || ''}" data-product-slug="${product.slug}">
        <article class="card">
          <div class="card-media"><img src="${product.image}" alt="${product.alt || product.name}" loading="lazy"></div>
          <div class="product-card-top">
            <span class="spot-badge">${product.homePage.label || 'Featured'}</span>
            <span class="small">Spot ${product.homePage.order || ''}</span>
          </div>
          <h3>${product.name}</h3>
          <div class="product-meta">${product.categoryName || ''}</div>
          <div class="stars">${stars(product)}</div>
          <div class="price">${money(product.price)}</div>
        </article>
      </a>
    `).join('');
  }

  function renderCategories() {
    const grid = document.getElementById('home-category-grid');
    if (!grid) return;

    grid.innerHTML = categories.map((category) => {
      const href = category.comingSoon || !category.featuredProductSlug
        ? '#contact'
        : `product.html?product=${encodeURIComponent(category.featuredProductSlug)}`;
      return `
        <a class="cat" href="${href}" data-category="${category.slug}">
          <img src="${category.image}" alt="${category.alt || category.name}" loading="lazy">
          <h3>${category.name.replace(' & ', ' &amp;<br>')}</h3>
          <span class="btn-sm">${category.buttonText || 'Shop Now'}</span>
        </a>
      `;
    }).join('');
  }

  renderHeroSpot();
  renderFeaturedProducts();
  renderCategories();
})();
