import React from 'react'
// The reuseable component:
import Product from './Product'

// 'props' is usually passed through the component function
// But, if you deconstruct 'props', you get 'products'
// You can skip:
// const products = props.products
function ProductFeed({ products }) {
    return (
        // Deconstructing each product element
        // Fyi - 'row-dense' - use up all the splace
        <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto'>

            {/* First 4 products */}
            {products
                .slice(0, 4)
                .map(({ id, title, price, category, description, image }) => {
                    return (
                        <Product
                            key={id} 
                            id={id}
                            title={title}
                            price={price}
                            category={category}
                            description={description}
                            image={image}
                        />
                    )
                })
            }

            {/* Amazon Ad - when reach medium screen, the ad shall take the full width of the screen */}
            <img
                className='md:col-span-full'
                src="https://links.papareact.com/dyz"
                alt=""
            />

            {/* When medium screen, this product shall take two columns: */}
            <div className='md:col-span-2'>
                {products
                    .slice(4, 5)
                    .map(({ id, title, price, category, description, image }) => {
                        return (
                            <Product
                                key={id}
                                id={id}
                                title={title}
                                price={price}
                                category={category}
                                description={description}
                                image={image}
                            />
                        )
                    })
                }
            </div>

            {/* Rest of the products */}
            {products
                .slice(5, products.length)
                .map(({ id, title, price, category, description, image }) => {
                    return (
                        <Product
                            key={id}
                            id={id}
                            title={title}
                            price={price}
                            category={category}
                            description={description}
                            image={image}
                        />
                    )
                })
            }
        </div>
    )
}

export default ProductFeed





/*
props: { 
    // This is the output from FakeStoreAPI set as value to props
    products: [
        {
                    id:1,
                    title:'...',
                    price:'...',
                    category:'...',
                    description:'...',
                    image:'...'
                },
                ...
                {
                    id:30,
                    title:'...',
                    price:'...',
                    category:'...',
                    description:'...',
                    image:'...'
                }
    ]
}
*/