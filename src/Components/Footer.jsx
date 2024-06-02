import React from 'react'
import profilepic from "../assets/IMG-20240503-WA0003.jpg"
const Footer = () => {
    return (
        <div>
            <div className=' bg-slate-900 text-slate-400 min-h-48 px-16 py-8 md:py-16 '>
                <div className='flex md:flex-row flex-col h-full items-center '>
                    <div className='w-full pr-5 items-center md:items-start '>
                        <div className=' font-bold text-center md:text-left '>About Us</div>
                        <div className=' text-sm tracking-widest text-center md:text-left '>We are the best crypto trading app in India, we provide our guidance
                            at a very cheap price.</div>
                    </div>
                    <div className='vstack'>
                        <img className=' h-[22vh] mt-9 md:mt-0 rounded-full  ' src={profilepic} alt="" />
                        <div className='text-center'>Our Founder</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer