import React from 'react';
import Header from '../components/Header';
import { useSession, getSession } from "next-auth/react";
import db from '../../firebase';
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import moment from 'moment';
import Order from '../components/Order';

function Orders({ orders }) {
    const session = useSession().data;

    return (
        <div>

            <Header></Header>

            <main className='max-w-screen-lg mx-auto p-10'>
                <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>
                    Your Orders
                </h1>

                {session ?
                    (<h2>{orders.length} Order(s)</h2>)
                    :
                    (<h2>Please sign in to see your orders.</h2>)
                }

                <div className='mt-5 space-y-4'>
                    {orders?.map((order) => {
                        return (
                            <Order key={order.id} order={order}/>  
                        )
                    })
                    }
                </div>
            </main>
        </div>
    )
}

export default Orders

/*
ServerSide Render:
Just having this function, tell Nextjs that this is no longer a static page. There will be a middle server step. FIRST, render everything on the page and THEN send it to the user, rather then sending the site.

Anything on the server side is NodeJS

We need to get all the orders and their information
*/
export async function getServerSideProps(context) {
    const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

    // Get the users logged-in credentials...
    const session = await getSession(context);

    if (!session) {
        return {
            props: {},
        };
    }

    // Firebase db (version 9 syntax):
    // Create a reference to the orders collection.
    const ordersRef = collection(db, `users/${session.user.email}/orders`);

    // Create a query against the collection.
    const q = query(ordersRef, orderBy("timestamp", "desc"));

    const stripeOrdersQuerySnapshot = await getDocs(q);

    // Stripe orders:
    // When you have an array, needing to make a request/query for each element/firebase document
    // which are all asynchronous, you need to wrap the entire function with a Promise. 
    const orders = await Promise.all(
        stripeOrdersQuerySnapshot.docs.map(async (orderDoc) => {
            return {
                id: orderDoc.id,
                amount: orderDoc.data().amount,
                amountShipping: orderDoc.data().amount_shipping,
                images: orderDoc.data().images,
                timestamp: moment(orderDoc.data().timestamp.toDate()).unix(),
                items: (
                    await stripe.checkout.sessions.listLineItems(orderDoc.id, { limit: 100 })
                ).data,
            }
        })
    )

    // After querying for the orders from firestore which is going to be an array, simply return it as props:
    return {
        props: {
            orders,
            session,
        }
    }
}