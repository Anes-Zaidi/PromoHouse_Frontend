"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import locationDataRaw from "@/data/locations.json";

const locationData = locationDataRaw as {
  countries: { id: number; name: string }[];
  wilayasByCountry: Record<string, { id: number; name: string }[]>;
  communesByWilaya: Record<string, { id: number; name: string }[]>;
};

const CATEGORIES = [
  { value: "restaurant", label: "Restaurant", icon: "🍴" },
  { value: "cafe", label: "Café", icon: "☕" },
  { value: "bakery", label: "Bakery", icon: "🥖" },
  { value: "fast_food", label: "Fast Food", icon: "🍔" },
  { value: "supermarket", label: "Supermarket", icon: "🛒" },
  { value: "grocery", label: "Grocery Store", icon: "🍎" },
  { value: "hotel", label: "Hotel", icon: "🏨" },
  { value: "catering", label: "Catering", icon: "🍽️" },
  { value: "other", label: "Other", icon: "✨" },
];

export default function BusinessRegistrationForm() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    category: "",
    description: "",
    country_id: "",
    wilaya_id: "",
    commune_id: "",
    address: "",
    average_price: ""
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const countries = locationData.countries || [];
  const currentWilayas = formData.country_id ? locationData.wilayasByCountry[formData.country_id] || [] : [];
  const currentCommunes = formData.wilaya_id ? locationData.communesByWilaya[formData.wilaya_id] || [] : [];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updates = { [name]: value };
      if (name === "country_id") {
        (updates as any).wilaya_id = "";
        (updates as any).commune_id = "";
      } else if (name === "wilaya_id") {
        (updates as any).commune_id = "";
      }
      return { ...prev, ...updates };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);
    
    try {
      // Basic validation
      if (!formData.name || !formData.category || !formData.commune_id) {
        throw new Error("Please fill in all mandatory fields.");
      }

      const { data, error } = await supabase
        .from('businesses')
        .insert({
          name: formData.name,
          email: formData.email || null,
          phone: formData.phone || null,
          website: formData.website || null,
          category: formData.category as any,
          description: formData.description || null,
          country_id: parseInt(formData.country_id),
          wilaya_id: parseInt(formData.wilaya_id),
          commune_id: parseInt(formData.commune_id),
          address: formData.address || null,
          average_price: formData.average_price ? parseFloat(formData.average_price) : null,
          is_active: true,
          is_verified: false
        })
        .select()
        .single();
        
      if (error) throw error;

      setSuccess(true);
      setTimeout(() => {
        router.push('/'); // Or to a business dashboard if it exists
      }, 2000);
      
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to register business.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-10 space-y-6">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-4xl animate-bounce">
          ✓
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Success!</h2>
        <p className="text-gray-500">Your business has been registered successfully. Redirecting you home...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {errorMsg && (
        <div className="p-4 bg-red-50 text-red-700 rounded-2xl text-sm font-bold border border-red-100 text-center animate-shake">
          {errorMsg}
        </div>
      )}

      {/* Section 1: Basic Identity */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#22C55E]/10 text-[#22C55E] flex items-center justify-center text-sm font-bold">1</div>
          <h3 className="text-lg font-black text-gray-800 tracking-tight">Business Identity</h3>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">Business Name *</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Grandma's Bakery"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-[#22C55E] focus:ring-4 focus:ring-[#22C55E]/5 transition-all font-medium text-gray-800"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1">Public Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="contact@business.com"
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-[#22C55E] transition-all font-medium text-gray-800"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1">Phone Number</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+213..."
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-[#22C55E] transition-all font-medium text-gray-800"
              />
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-50" />

      {/* Section 2: Category & Description */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#22C55E]/10 text-[#22C55E] flex items-center justify-center text-sm font-bold">2</div>
          <h3 className="text-lg font-black text-gray-800 tracking-tight">Category & Story</h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">Business Category *</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setFormData(p => ({...p, category: cat.value}))}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 group ${
                    formData.category === cat.value 
                      ? "border-[#22C55E] bg-[#22C55E]/5 text-[#22C55E]" 
                      : "border-gray-50 bg-gray-50 text-gray-400 hover:border-gray-100"
                  }`}
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="font-bold text-xs">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Short Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell customers about your business and why you're joining the surplus movement..."
              rows={3}
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-[#22C55E] transition-all text-gray-800 font-medium resize-none"
            />
          </div>
        </div>
      </div>

      <hr className="border-gray-50" />

      {/* Section 3: Location */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#22C55E]/10 text-[#22C55E] flex items-center justify-center text-sm font-bold">3</div>
          <h3 className="text-lg font-black text-gray-800 tracking-tight">Location Details</h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">Country *</label>
            <select
              name="country_id"
              value={formData.country_id}
              onChange={handleChange}
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-[#22C55E] transition-all font-medium text-gray-800"
              required
            >
              <option value="" disabled>Select country</option>
              {countries.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1">Wilaya *</label>
              <select
                name="wilaya_id"
                value={formData.wilaya_id}
                onChange={handleChange}
                disabled={!formData.country_id}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-[#22C55E] transition-all font-medium text-gray-800 disabled:opacity-50"
                required
              >
                <option value="" disabled>Select wilaya</option>
                {currentWilayas.map(w => (
                  <option key={w.id} value={w.id}>{w.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1">Commune *</label>
              <select
                name="commune_id"
                value={formData.commune_id}
                onChange={handleChange}
                disabled={!formData.wilaya_id}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-[#22C55E] transition-all font-medium text-gray-800 disabled:opacity-50"
                required
              >
                <option value="" disabled>Select commune</option>
                {currentCommunes.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">Exact Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Street name, number, building..."
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-[#22C55E] transition-all text-gray-800 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Button */}
      <button 
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#22C55E] hover:bg-[#1ea34d] text-white font-black py-5 rounded-[24px] shadow-lg shadow-green-200/50 hover:shadow-xl hover:shadow-green-300/50 transition-all active:scale-[0.98] mt-4 disabled:opacity-70 flex justify-center items-center gap-2 text-lg uppercase tracking-wide"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Registering...
          </>
        ) : "Launch Business"}
      </button>

    </form>
  );
}
