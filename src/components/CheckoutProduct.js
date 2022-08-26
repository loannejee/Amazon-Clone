import React from 'react';
import Image from 'next/image';
import { StarIcon } from "@heroicons/react/solid";
import { removeFromCart } from '../slices/cartSlice';
import { useDispatch } from 'react-redux';

const dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

function CheckoutProduct({ id, title, price, category, description, image, rating, hasPrime }) {

    const dispatch = useDispatch();

    const removeItemFromCart = () => {
        // Remove item from redux
        dispatch(removeFromCart({ id }))
    } 

    return (
        <div className='grid grid-cols-5'>

            {/* Right Side */}
            <Image src={image} height={200} width={200} objectFit="contain" />

            {/* Middle */}
            <div className='col-span-3 mx-5'>

                <p>{title}</p>

                <div className='flex'>
                    {Array(rating)
                        .fill()
                        .map((_, i) => {
                            return (<StarIcon key={i} className='h-5 text-yellow-500' />)
                        })
                    }
                </div>

                <p className='text-xs my-2 line-clamp-3'>{description}</p>

                <div className='mb-5'>
                    {dollarUS.format(price)}
                </div>

                {hasPrime && (
                    <div className='flex items-center space-x-2 -mt-5'>
                        <img
                            loading='lazy'
                            className='w-12'
                            src="https://links.papareact.com/fdw"
                            alt="" />
                        <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                    </div>
                )}

            </div>

            {/* Left Side */}
            {/* Challenge: 
            1. see if you increase or decrease quantity on checkout
            2. adding products from the home page already existing in the cart will increment the product in the cart  
             */}
            <div className='flex flex-col space-y-2 my-auto justify-self-end'>
                <button className='button' onClick={removeItemFromCart}>Remove from Cart</button>
            </div>

        </div>
    )
}

export default CheckoutProduct