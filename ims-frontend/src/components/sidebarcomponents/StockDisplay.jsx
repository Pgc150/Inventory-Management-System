import React from 'react'
import SearchBar from '../SearchBar'
import ProductTable from '../ProductTable'

function StockDisplay() {
  return (
    <div>
      <div className='bg-blue-100 rounded-3xl p-5 mb-10'>
        <h1 className='text-2xl font-bold'>Product list</h1>
      </div>
      
      {/* Search bar */}
      <SearchBar/>

      <ProductTable/>
    </div>
  )
}

export default StockDisplay