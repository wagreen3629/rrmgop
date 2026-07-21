import Stripe from "stripe";
import { products } from "../../src/data/products.js";

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  const product = products.find((p) => p.id === body.productId);
  if (!product) {
    return new Response("Unknown product", { status: 400 });
  }
  if (!product.printfulVariantId) {
    return new Response("Product is not yet available for purchase", { status: 409 });
  }

  const origin = req.headers.get("origin") || process.env.URL;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: product.priceCents,
            product_data: { name: product.name },
          },
          quantity: 1,
        },
      ],
      shipping_address_collection: { allowed_countries: ["US"] },
      metadata: {
        productId: product.id,
        printfulVariantId: String(product.printfulVariantId),
      },
      success_url: `${origin}/#shop?checkout=success`,
      cancel_url: `${origin}/#shop?checkout=cancelled`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Stripe checkout session creation failed", err);
    return new Response(JSON.stringify({ error: "Could not start checkout" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
