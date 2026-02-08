import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { LogOut } from 'lucide-react'
import { useState } from 'react'
export const Navbar = () => {
    const {authUser,checkAuth,logout,isLoggingOut,isLoggingIn,isCheckingAuth} = useAuthStore()
    const [showSignOut, setShowSignOut] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        checkAuth()
    },[])

    useEffect(() => {
      if(!isCheckingAuth && !authUser){
        navigate('/login')
      }
    },[authUser,navigate])

    if (!authUser) return null
  return (
  <div className="relative">
  <div className="p-4 text-gray-700">
    <div
      className="flex items-center gap-3  rounded-lg hover:bg-blue-50 cursor-pointer transition"
      onClick={() => setShowSignOut(!showSignOut)}
    >
      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
        {authUser?.name?.charAt(0).toUpperCase()}
      </div>

      
      <div className="min-w-0">
        <p className="text-sm font-semibold truncate">
          {authUser?.name}
        </p>
        <p className="text-xs text-gray-500 truncate">
          {authUser?.email}
        </p>
      </div>
    </div>

   
    {showSignOut && (
      <div className="mt-2 bg-white shadow-lg rounded-lg overflow-hidden animate-fadeIn">
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    )}
  </div>
</div>

  )
}

