import React from 'react';
import moment from 'moment';

const dollarUS = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function Order(props) {
  // Define each attribute from props or you can deconstruct props for the attributes 
  // from Orders page when mapping and drop em in the Order tag >>> {id, amount_shipping, items, timestamp, images}
  const id = props.order.id;
  const amount = props.order.amount;
  const amountShipping = props.order.amountShipping;
  const items = props.order.items;
  const timestamp = props.order.timestamp;
  const images = props.order.images;

  return (
    <div className='relative border rounded-md'>

      <div className='flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600'>

        <div>
          <p className='font-bold text-xs'>ORDER PLACED</p>
          {/* change the unix timestamp into "DD MMM YYYY" format*/}
          {/* check out the moment docs */}
          <p className='font-bold text-xs'>{moment.unix(timestamp).format("DD MMM YYYY")}</p>
        </div>

        <div>
          <p className='font-bold text-xs'>TOTAL</p>
          <p>{dollarUS.format(amount)} - {amountShipping === 0 ? 'Free Shipping ' : 'Next Day Delivery '} {dollarUS.format(amountShipping)}
          </p>
        </div>

        <p className='text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500'>
          {items.length} item(s)
        </p>

        <p className='absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap'>
          ORDER # {id}
        </p>
      </div>

      <div className='p-5 sm:p-10'>
        <div className='flex space-x-6 overflow-x-auto'>
          {images.map((image) => (
            <img src={image} alt="" className='h-20 object-contain sm:h-32' />
          ))}
        </div>
      </div>

    </div>
  )
}

export default Order