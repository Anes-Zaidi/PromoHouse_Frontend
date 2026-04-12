"use client";

import { FaStore, FaTag, FaHeart, FaStar } from "react-icons/fa";

interface StatsProps {
  activeDeals: number;
  totalSales: number;
  totalSaves: number;
  rating: number;
}

export default function StatsCards({ activeDeals, totalSales, totalSaves, rating }: StatsProps) {
  const stats = [
    { label: "Active Deals", value: activeDeals, icon: <FaTag />, color: "bg-blue-500", shadow: "shadow-blue-200" },
    { label: "Total Sales", value: totalSales, icon: <FaStore />, color: "bg-green-500", shadow: "shadow-green-200" },
    { label: "Interested", value: totalSaves, icon: <FaHeart />, color: "bg-rose-500", shadow: "shadow-rose-200" },
    { label: "Store Rating", value: rating.toFixed(1), icon: <FaStar />, color: "bg-amber-500", shadow: "shadow-amber-200" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl ${stat.color} text-white flex items-center justify-center text-xl shadow-lg ${stat.shadow} group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-black text-gray-900">{stat.value}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
