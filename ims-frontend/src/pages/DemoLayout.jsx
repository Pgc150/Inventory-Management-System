import { Home, Package, ShoppingCart, Settings } from "lucide-react"

const DemoLayout = () => {
  return (
    <aside className="w-64 h-screen sticky top-0 bg-white border-r flex flex-col">
      
      {/* Logo */}
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-blue-600">
          Admin Panel
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        <SidebarItem icon={<Home />} label="Dashboard" />
        <SidebarItem icon={<Package />} label="Products" />
        <SidebarItem icon={<ShoppingCart />} label="Orders" />
        <SidebarItem icon={<Settings />} label="Settings" />
      </nav>

      {/* Profile Bottom */}
      <div className="border-t p-4 flex items-center gap-3 bg-blue-50">
        <img
          src="https://i.pravatar.cc/100"
          alt="profile"
          className="w-10 h-10 rounded-full border-2 border-blue-500"
        />
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-800">
            Payal Chavhan
          </p>
          <p className="text-xs text-blue-600">
            Admin
          </p>
        </div>
      </div>

    </aside>
  )
}

const SidebarItem = ({ icon, label }) => {
  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer
                    text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition">
      <span className="text-blue-500">{icon}</span>
      <span className="font-medium">{label}</span>
    </div>
  )
}

export default DemoLayout