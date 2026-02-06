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

    //  if(isLoggingOut){
    //     navigate('/login')
    // }

    useEffect(() => {
      if(!isCheckingAuth && !authUser){
        navigate('/login')
      }
    },[authUser,navigate])

    if (!authUser) return null
  return (
    <div>
        <div className="p-4 ">
        <div className="flex  gap-3 px-4 py-3 mb-2 justify-end">
            <div className="w-10 h-10 text-xl rounded-full bg-blue-100 flex items-center justify-center text-brand-700 font-bold hover:cursor-pointer"
             onClick={() => setShowSignOut(!showSignOut)}
            >
                 {authUser?.name?.charAt(0).toUpperCase()}
            </div>
            <div className=" mt-2 min-w-0 hover:bg-blue-50 cursor-pointer">
                <p className="text-xl font-semibold text-gray-900 truncate">{authUser?.name}</p>
            </div>
        </div>

        {showSignOut && (
          <button 
            onClick={logout}
            className="w-full flex justify-end items-center gap-3 px-4 py-2 text-black-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium animate-fadeIn"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        )}
        </div>
        
    </div>
  )
}

