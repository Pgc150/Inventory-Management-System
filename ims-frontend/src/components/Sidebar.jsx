import React from 'react'
import { motion } from 'framer-motion';
import { useState } from 'react';
import { NavLink } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import {  Home, Package, PieChart, Plus, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';
import { CopyPlus } from 'lucide-react';
import { PictureInPicture2 } from 'lucide-react';
import { DashBoardPage } from './sidebarcomponents/DashBoardPage';
import { AddProduct } from './sidebarcomponents/AddProduct';
import StockDisplay from './sidebarcomponents/StockDisplay';
import { Navbar } from './Navbar';
export const Sidebar = (onClose, showClose = false) => {
    const {authUser} = useAuthStore()
     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
     const [activeItem, setActiveItem] = useState('dashboard');
  return (

     <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="w-70 h-screen sticky top-0
                 bg-white shadow-lg
                 flex flex-col"
    >

      {/* Header */}
      <div className="p-4  flex items-center justify-between">
        <h1 className="text-4xl font-bold text-blue-500">
          Invento
        </h1>
      </div>

      {/* 🧾 Scrollable Menu */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar">
        <Item to="/dashboard" icon={<Home className="w-5 h-5 "/>} label="Dashboard" onClose={onClose} />
        <Item to="/add" icon={<Plus className='w-5 h-5 '/>} label=" Add Products" onClose={onClose} />
        <Item to="/table" icon={<ShoppingCart className='w-5 h-5'/>} label="Stock Display" onClose={onClose} />
        
        {/* add more items to see scrollbar */}
      </nav>

      {/* Profile */}
      <div className=" p-4 bg-blue-50">
        <Navbar/>
      </div>

    </motion.aside>
  )
}

const Item = ({ to, label, onClose ,icon}) => (
  <NavLink
  to={to}
  onClick={onClose}
  className={({ isActive }) =>
    `group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200
    ${isActive
      ? "bg-blue-100 text-blue-700 shadow-sm"
      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"}`
  }
>
   <span className="text-gray-400 group-hover:text-blue-500">
    {icon}
  </span>

  <span className="text-sm font-medium tracking-wide">
    {label}
  </span>
</NavLink>

  )


