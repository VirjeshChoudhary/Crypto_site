import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../App'
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import CoinCard from './CoinCard';

const Coins = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [currency, setCurrency] = useState("inr");
    const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
    const changePage = (page) => {
        setPage(page);
        setLoading(true);
    };

    const btns = new Array(132).fill(1);
    const handleChange = (event) => {
        setCurrency(event.target.value);
      };


    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const { data } = await axios.get(
                    `${server}/coins/markets?vs_currency=${currency}&page=${page}`
                );
                setCoins(data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }

        }
        fetchCoins();
    }, [currency, page])
    if(error){
        return  <ErrorComponent message={"Error While Fetching coins"} />;
    }
//badiya h
    return (
        <div className='flex flex-wrap w-[100%] justify-center '>
            {
                loading ? <Loader /> :(
                    <>
                 <div className='flex space-x-3  h-7 mt-4  w-[77%] ' value={currency} onChange={handleChange}>
                 <input type="radio" id='html' name='currency' value={"inr"} defaultChecked />
                 <label htmlFor="html">INR</label>
                 <input type="radio" id='css' name='currency' value={"usd"}  />
                 <label htmlFor="css">USD</label>
                 <input type="radio" id='js' name='currency' value={"eur"} />
                <label htmlFor="js">EUR</label>
                </div>
                 <div className='w-[80%] flex flex-wrap gap-6 m-4 justify-evenly '>
                    {coins.map((i) => (
                        <CoinCard key={i.id}
                            id={i.id}
                            name={i.name}
                            img={i.image}
                            symbol={i.symbol}
                            price={i.current_price}
                            currencySymbol={currencySymbol}
                        />
                    ))}
                    <div className=' w-full overflow-auto flex p-8 '>

                        {btns.map((item, index) => (
                            <div className=' bg-black text-white px-4 mx-1 rounded-lg cursor-pointer focus:bg-white  ' key={index} onClick={() => {changePage(index + 1) }}>
                                {index + 1}
                            </div>
                        ))}
                    </div>
                </div>
                </>
           ) }
        </div>
    )
}



export default Coins