// BACKEND
const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

// This function will be called when we hit this end point: 
export default async (req, res) => {
    const { items, email } = req.body;

    // 1. Need to reformat our req.body into the format Stripe expects
    // For format, refer to: https://stripe.com/docs/payments/checkout/migrating-prices
    const transformedItems = items.map((item) => ({
        price_data: {
            currency: 'usd',
            // money is in cents so need to convert to cents
            unit_amount: item.price * 100,
            product_data: {
                name: item.title,
                description: item.description,
                // images expect an array...I only have one pic
                images: [item.image]
            },
        },
        quantity: 1,
    }));

    // 2. Create the Stripe checkout session:
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_options: [
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: 0,
                        currency: 'usd',
                    },
                    display_name: 'Free shipping',
                    // Delivers between 5-7 business days
                    delivery_estimate: {
                        minimum: {
                            unit: 'business_day',
                            value: 5,
                        },
                        maximum: {
                            unit: 'business_day',
                            value: 7,
                        },
                    }
                }
            },
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: 1500,
                        currency: 'usd',
                    },
                    display_name: 'Next-Day Delivery',
                    // Delivers in exactly 1 business day, sometimes up to 3 days
                    delivery_estimate: {
                        minimum: {
                            unit: 'business_day',
                            value: 1,
                        },
                        maximum: {
                            unit: 'business_day',
                            value: 3,
                        },
                    }
                }
            },
        ],
        shipping_address_collection: {
            allowed_countries: ['US', 'CA']
        },
        line_items: transformedItems,
        mode: 'payment',
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        // pass in some additional info:
        metadata: {
            email,
            // to simplify what we're sending across the internet
            images: JSON.stringify(items.map(item => item.image))
        }
    });

    // 3. Respond to frontend api call
    res.status(200).json({ id: session.id })
}