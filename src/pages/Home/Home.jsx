import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom';

const Home = () => {
  const {allCoins, currency} = useContext(CoinContext);
  const [displayCoin , setDisplayCoin] = useState([])
  const [input , setInput] = useState('')
  const inputHandler = (e) => {
        setInput( e.target.value)
        if (e.target.value === '') {
          setDisplayCoin(allCoins)
          
        }
  }
  const searchHandler =async (e) => {
     e.preventDefault();
     const result = await allCoins.filter((item)=>{
      return item.name.toLowerCase().includes(input.toLowerCase())
      
    })
    setDisplayCoin(result)

  }
  useEffect(()=>{
    setDisplayCoin(allCoins)
  },[allCoins])
  return (
    <div className='home'>
      <div className="hero">
        <h1> Largest <br/> Crypto Marketplace</h1>
        <p>Welcome to the world's largest cryptocurrency marketplace. Signup to explore more cryptos</p>
        <form onSubmit={searchHandler}>
          <input required value={input} list='suggestions' onChange={inputHandler} type="text" placeholder='Search Crypto..' />
          <datalist id='suggestions'>
            {
              allCoins.map((item,index)=>(<option key={index} value={item.name}/>))
            }
          </datalist>
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{textAlign:'center'}}>24H Change</p>
          <p className='market-cap'>Market Cap</p>
        </div>
        {
          displayCoin.slice(0,10).map((item,index)=>(
            <Link to={`/coin/${item.id}`} key={index} className="table-layout">
                <p>{item.market_cap_rank}</p>
                <div>
                  <img src={item.image} alt="" />
                  <p>{item.name + "-" + item.symbol}</p>
                </div>
                <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
                <p className={item.price_change_percentage_24h>0 ? "green" : 'red'}>
                  {Math.floor(item.price_change_percentage_24h*100)/100} %
                  </p>
                <p className='market-cap'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
            </Link>
          ))
        }
      </div>

    </div>
  )
}

export default Home