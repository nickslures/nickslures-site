/*
  ProductStore is intentionally isolated.

  Today it reads demo JSON or browser localStorage.
  Later you can change only this file to talk to a real backend/API.
*/

const ProductStore = (() => {
  const LOCAL_KEY = "nicks-lures-products";

  async function loadExampleProducts() {
    const response = await fetch("data/products.example.json");
    if (!response.ok) throw new Error("Could not load example products.");
    return response.json();
  }

  async function getProducts() {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) return JSON.parse(saved);
    return loadExampleProducts();
  }

  async function getProductById(id) {
    const products = await getProducts();
    return products.find((product) => product.id === id || product.slug === id);
  }

  async function saveProducts(products) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(products, null, 2));
    return products;
  }

  async function saveProduct(product) {
    const products = await getProducts();
    const index = products.findIndex((item) => item.id === product.id);

    if (index >= 0) {
      products[index] = { ...products[index], ...product, updatedAt: new Date().toISOString().slice(0, 10) };
    } else {
      products.push({
        ...product,
        createdAt: new Date().toISOString().slice(0, 10),
        updatedAt: new Date().toISOString().slice(0, 10)
      });
    }

    return saveProducts(products);
  }

  async function deleteProduct(id) {
    const products = await getProducts();
    return saveProducts(products.filter((product) => product.id !== id));
  }

  function makeSlug(text) {
    return String(text)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  return {
    getProducts,
    getProductById,
    saveProduct,
    deleteProduct,
    makeSlug
  };
})();
