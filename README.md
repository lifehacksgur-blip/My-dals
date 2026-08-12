# DealDhamaka Production v4

## Included
- index.html
- admin.html
- api/product-preview.js
- vercel.json

## What changed
The Admin Auto Product Import is now connected to a real server-side endpoint.

Flow:
1. Paste affiliate/product URL in Admin.
2. Click Analyze Link.
3. Server follows the URL.
4. It extracts JSON-LD Product + Open Graph metadata.
5. Admin preview shows title, description, price, rating, reviews, image, brand and store.
6. Click Use Imported Data.
7. Verify the fields and save the product.

## Deploy
Recommended: Vercel.

Upload this folder/repository to Vercel. The endpoint will be available at:
`/api/product-preview?url=ENCODED_PRODUCT_URL`

No API key is required for the basic metadata parser.

## Important marketplace limitation
This does not bypass CAPTCHA, login, anti-bot systems or JavaScript-only product rendering.
When a marketplace blocks server requests, the admin correctly reports that metadata could not be fetched instead of inventing values.

For Amazon/Flipkart/etc. API-level reliability, use their official affiliate/product advertising APIs where your account has access.

## Security
- Only configured marketplace/affiliate domains are accepted.
- Redirects are re-checked against the allowlist.
- Request timeout is 10 seconds.
- Large HTML responses are rejected.
- No marketplace credentials are stored in the frontend.
