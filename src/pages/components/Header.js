import React from 'react'
import Image from "next/image";
import {
    MenuIcon,
    SearchIcon,
    ShoppingCartIcon, 
} from "@heroicons/react/outline"

function Header() {
    return (
        <header>
            {/* TOP NAV */}
            <div className='flex items-center bg-amazon_blue p-1 flex-grow py-2'>

                {/* Logo */}
                <div className='mt-4 flex items-center flex-grow sm:flex-grow-0'>
                    <Image
                        src="https://links.papareact.com/f90"
                        width={150}
                        height={40}
                        objectFit="contain"
                        className='cursor-pointer'
                    />
                </div>

                {/* Search 🔎 */}
                <div className='hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500'>
                    
                    <select className='p-2 h-10 w-14 rounded-l-md cursor-pointer focus:outline-none border-r border-gray-300 bg-gray-200 hover:bg-gray-300 text-xs'>
                        <option>All Departments</option>
                        <option>Alexa Skills</option>
                        <option>Amazon Directions</option>
                    </select>

                    <input
                    className='p-2 h-full w-6 flex-grow flex-shrink focus:outline-none' 
                    type="text"
                    />

                    <SearchIcon className="h-12 p-4"/>
                </div>

                {/* Account, Orders, and Cart */}
                <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
                    <div className='link'>
                        <p>Hello, Joanne</p>
                        <p className='font-extrabold md:text-sm'>Account & Lists</p>
                    </div>

                    <div className='link'>
                        <p>Returns</p>
                        <p className='font-extrabold md:text-sm'>& Orders</p>
                    </div>
                    
                    
                    <div className='relative link flex items-center'>
                        <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold'>0</span>
                        <ShoppingCartIcon className='h-10'/>
                        {/* By default, the "Cart" label on the nav shall be hidden until the screen is medium or above. Once reach md, make it inline as well*/}
                        <p className='hidden md:inline font-extrabold md:text-sm mt-2'>Cart</p>
                    </div>
                </div>
            </div>

            {/* BOTTOM NAV */}
            <div className='flex items-center bg-amazon_blue-light'>
                <p>
                    <MenuIcon className='h-6 mr-1' />
                    All
                </p>
            </div>
        </header>
    )
}

export default Header