import {Sidebar} from "../components/Sidebar"
import { Outlet } from "react-router-dom"
import { useState } from "react"

const DashboardLayout = () => {
  const [open,setOpen] = useState(false)
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout