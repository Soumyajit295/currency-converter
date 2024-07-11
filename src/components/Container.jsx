import React from 'react'

function Container({ children }) {
  return (
    <div className='w-[95%] sm:w-3/4 md:w-1/2 p-5 bg-white bg-opacity-50 mx-auto mt-10 rounded-xl'>
      {children}
    </div>
  )
}

export default Container
