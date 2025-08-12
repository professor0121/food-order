import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Sidebar = ({ children }) => {
  const appName = import.meta.env.VITE_APP_NAME // ✅ Works with Vite

  const navigationMenu = [
    { className: "", link: "/", icon: "🏠", title: "Home" },
    { className: "", link: "/dashboard", icon: "📊", title: "Dashboard" },
    { className: "", link: "/orders", icon: "🛒", title: "Order" },
    { className: "", link: "/activity", icon: "📈", title: "Activity" },
    { className: "", link: "/users", icon: "👤", title: "User" },
    { className: "", link: "/tiffin", icon: "🍱", title: "Tiffin" },
    { className: "", link: "/meals", icon: "🍽️", title: "Meal" },
    { className: "", link: "/staff", icon: "🧑‍🍳", title: "Staff" },
    { className: "", link: "/settings", icon: "⚙️", title: "Settings" },
  ]

  return (
    <aside className="w-64 h-screen bg-transparent text-white flex flex-col p-4 border-r border-gray-700">
      {/* App Name */}
      <div className="text-lg font-bold mb-6">
        {appName || "My App"}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-3 flex-1">
        {navigationMenu.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className={`flex items-center gap-2 hover:bg-gray-700 p-2 rounded ${item.className}`}
          >
            <span>{item.icon}</span>
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>

      {/* User Info */}
      <div className="flex items-center gap-3 mt-6">
        <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-sm font-bold">
          IMG
        </div>
        <div className="flex flex-col leading-tight">
          <h3 className="font-semibold">username</h3>
          <p className="text-sm text-gray-400">username@gmail.com</p>
        </div>
      </div>

      {/* Extra content (children) */}
      <div className="mt-auto">{children}</div>
    </aside>
  )
}

Sidebar.propTypes = {
  children: PropTypes.node,
}

export default Sidebar
