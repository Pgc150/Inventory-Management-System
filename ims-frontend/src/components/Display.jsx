import React from 'react'
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore'
import { useProductStore } from '../store/useProductStore';
import { LayoutDashboard, CopyPlus, PictureInPicture2 } from "lucide-react";
import { useEffect } from 'react';

export const Display = () => {
  const{authUser} = useAuthStore()
  const{dashboardData,list} = useProductStore()

  useEffect(()=>{
    list()
  },[])

  const{
    totalProducts,
    lowStockCount ,
    totalInventoryValue
  } = dashboardData
  
  return (
    <motion.div
      initial={{ y: 16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease:"easeOut" }}
    >
    <div className='text-gray-600'>
        <div>
        <div>
        <h1 className="text-xl font-bold text-gray-500">Welcome back, {authUser?.name} 👋</h1>
        <p className="text-gray-500">Here's what's happening with your inventory today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      
        <div
          className={`bg-white p-6 rounded-xl shadow hover:shadow-xl hover:cursor-pointer  border-t-4 border-blue-200 transform hover:scale-105 transition-transform`}
        >
          <div className="flex items-center gap-4 mb-4">
            <LayoutDashboard className="w-8 h-8 text-blue-200" />
            <h2 className=" font-bold">Total Products</h2>
          </div>
          <p className="text-xl font-bold">{totalProducts}</p>
        </div>
      

      <div
          className={`bg-white p-6 rounded-xl shadow hover:shadow-xl hover:cursor-pointer transform hover:scale-105 transition-transform border-t-4 border-red-200`}
        >
          <div className="flex items-center gap-4 mb-4">
            <CopyPlus className="w-8 h-8 text-red-200" />
            <h2 className="font-bold">LowStockCount</h2>
          </div>
          <p className="text-xl font-bold">{lowStockCount}</p>
        </div>

      <div
          
          className={`bg-white p-6 rounded-xl shadow hover:shadow-xl hover:cursor-pointer transform hover:scale-105 transition-transform border-t-4 border-green-200`}
        >
          <div className="flex items-center gap-4 mb-4">
            <PictureInPicture2 className="w-8 h-8 text-green-200" />
            <h2 className="font-bold">Total Inventory Value</h2>
          </div>
          <p className="text-xl  font-bold">₹ {totalInventoryValue}</p>
        </div>  
    </div>

      </div>
    </div>

    </motion.div>
  )
}

