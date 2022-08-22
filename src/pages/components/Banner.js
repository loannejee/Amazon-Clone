import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


function Banner() {
  return (
    // This whole div container needs to be 'relative' because we're going to have some other elements 'absolute' positioned in this container.
    <div className='relative'>

      {/* Gray-to-Transparent gradient container and overlay it between carousel and productfeed*/}
      <div className='absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20'/>
      
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false} // hide status bar
        showIndicators={false} // hide the dots you usually see on bottom of the carousel
        showThumbs={false} // hide the thumbnails
        interval={5000} // scroll every 5 seconds
      >
        {/* We shall have 3 slides: */}
        <div>
          <img loading="lazy" src="https://m.media-amazon.com/images/S/al-na-9d5791cf-3faf/e6a5c2fb-d8cf-442c-bece-cace55c8f7d6.jpg" alt="" />
        </div>

        <div>
          <img loading="lazy" src="https://m.media-amazon.com/images/I/61GpLGCLURL._SX3000_.jpg" alt="" />
        </div>

        <div>
          <img loading="lazy" src="https://m.media-amazon.com/images/I/61qTOy8h3aL._SX3000_.jpg" alt="" />
        </div>

      </Carousel>
    </div>
  )
}

export default Banner