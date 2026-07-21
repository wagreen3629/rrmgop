import Stripe from "stripe";

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const signature = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Stripe webhook signature verification failed", err);
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      await createPrintfulOrder(session);
    } catch (err) {
      console.error("Printful order creation failed", err);
      // Return 200 so Stripe doesn't endlessly retry a fulfillment failure that
      // needs manual investigation; the error above is what to check in logs.
      return new Response(JSON.stringify({ received: true, fulfillmentError: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

async function createPrintfulOrder(session) {
  const shipping = session.shipping_details;
  if (!shipping) {
    throw new Error(`No shipping details on session ${session.id}`);
  }

  const order = {
    recipient: {
      name: shipping.name,
      address1: shipping.address.line1,
      address2: shipping.address.line2 || "",
      city: shipping.address.city,
      state_code: shipping.address.state,
      country_code: shipping.address.country,
      zip: shipping.address.postal_code,
      email: session.customer_details?.email,
    },
    items: [
      {
        variant_id: Number(session.metadata.printfulVariantId),
        quantity: 1,
      },
    ],
    external_id: session.id,
  };

  const res = await fetch("https://api.printful.com/orders", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Printful API error ${res.status}: ${text}`);
  }

  return res.json();
}
