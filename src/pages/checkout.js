import Image from 'next/image';
import React from 'react';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/cartSlice';
import CheckoutProduct from '../components/CheckoutProduct';

function Checkout() {
    const items = useSelector(selectItems);
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
                <div>

                </div>

            </main>
        </div>
    )
}

export default Checkout