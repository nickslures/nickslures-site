# Future API / Backend Notes

A real admin panel cannot safely save products using only static HTML.

Later, connect this site to one of these:

## Easiest options

- Shopify or Square Online if you want full checkout, inventory, and payments.
- WordPress + WooCommerce if you want a familiar CMS.
- Decap CMS / Netlify CMS if you want file-based editing.

## Flexible custom options

- Supabase
- Firebase
- Airtable
- A small Node/Express or PHP backend

## Suggested API endpoints later

- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`
- `POST /api/uploads/product-image`

Keep all real passwords, database keys, and admin secrets out of the public files.
