import React from 'react'
import { CirclePile } from 'lucide-react';
import ProductTable from '../ProductTable'
import { Link } from 'react-router-dom'

function StockDisplay() {
  return (
    <div className=''>
      <div className="flex items-center justify-between bg-blue-100 rounded-3xl p-5 mb-10">
        <CirclePile className='h-10 w-20'/>
      <h1 className="text-2xl font-bold">Inventory Storage</h1>

       <Link
        to="/dashboard"
        className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
    Back
  </Link>
</div>
      <ProductTable/>
    </div>
  )
}

export default StockDisplay