import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useProductStore } from '../store/useProductStore';
import { LayoutDashboard, CopyPlus, PictureInPicture2 } from "lucide-react";
export const Display = () => {
  const{authUser} = useAuthStore()
  const{productList} = useProductStore()
  const cards = [
    {
      title: "Total Products",
      value: 120,
      icon: <LayoutDashboard className="w-8 h-8 text-blue-500" />,
      color: "border-blue-500",
    },
    {
      title: "Low Stock Items",
      value: 8,
      icon: <CopyPlus className="w-8 h-8 text-red-200" />,
      color: "border-red-200",
    },
    {
      title: "Inventory Value",
      value: "₹25,000",
      icon: <PictureInPicture2 className="w-8 h-8 text-green-500" />,
      color: "border-green-500",
    },
  ];
  return (
    <div>
        <div>
        <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {authUser?.name} 👋</h1>
        <p className="text-gray-500">Here's what's happening with your inventory today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`bg-white p-6 rounded-xl shadow hover:shadow-xl transition-shadow border-t-4 ${card.color}`}
        >
          <div className="flex items-center gap-4 mb-4">
            {card.icon}
            <h2 className="text-xl font-bold">{card.title}</h2>
          </div>
          <p className="text-3xl font-extrabold">{card.value}</p>
        </div>
      ))}
    </div>

      </div>
    </div>

    
  )
}

