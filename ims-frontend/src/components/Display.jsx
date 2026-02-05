import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

export const Display = () => {
  const{authUser} = useAuthStore()
  return (
    <div>
        
        <div>
        <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {authUser?.name} 👋</h1>
        <p className="text-gray-500">Here's what's happening with your inventory today.</p>
      </div>
      </div>
    </div>

    
  )
}

