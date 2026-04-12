"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import locationDataRaw from "@/data/locations.json";

// Explicit wrapper type to support dynamic lookup safely
const locationData = locationDataRaw as {
  countries: { id: number; name: string }[];
  wilayasByCountry: Record<string, { id: number; name: string }[]>;
  communesByWilaya: Record<string, { id: number; name: string }[]>;
};

export default function CompleteProfileForm() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    country_id: "",
    wilaya_id: "",
    commune_id: "",
    address: "",
    account_type: "" as "Buyer" | "Merchant" | ""
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  /* 
   * O(1) Derived State 
   * Dramatically boosts performance by stripping out all Network/DB calls and zeroing `useEffect` cycles.
   * Dropdown arrays naturally lock based exclusively on what `formData` is currently selected!
   */
  const countries = locationData.countries || [];
  const currentWilayas = formData.country_id ? locationData.wilayasByCountry[formData.country_id] || [] : [];
  const currentCommunes = formData.wilaya_id ? locationData.communesByWilaya[formData.wilaya_id] || [] : [];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updates = { [name]: value };
      
      // Auto-clear nested children on hierarchical shifts
      if (name === "country_id") {
        (updates as any).wilaya_id = "";
        (updates as any).commune_id = "";
      } else if (name === "wilaya_id") {
        (updates as any).commune_id = "";
      }
      
      return { ...prev, ...updates };
    });
  };

  const handleAccountTypeSelect = (type: "Buyer" | "Merchant") => {
    setFormData(prev => ({ ...prev, account_type: type }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    
    if (!formData.account_type) {
      setErrorMsg("Please select an account type.");
      return;
    }

    if (!formData.country_id || !formData.wilaya_id || !formData.commune_id || !formData.address.trim()) {
      setErrorMsg("Please fill out all address fields.");
      return;
    }

    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Authentication session not found. Please log in again.");

      const { error } = await supabase
        .from('profiles')
        .update({
          account_type: formData.account_type as any,
          country_id: parseInt(formData.country_id),
          wilaya_id: parseInt(formData.wilaya_id),
          commune_id: parseInt(formData.commune_id),
          address: formData.address.trim(),
          is_completed: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', session.user.id);
        
      if (error) throw error;
      
      // Successfully updated profile! Refresh active sessions in background and redirect wrapper.
      router.push('/');
      router.refresh();
      
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMsg && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm font-semibold border border-red-100 text-center">
          {errorMsg}
        </div>
      )}

      {/* Account Type Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">I want to use PromoHouse as a...</label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleAccountTypeSelect("Buyer")}
            className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 group ${
              formData.account_type === "Buyer" 
                ? "border-[#1E633E] bg-[#1E633E]/5 text-[#1E633E]" 
                : "border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200"
            }`}
          >
            <div className={`p-2 rounded-xl transition-all ${
              formData.account_type === "Buyer" ? "bg-[#1E633E] text-white" : "bg-white text-gray-400 group-hover:text-gray-600"
            }`}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <span className="font-bold text-sm">Customer / Buyer</span>
          </button>

          <button
            type="button"
            onClick={() => handleAccountTypeSelect("Merchant")}
            className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 group ${
              formData.account_type === "Merchant" 
                ? "border-[#1E633E] bg-[#1E633E]/5 text-[#1E633E]" 
                : "border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200"
            }`}
          >
            <div className={`p-2 rounded-xl transition-all ${
              formData.account_type === "Merchant" ? "bg-[#1E633E] text-white" : "bg-white text-gray-400 group-hover:text-gray-600"
            }`}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span className="font-bold text-sm">Business / Merchant</span>
          </button>
        </div>
      </div>

      <div className="h-px bg-zinc-100 w-full my-8!" />

      {/* Country Selection */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-gray-700">Country</label>
        <select
          name="country_id"
          value={formData.country_id}
          onChange={handleChange}
          className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#1E633E] focus:ring-4 focus:ring-[#1E633E]/10 transition-all font-medium text-gray-800"
          required
        >
          <option value="" disabled>Select your country</option>
          {countries.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Wilaya & Commune Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700">Wilaya / State</label>
          <select
            name="wilaya_id"
            value={formData.wilaya_id}
            onChange={handleChange}
            disabled={!formData.country_id || currentWilayas.length === 0}
            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#1E633E] focus:ring-4 focus:ring-[#1E633E]/10 transition-all font-medium text-gray-800 disabled:opacity-50"
            required
          >
            <option value="" disabled>Select wilaya</option>
            {currentWilayas.map(w => (
              <option key={w.id} value={w.id}>{w.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700">Commune / City</label>
          <select
            name="commune_id"
            value={formData.commune_id}
            onChange={handleChange}
            disabled={!formData.wilaya_id || currentCommunes.length === 0}
            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#1E633E] focus:ring-4 focus:ring-[#1E633E]/10 transition-all font-medium text-gray-800 disabled:opacity-50"
            required
          >
            <option value="" disabled>Select commune</option>
            {currentCommunes.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Exact Address */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-gray-700">Street Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="123 Example Street, Apt 4B"
          rows={3}
          className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#1E633E] focus:ring-4 focus:ring-[#1E633E]/10 transition-all text-gray-800 font-medium placeholder:text-gray-400 placeholder:font-normal resize-none"
          required
        />
      </div>

      {/* Submit Button */}
      <button 
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#1E633E] hover:bg-[#164d30] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98] mt-4 disabled:opacity-70 flex justify-center items-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Saving Profile...
          </>
        ) : "Complete Profile"}
      </button>

    </form>
  );
}
