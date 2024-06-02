import React from 'react'
import { Link } from 'react-router-dom'

const CoinCard = ({id, name, img, symbol, price,currencySymbol="₹" }) => (
    <div className='m-5 hover:transition-all duration-[300ms] hover:scale-110 h-[100px] w-[100px] '>
        <Link to={`/coins/${id}`}  >
            <img src={img} alt="" className='h-[100%] w-100% ' />
            <div className=' flex text' >
                <div className=' text-medium ml-1 ' >{symbol}.</div>
                <div className=' ml-2 line-clamp-1  ' >{name}</div>
            </div>
                <div className=' ml-1 line-clamp-1  ' >{price?`${currencySymbol} ${price}` : "NA"}</div>
        </Link>
    </div>
)

export default CoinCard