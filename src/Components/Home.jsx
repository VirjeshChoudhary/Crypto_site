import React, { useEffect } from 'react'
import { server } from '../App'
import axios from 'axios'
import bitcoin from "../assets/btc (2).png"; 
import "../assets/style/style.css"
const Home = () => {
  return (
    <div >
      <div className=' bg-slate-900 w-full h-[85vh] '>
    <div className='bit h-[85vh] '>
      <img className=' w-full h-full object-contain grayscale-[1] translate-y-[20px]  ' src={bitcoin} alt="" />
       </div>
       <div className=' text-6xl text-slate-300 mt-[-20px]  text-center font-extralight ' >Xcrypto </div>
      </div>
    </div>
  )
}

export default Home