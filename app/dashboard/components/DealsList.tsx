"use client";

import { FaEdit, FaTrash, FaPause, FaPlay } from "react-icons/fa";

interface Deal {
  id: number;
  title: string;
  price: number;
  quantity_remaining: number;
  quantity_total: number;
  is_active: boolean | null;
  created_at: string | null;
}

export default function DealsList({ deals }: { deals: Deal[] }) {
  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-gray-50 flex justify-between items-center">
        <h3 className="text-xl font-black text-gray-900">Active Deals</h3>
        <button className="text-sm font-bold text-[#22C55E] hover:underline">View All</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Deal Info</th>
              <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Inventory</th>
              <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Price</th>
              <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {deals.map((deal) => (
              <tr key={deal.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg">📦</div>
                    <div>
                      <p className="font-bold text-gray-900 line-clamp-1">{deal.title}</p>
                      <p className="text-[10px] text-gray-400 font-medium">Added {deal.created_at ? new Date(deal.created_at).toLocaleDateString() : 'N/A'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="space-y-1.5 w-32">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-gray-500">{deal.quantity_remaining} left</span>
                      <span className="text-gray-400">{deal.quantity_total} tot.</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-[#22C55E] h-full transition-all" 
                        style={{ width: `${(deal.quantity_remaining / deal.quantity_total) * 100}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 font-black text-gray-900">{deal.price} DA</td>
                <td className="px-8 py-5">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide ${
                    deal.is_active 
                      ? "bg-green-100 text-green-600" 
                      : "bg-gray-100 text-gray-400"
                  }`}>
                    {deal.is_active ? "Active" : "Paused"}
                  </span>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all" title="Edit">
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all" title={deal.is_active ? "Pause" : "Resume"}>
                      {deal.is_active ? <FaPause className="w-4 h-4" /> : <FaPlay className="w-4 h-4" />}
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {deals.length === 0 && (
              <tr>
                <td colSpan={5} className="px-8 py-10 text-center text-gray-400 font-medium italic">
                  No deals found. Start by creating one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
