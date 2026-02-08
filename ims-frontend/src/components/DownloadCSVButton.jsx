import React from 'react'
import { useEffect } from 'react'
import { useProductStore } from '../store/useProductStore'
import { useAuthStore } from '../store/useAuthStore'

const DownloadCSVButton = () => {
    const {dowanloadCSV,isDownloading} = useProductStore()
    const {checkAuth} = useAuthStore()
    useEffect(() => {
            checkAuth()
    },[])
  return (
   <button
    onClick={dowanloadCSV}
    disabled={isDownloading}
    className={`px-4 py-2 rounded-lg transition ${
        isDownloading ? "bg-gray-500 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700 text-white"     
    }`}
   >
     {isDownloading ? "Downloading...":"Download CSV"}
   </button>
  )
}

export default DownloadCSVButton