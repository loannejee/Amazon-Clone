import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import { getSession } from "next-auth/react";

// Where is products being deconstructed from?
// 'props' is usually passed through the component function
// But, if you deconstruct 'props', you get 'products'
export default function Home({ products, session }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      
      <Header></Header>

      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner></Banner>

        {/* ProductFeed */}
        <ProductFeed products={products}></ProductFeed>
      </main>
    </div>
  );
}

/*
ServerSide Render:
Just having this function, tell Nextjs that this is no longer a static page. There will be a middle server step. FIRST, render everything on the page and THEN send it to the user, rather then sending the site.

GET >>> https://fakestoreapi.com/products
*/
export async function getServerSideProps(context) {
  // To avoid the glitch --- we want everything loaded
  const session = await getSession(context)
  const products = await fetch('https://fakestoreapi.com/products').then(res => res.json());
  
  // After fetching the products which is an array of data, simply return it as props:
  return {
    props: {
      products,
      session,
    }
  }
}

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