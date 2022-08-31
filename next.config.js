// Need to goodlist where we're going to pull these images from for nextjs to know
// Set up domain array of domains
module.exports = {
    images: {
        domains: [
            'links.papareact.com',
            'fakestoreapi.com'
        ]
    },
    env: {
        stripe_public_key: process.env.STRIPE_PUBLIC_KEY
    }
};