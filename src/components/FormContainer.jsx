import React from 'react'

function FormContainer({
    label,
    amount,
    onAmountChange,
    currency,
    onCurrencyChange,
    readOnly,
    type,
    currencyData = {}
}) 
{
  return (
    <form className='w-full p-4 bg-gray-100 rounded-lg shadow-md mt-5' action="">
        <div className='w-full flex flex-nowrap justify-between space-x-4 overflow-auto'>
            <div className='flex flex-col flex-grow'>
                <label 
                className='mb-2 font-semibold text-xl text-gray-700'
                htmlFor={label}>{label}</label>
                <input 
                className='p-2 border border-gray-300 rounded-md transition w-full outline-none'
                value={amount}
                onChange={onAmountChange}
                readOnly={readOnly}
                type={type} />
            </div>
            <div className='flex flex-col flex-grow'>
                <label 
                className='mb-2 font-semibold text-xl text-gray-700'
                htmlFor="currency">Currency</label>
                <select 
                className='p-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 transition w-full'
                name="currency" 
                id="currency"
                value={currency}
                onChange={onCurrencyChange}
                >
                    {Object.entries(currencyData).map(([currencyCode]) => (
                        <option key={currencyCode} value={currencyCode}>{currencyCode}</option>
                    ))}
                </select>
            </div>
        </div>
    </form>
  )
}

export default FormContainer
