---
name: sync-products
description: Use this skill whenever the user asks to sync, update, refresh, or check the shop/store/merchandise/products on this site, or mentions adding new products from Printful/the Quick Store. Also trigger it proactively after the user says they've added, uploaded, or synced a new product in the Printful dashboard (mcmgop.printful.me), even if they don't explicitly ask for the site to be updated. The whole point of this skill is that the user should never need to name the product or paste details themselves -- it discovers what's new by comparing the live Quick Store against src/data/products.js and adds whatever it finds.
---

# Syncing the Printful Quick Store into the site

This project's merch section (`src/data/products.js`, rendered by
`src/components/Shop.jsx`) is a static, hand-populated list because the
Quick Store at `https://mcmgop.printful.me/` can't be reached through the
Printful API (Quick Stores are excluded from it entirely -- confirmed by
a direct 403 "Quick stores cannot use the API" response). So the only way
to know what's actually for sale is to look at the live storefront, the
same way a customer would.

## Step 1: List what's currently live on the store

Navigate the browser to `https://mcmgop.printful.me/` and read the product
grid. Each product tile has a name and links to a detail page at
`https://mcmgop.printful.me/product/<slug>`. Collect every product's name
and detail-page URL.

## Step 2: Diff against what the site already has

Read `src/data/products.js`. Each existing entry has a `buyUrl` pointing
at one of these detail pages -- that's the reliable key to match on
(names can be edited slightly; the URL slug won't change for the same
product). Any store product whose detail-page URL isn't already someone's
`buyUrl` in the file is new and needs to be added.

If nothing is new, say so and stop -- don't re-fetch or re-write products
that are already represented.

## Step 3: Pull the details for each new product

For each new product, navigate to its detail page and extract:

- **Name** (page heading)
- **Price** (shown as e.g. `$55.00` -- convert to integer cents for
  `priceCents`, e.g. `5500`)
- **Description** (the "About product" text)
- **Colors**, if the product has color swatches
- **Image URLs** -- use the javascript_tool to read `img` tags whose
  `src` is on `cdn.printful.me`, and prefer the larger `w339`/`__825`
  variant over the thumbnail-sized ones if both appear

## Step 4: Download the real product images

`cdn.printful.me` sits behind Cloudflare bot protection -- a plain
`curl`/`Invoke-WebRequest` will silently save the "Just a moment..."
challenge page instead of the image (still `200 OK`, just wrong content,
usually only a few KB). Fetch from the browser tab that's already on the
Quick Store instead, since it already has clearance:

```js
(async () => {
  async function toHex(url) {
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    const bytes = new Uint8Array(buf);
    let hex = '';
    for (let i = 0; i < bytes.length; i++) hex += bytes[i].toString(16).padStart(2, '0');
    return hex;
  }
  const a = await toHex("<image url 1>");
  const b = await toHex("<image url 2>");
  return "A|" + a + "|AEND|B|" + b + "|BEND";
})()
```

**Do not copy the returned hex string into a Write call by hand.** Long
hex/base64 strings silently lose characters when retyped -- this has
happened before and corrupted an image with no error until it failed to
open. Fetch all of a product's images together in one call (as above) so
the combined result is large enough that the harness auto-saves it to a
`tool-results/*.txt` file instead of inlining it, then decode straight
from that file with the bundled script:

```bash
python scripts/decode_payload.py <tool-result-file> \
  --marker A:src/assets/images/product-<slug>-1.webp \
  --marker B:src/assets/images/product-<slug>-2.webp
```

If a product only has one image and the fetch result comes back inline
(too small to trigger auto-save), don't retype it either -- re-run the
fetch bundled with something else (even a second request for the same
image) so the combined output crosses the auto-save threshold.

After decoding, read each saved image file back to confirm it's actually
a valid image and not a leftover challenge page or a stale file from an
earlier failed attempt at the same path.

## Step 5: Add the product to `products.js`

Append a new object to the `products` array, matching the shape of the
existing entries:

```js
{
  id: "<slug>",
  name: "<name>",
  description: "<description>",
  priceCents: <price in cents>,
  colors: ["<color>", ...],   // omit if the product has no color options
  buyUrl: "https://mcmgop.printful.me/product/<slug>",
  images: ["product-<slug>-1", "product-<slug>-2"],  // filenames without extension, matching imageFor() in Shop.jsx
}
```

## Step 6: Verify

Start (or reuse) the dev server, load `/shop`, and confirm the new
product renders with its real photo, price, and a working "Buy Now" link
before considering the sync done.

## Step 7: Report

Summarize what was added (or confirm nothing was new). Leave committing
the changes to the user's normal workflow unless they've already
established that you should commit/push automatically in this project.
