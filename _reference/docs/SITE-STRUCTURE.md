# Site Structure

## Public website

- `index.html`  
  Homepage. Shows hero area, featured products, and category links.

- `products.html`  
  Full product catalog. Can filter by category, featured status, availability, etc.

- `product.html`  
  Single product detail page. Later this can read a product ID from the URL.

- `about.html`  
  Brand/story page.

- `contact.html`  
  Contact form or contact information.

## Admin/operator area

- `admin/index.html`  
  Login screen placeholder.

- `admin/dashboard.html`  
  Admin home screen.

- `admin/products.html`  
  Product list with edit/delete controls.

- `admin/product-edit.html`  
  Add/edit product form. Includes fields for name, price, description, category, featured status, and image path.

## Assets

- `assets/css/`  
  Stylesheets.

- `assets/js/`  
  Browser JavaScript.

- `assets/images/products/`  
  Optimized product images used by the live site.

- `rawImages/`  
  Original large photos before resizing/cropping.

## Data

- `data/products.example.json`  
  Example product records.

- `data/categories.example.json`  
  Example category list.

- `data/site-settings.example.json`  
  Site-wide settings like phone number, homepage copy, and featured limits.

## Future backend

- `api/README.md`  
  Placeholder for future server/API notes.
