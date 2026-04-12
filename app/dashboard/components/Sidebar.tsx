"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChartPie, FaInbox, FaStore, FaPlus, FaCog, FaSignOutAlt } from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { label: "Overview", icon: <FaChartPie />, href: "/dashboard" },
    { label: "Post a Deal", icon: <FaPlus />, href: "/post-deal" },
    { label: "My Businesses", icon: <FaStore />, href: "/business-registration" }, // Link to register or list
    { label: "Reservations", icon: <FaInbox />, href: "#" },
    { label: "Settings", icon: <FaCog />, href: "#" },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen fixed top-0 left-0 pt-20">
      <nav className="flex-grow p-6 space-y-2">
        {menuItems.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className={`flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-sm transition-all ${
              pathname === item.href 
                ? "bg-[#22C55E] text-white shadow-lg shadow-green-200" 
                : "text-gray-400 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-gray-50">
        <button className="flex items-center gap-4 px-4 py-3 w-full rounded-2xl font-bold text-sm text-red-400 hover:bg-red-50 hover:text-red-500 transition-all">
          <FaSignOutAlt className="text-lg" />
          Logout
        </button>
      </div>
    </div>
  );
}
