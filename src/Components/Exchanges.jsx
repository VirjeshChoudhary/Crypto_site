import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../App'
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';

const Exchanges = () => {
    const [exchanges, setExchanges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        const fetchExcahnges = async () => {
            try {
                const { data } = await axios.get(`${server}/exchanges?per_page=100`)
                console.log(data);
                setExchanges(data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }
        fetchExcahnges();
    }, [])
    if(error){
        return  <ErrorComponent message={"Error While Fetching Exchanges"} />;
    }
    return (
        <div className='flex flex-wrap w-[100%] justify-center '>
            {
                loading ? <Loader /> : <div className='w-[80%] flex flex-wrap gap-6 m-4  justify-evenly  '>
                    {exchanges.map((i) => (
                        <ExchangeCard key={i.id}
                            name={i.name}
                            img={i.image}
                            rank={i.trust_score_rank}
                            url={i.url} />
                    ))}
                </div>
            }
        </div>
    )
}

const ExchangeCard = ({ name, img, rank, url }) => (
    <div className='m-5 hover:transition-all duration-[300ms] hover:scale-110 h-[100px] w-[100px] '>
        <a href={url} target='blank' >
            <img src={img} alt="image didn't fetch by api " className='h-[100%] w-100% ' />
            <div className=' flex text' >
                <div className=' text-medium ml-1 ' >{rank}.</div>
                <div className=' ml-2 line-clamp-1 font-medium ' >{name}</div>
            </div>
        </a>
    </div>
)
export default Exchanges