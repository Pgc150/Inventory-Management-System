import React from 'react'
import { useState } from 'react';
import { NavLink } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import {  PieChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';
import { CopyPlus } from 'lucide-react';
import { PictureInPicture2 } from 'lucide-react';
import { DashBoardPage } from './sidebarcomponents/DashBoardPage';
import { AddProduct } from './sidebarcomponents/AddProduct';
import StockDisplay from './sidebarcomponents/StockDisplay';
export const Sidebar = () => {
    const {authUser} = useAuthStore()
     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
     const [activeItem, setActiveItem] = useState('dashboard');
  return (
    
    <div className='flex flex-col gap-30'> 
    
        {/* logo */}
        <div>
            <div className=''>
            <h1 className='text-4xl font-bold text-blue-500'>Invento</h1>
            </div>
        </div>
        
        <div>
            <div className='flex flex-col  gap-10'>
            <div className='flex hover:bg-blue-50 hover:cursor-pointer gap-4'>
            <LayoutDashboard className='ml-5 text-blue-400 w-8 h-8'/>
            <h1 className='font-bold hover:bg-blue-50 rounded-lg transition-colors'>Dashboard</h1>
           {/* <DashBoardPage/> */}
        </div>

        <div className='flex hover:bg-blue-50 rounded-lg hover:cursor-pointer hover:rounded-lg gap-4'>
            <CopyPlus className='ml-5 text-blue-400 w-8 h-8'/>
            <Link to='/add'><h1 className='font-bold'>Add Product</h1></Link>
           {/* <AddProduct/> */}
        </div>

        <div className='flex hover:bg-blue-50 hover:cursor-pointer gap-4'>
            <PictureInPicture2 className='ml-5 text-blue-400 w-8 h-8'/>
           <Link to='/display'> <h1 className='font-bold'>Stock Display</h1></Link>
           {/* <StockDisplay/> */}
        </div>
        </div>
        </div>
        {/* sidebarlist */}
        
    </div>
  )
}

