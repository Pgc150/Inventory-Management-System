import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import {Navbar} from '../components/Navbar'
import {Sidebar} from '../components/Sidebar'
import {Display} from '../components/Display'

const Dashboard = () => {
  const {authUser} = useAuthStore()
  console.log(authUser)
  return (
   <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
  <div className="grid grid-cols-1 lg:grid-cols-5 h-screen">
    
    {/* Sidebar - Golden ratio width */}
    <div className="lg:col-span-1 bg-white dark:bg-gray-800 shadow-2xl">
      <Sidebar />
    </div>
    
    <div className="lg:col-span-3 flex flex-col">
      <div className="bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700">
        <Navbar />
      </div>
      <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-blue-50 to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <Display />
      </div>
    </div>
    
  </div>
</div>
  )
}

export default Dashboard