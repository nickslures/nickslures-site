# Product Data Model

A product should eventually have fields like:

```json
{
  "id": "shad-runner-chartreuse",
  "name": "Shad Runner - Chartreuse",
  "slug": "shad-runner-chartreuse",
  "sku": "SR-CH-001",
  "price": 6.99,
  "salePrice": null,
  "shortDescription": "Bright chartreuse lure for stained water.",
  "description": "Longer product description goes here.",
  "category": "soft-plastics",
  "tags": ["bass", "stained-water", "featured"],
  "image": "assets/images/products/shad-runner-chartreuse.jpg",
  "gallery": [],
  "featured": true,
  "status": "active",
  "inventoryStatus": "in-stock",
  "sortOrder": 10,
  "createdAt": "2026-06-18",
  "updatedAt": "2026-06-18"
}
```

## Recommended product statuses

- `draft` — hidden from customers
- `active` — shown on website
- `archived` — kept for records, hidden from catalog

## Recommended inventory statuses

- `in-stock`
- `low-stock`
- `out-of-stock`
- `made-to-order`

This gives you room to grow without redesigning the site later.
