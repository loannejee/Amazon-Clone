// FYI, you can't use the regular firebase dependency (the firebase config is for the frontend) with the backend NodeJS.
// You need to use the firebase dependency specific for NodeJS.
const { buffer } = require('micro');
import * as admin from 'firebase-admin';


// Secure a connection to FIREBASE from the backend
const serviceAccount = require("../../../permissions.json");
// Initialize if there is an app not initialized else use the existing initialized one
const app = !admin.apps.length ?
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    })
    :
    admin.app()


// Establish connection to Stripe
const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
    console.log('Fulfilling order ~~~', session)
    return app
        .firestore()
        .collection('users')
        .doc(session.metadata.email)
        .collection("orders").doc(session.id).set({
            amount: session.amount_total / 100,
            amount_shipping: session.total_details.amount_shipping / 100,
            images: JSON.parse(session.metadata.images),
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            console.log(`SUCCESS: Order ${session.id} had been added to the DB`);
        });
};


export default async (req, res) => {
    // In traditional express.js app, you use app.post or app.get.
    // But, in Nextjs, to check if the call is post or get, you simply do:
    if (req.method === 'POST') {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers["stripe-signature"];

        let event;

        // Verify that the web EVENT posted came from stripe
        try {
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        } catch (err) {
            console.log('ERROR!!!!', err.message)
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        // If we're able to reach this point, this means the web event is legitimately from stripe. Now we need to handle the checkout.session.completed event
        if (event.type === 'checkout.session.completed') {   // event from line 53
            const session = event.data.object;

            // Fulfill the order
            return fulfillOrder(session)
                .then(() => res.status(200))
                .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`))
        }
    }
}


// For Nextjs, you can configure each endpoint by doing this:
export const config = {
    api: {
        bodyParser: false, // We want the request as a stream rather than object
        externalResolver: true, // This is being resolved by stripe
    }
}