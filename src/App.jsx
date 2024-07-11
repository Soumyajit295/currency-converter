import { useEffect, useState } from 'react'
import './App.css'
import Container from './components/Container'
import FormContainer from './components/FormContainer'

function App() {

  let [amount,setAmount] = useState('')
  let [fromCurrency,setFromCurrency] = useState('USD')
  let [calculatedAmount,setCalculatedAmount] = useState('')
  let [toCurrency,setTocurrency] = useState('INR')
  let [currencyData,setCurrencyData] = useState([])


  function onAmountChange(event){
    setAmount(event.target.value)
  }
  
  function onFromCurrencyChange(event){
    setFromCurrency(event.target.value)
  }

  function onToCurrencyChange(event){
    setTocurrency(event.target.value)
  }
  
  function onSwap(){
    let temp = fromCurrency
    setFromCurrency(toCurrency)
    setTocurrency(temp)
  }

  async function fetchData(currency){
    try{
      let rawData = await fetch(`https://api.exchangerate-api.com/v4/latest/${currency}`)
      if(!rawData.ok){
        throw new Error("There is some problem !")
      }
      let data = await rawData.json()
      setCurrencyData(data.rates)
    }
    catch(err){
      toast.error(err, {
        position: "top-right",
        autoClose: 1000,
      });
    }
  }

  useEffect(()=>{
    fetchData(fromCurrency)
  },[fromCurrency])

  function convert(){
    for(const currency in currencyData){
      if(currency === toCurrency){
        setCalculatedAmount(parseFloat(amount)*currencyData[currency])
      }
    }
  }

  return (
    <>
      <Container>
        <FormContainer label={'From'} amount={amount} onAmountChange={onAmountChange} currency={fromCurrency} onCurrencyChange={onFromCurrencyChange} readOnly={false} type='number' currencyData={currencyData}/>
        <center>
        <button 
        onClick={onSwap}
        className='mx-auto p-2 bg-blue-600 text-white font-semibold mt-5 rounded-xl'>Swap Currency</button>
        </center>
        <FormContainer label={'To'} amount={calculatedAmount} onAmountChange={onAmountChange} currency={toCurrency} onCurrencyChange={onToCurrencyChange} readOnly={true} type='text' 
        currencyData={currencyData}/>
        <button 
        onClick={convert}
        className='p-3 bg-blue-600 text-white font-semibold mt-5 rounded-xl w-full'>Convert Currency</button>
      </Container>

    </>
  )
}

export default App
