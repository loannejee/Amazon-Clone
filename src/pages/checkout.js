import Image from 'next/image';
import React from 'react';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import { selectItems, selectTotal } from '../slices/cartSlice';
import CheckoutProduct from '../components/CheckoutProduct';
import { useSession } from 'next-auth/react';

const dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

function Checkout() {
    const session = useSession().data;
    const items = useSelector(selectItems);
    const subtotal = useSelector(selectTotal);

    return (
        <div className='bg-gray-100'>

            <Header></Header>

            <main className='lg:flex max-w-screen-2xl mx-auto'>

                {/* LEFT CHECKOUT */}
                <div className='flex-grow m-5 shadow-sm'>
                    {/* Amazon Ad */}
                    <Image
                        src="https://links.papareact.com/ikj"
                        width={1020}
                        height={250}
                        objectFit="contain"
                        className='cursor-pointer'
                    />

                    <div className='flex flex-col p-5 space-y-10 bg-white'>
                        <h1 className='text-3xl border-b pb-4'>{items.length === 0 ? 'Your Amazon Cart is empty' : 'Shopping Cart'}
                        </h1>
                        {items
                            .map((item, i) => {
                                return (
                                    <CheckoutProduct
                                        key={i}
                                        id={item.id}
                                        title={item.title}
                                        price={item.price}
                                        category={item.category}
                                        description={item.description}
                                        image={item.image}
                                        rating={item.rating}
                                        hasPrime={item.hasPrime}
                                    />
                                )
                            })
                        }
                    </div>
                </div>

                {/* RIGHT CHECKOUT */}
                <div className='flex flex-col bg-white p-10 shadow-md'>
                    {
                        // If the statement is true, THEN && execute the action on the right of &&
                        items.length > 0 && (
                            // react fragment, similar to a div
                            <>
                                <h2 className='whitespace-nowrap'>
                                    Subtotal ({items.length} items):
                                    <span className='font-bold ml-2'>
                                        {dollarUS.format(subtotal)}
                                    </span>
                                </h2>

                                {/* Challenge: 1. see if you can implement guest checkout 
                                2. use local storage to remember your cart for 30 minutes even when you leave the page*/}
                                <button
                                disabled={!session} 
                                className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                                    {!session ? "Sign in to checkout" : "Proceed to checkout"
                                    }
                                </button>
                            </>
                        )}

                </div>

            </main>
        </div>
    )
}

export default Checkout