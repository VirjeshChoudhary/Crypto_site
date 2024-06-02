import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Header = () => {
    const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='bg-black relative  flex justify-between items-center h-24 w-[100%]  mx-auto px-4 text-white'>
    {/* Logo */}
    <h1 className='w-full text-3xl font-bold text-[#00df9a] ml-4'>Crypto_App</h1>

    <div className='hidden md:flex space-x-14 mr-5'>
    <Link className='p-4 hover:bg-[#00df9a] rounded-xl m-2 font-medium cursor-pointer duration-300 hover:text-black' to={"/"}>Home</Link>
    <Link className='p-4 hover:bg-[#00df9a] rounded-xl m-2 font-medium cursor-pointer duration-300 hover:text-black' to={"/exchanges"}>Exchanges</Link>
    <Link className='p-4 hover:bg-[#00df9a] rounded-xl m-2 font-medium cursor-pointer duration-300 hover:text-black' to={"/coins"}>Coins</Link>
    

    </div>


    <div onClick={handleNav} className='block md:hidden'>
      {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
    </div>

    <div className={
        nav
          ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
          : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
      }>
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>Crypto_App</h1>
        <div className=' flex flex-col space-y-7 mt-10 text-xl font-medium  '>
        <Link className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-black' to={"/"}>Home</Link>
        <Link className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-black' to={"/exchanges"}>Exchanges</Link>
        <Link className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-black' to={"/coins"}>Coins</Link>
       
        </div>
      </div>
  </div>
  )
}

export default Header