import React, { useState } from 'react';
import Image from 'next/image';
import { StarIcon } from "@heroicons/react/solid";

const dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});
const MAX_RATING = 5;
const MIN_RATING = 1;

// Deconstruct props
function Product({ id, title, price, category, description, image }) {
    // Generate random number between 1 and 5
    const randomRating = Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    // Generate random true or false
    const randomHasPrime = Math.random() < 0.5
    const [rating] = useState(randomRating);
    const [hasPrime] = useState(randomHasPrime)

    return (
        <div className='relative flex flex-col m-5 bg-white z-30 p-10'>

            <p className='absolute top-2 right-2 text-xs italic text-gray-400'>{category}</p>

            <Image src={image} height={200} width={200} objectFit="contain" />

            <h4 className='my-3'>{title}</h4>

            <div className='flex'>
                {Array(rating)
                    .fill()
                    .map((_, i) => {
                        return (<StarIcon className='h-5 text-yellow-500' />)
                    })
                }
            </div>

            <p className='text-xs line-clamp-2'>{description}</p>

            <div className='mb-5'>
                {dollarUS.format(price)}
            </div>

            {hasPrime && (
                <div className='flex items-center space-x-2 -mt-5'>
                    <img className='w-12' src="https://links.papareact.com/fdw" alt=""/>
                    <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                </div>
            )}

            <button className='button'>Add to Cart</button>

        </div>
    )
}

export default Product