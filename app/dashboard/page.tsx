"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Sidebar from "./components/Sidebar";
import StatsCards from "./components/StatsCards";
import DealsList from "./components/DealsList";
import Navbar from "@/components/Navbar";

export default function MerchantDashboard() {
  const [data, setData] = useState({
    business: null as any,
    deals: [] as any[],
    stats: {
      activeDeals: 0,
      totalSales: 0,
      totalSaves: 0,
      rating: 0
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        // 1. Fetch businesses first (for now fetching all since owner_id is missing)
        const { data: businessData, error: bError } = await supabase
          .from('businesses')
          .select('*')
          .limit(1)
          .single();

        if (bError) throw bError;

        // 2. Fetch deals for this business
        const { data: dealsData, error: dError } = await supabase
          .from('deals')
          .select('*')
          .eq('business_id', businessData.id)
          .order('created_at', { ascending: false });

        if (dError) throw dError;

        setData({
          business: businessData,
          deals: dealsData,
          stats: {
            activeDeals: dealsData.filter(d => d.is_active).length,
            totalSales: 42, // Placeholder until orders table
            totalSaves: 128, // Placeholder
            rating: businessData.rating || 4.5
          }
        });
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <Sidebar />

      <main className="pl-64 pt-20">
        <div className="p-10 max-w-7xl mx-auto space-y-10">
          
          {/* Header */}
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[#22C55E] font-black uppercase tracking-widest text-[10px] mb-1">Merchant Portal</p>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                {loading ? "Loading Dashboard..." : `Welcome back, ${data.business?.name || 'Partner'}`}
              </h1>
            </div>
            <div className="flex gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Current Session</p>
                <p className="text-sm font-bold text-gray-900">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="h-64 flex items-center justify-center">
               <div className="animate-spin h-10 w-10 border-4 border-[#22C55E] border-t-transparent rounded-full" />
            </div>
          ) : (
            <>
              <StatsCards {...data.stats} />
              <div className="grid grid-cols-1 gap-10">
                <DealsList deals={data.deals} />
              </div>
            </>
          )}

        </div>
      </main>
    </div>
  );
}
