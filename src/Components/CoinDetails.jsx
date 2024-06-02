import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import axios from 'axios';
import { server } from '../App';
import ErrorComponent from './ErrorComponent';
import Chart from './Chart';


const CoinDetails = () => {
  const params = useParams();
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "1y":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        // console.log(data);
        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setCoin(data);
        setChartArray(chartData.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [params.id,currency,days]);
  if (error) return <ErrorComponent message={"Error While Fetching Coin"} />;
  return (
    <>
      {loading ? <Loader /> :
        <div className='w-[100%] flex justify-center'>
          <div className='w-[85%]'>

            <div className='w-full  border-2 '>
            <Chart arr={chartArray} currency={currency} days={days} />
            </div>
            <div className='p-4 flex justify-center overflow-x-auto '>
            {btns.map((i) => (
              <div
                className='p-2 m-1 bg-slate-400 rounded-md'
                key={i}
                onClick={() => switchChartStats(i)}
              >
                {i}
              </div>
            ))}
          </div>

            <div className='flex pl-20 space-x-3  h-7 mt-4  w-[77%] ' value={currency} onChange={handleChange}>
              <input type="radio" id='html' name='currency' value={"inr"} defaultChecked />
              <label htmlFor="html">INR</label>
              <input type="radio" id='css' name='currency' value={"usd"} />
              <label htmlFor="css">USD</label>
              <input type="radio" id='js' name='currency' value={"eur"} />
              <label htmlFor="js">EUR</label>
            </div>
            <div className=' flex space-x-4 flex-col p-16 items-start '>
              <div className=' text-sm self-center opacity-[0.7] '> Last Updated On {Date(coin.market_data.last_updated).split("G")[0]}</div>
              <div className='w-full'>
                <img className=' w-[8rem] h-[8rem] object-contain  ' src={coin.image.large} alt="" />
                <div className=' font-normal m '>{coin.name}</div>
                <div className=' text-2xl font-medium '>{currencySymbol}{coin.market_data.current_price[currency]} </div>
                <div> {coin.market_data.price_change_percentage_24h > 0 ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
                </svg>} {coin.market_data.price_change_percentage_24h}% </div>

              <div className=' text-4xl bg-slate-800 text-white font-semibold h-fit w-fit p-3 '>
                {`#${coin.market_cap_rank}`}
              </div>
              <Custombar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} low={`${currencySymbol}${coin.market_data.low_24h[currency]}`} />

              <div className='w-full p-4'>
                <Item title={"Max Supply"} value={coin.market_data.max_supply} />
                <Item title={"Circulating Supply"} value={coin.market_data.circulating_supply} />
                <Item title={"Market Cap"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`} />
                <Item title={"All Time High"} value={`${currencySymbol}${coin.market_data.ath[currency]}`} />
                <Item title={"All Time Low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`} />
              </div>

              </div>

            </div>
          </div>
        </div>
      }
    </>
  )
}

const Item=({title,value})=>(
  <div className=' flex justify-between w-full my-4 '>
    <div className=' font-Bebus tracking-widest'>
      {title}
    </div>
    <div>{value}</div>
  </div>
);

const Custombar=({high,low})=>(
 
    <div className='w-[100%]'>
      <input className=' text-yellow-700 accent-teal-700 w-[100%] bg-red-700 border-4 border-black  ' type="range" value={((high-low)/high)*100}  />
      
      <div className='flex justify-between w-full '>
        <div children={low} className=' text-red-600 p-1 bg-red-200 '></div>
        <div className='text-sm'>24H Range</div>
        <div children={high} className=' text-green-600 p-1 bg-green-200'></div>
      </div>
    </div>
 
);

export default CoinDetails