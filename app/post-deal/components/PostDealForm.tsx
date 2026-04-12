"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const SURPLUS_TYPES = [
  { value: "meal_box", label: "Meal Box", icon: "🍱" },
  { value: "pastries_box", label: "Pastries Box", icon: "🥐" },
  { value: "mixed_box", label: "Mixed Box", icon: "🎁" },
  { value: "ready_meals", label: "Ready Meals", icon: "🍲" },
  { value: "desserts", label: "Desserts", icon: "🍰" },
  { value: "raw_ingredients", label: "Ingredients", icon: "🥛" },
  { value: "other", label: "Other", icon: "✨" },
];

export default function PostDealForm() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    original_price: "",
    quantity_total: "1",
    surplus_type: "",
    available_from: new Date().toISOString().slice(0, 16),
    available_until: new Date(Date.now() + 86400000).toISOString().slice(0, 16),
    pickup_start: "18:00",
    pickup_end: "20:00",
    business_id: ""
  });
  
  const [businesses, setBusinesses] = useState<{id: number, name: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // Fetch businesses owned by user (logic depends on schema)
  useEffect(() => {
    const fetchBusinesses = async () => {
      // Temporary: fetch all businesses until owner_id is implementation
      // In a real app, we'd filter by auth.uid()
      const { data, error } = await supabase.from('businesses').select('id, name').eq('is_active', true);
      if (!error && data) setBusinesses(data);
      if (data && data.length > 0) setFormData(p => ({...p, business_id: data[0].id.toString()}));
    };
    fetchBusinesses();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const discountAmount = formData.original_price && formData.price 
    ? parseFloat(formData.original_price) - parseFloat(formData.price) 
    : 0;
  
  const discountPercent = formData.original_price && discountAmount > 0
    ? Math.round((discountAmount / parseFloat(formData.original_price)) * 100)
    : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      if (!formData.business_id) throw new Error("You must have a business registered to post deals.");
      if (!formData.surplus_type) throw new Error("Please select a surplus type.");

      const { error } = await supabase
        .from('deals')
        .insert({
          title: formData.title,
          description: formData.description,
          price: parseFloat(formData.price),
          original_price: parseFloat(formData.original_price),
          quantity_total: parseInt(formData.quantity_total),
          quantity_remaining: parseInt(formData.quantity_total),
          surplus_type: formData.surplus_type as any,
          available_from: new Date(formData.available_from).toISOString(),
          available_until: new Date(formData.available_until).toISOString(),
          pickup_start: formData.pickup_start,
          pickup_end: formData.pickup_end,
          business_id: parseInt(formData.business_id),
          is_active: true
        });

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => router.push('/'), 2000);

    } catch (err: any) {
      setErrorMsg(err.message || "Failed to post deal.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-10 space-y-6">
        <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto text-4xl animate-bounce">
          ✨
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Deal Published!</h2>
        <p className="text-gray-500">Your deal is now live and visible to customers.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {errorMsg && (
        <div className="p-4 bg-red-50 text-red-700 rounded-2xl text-sm font-bold border border-red-100 text-center">
          {errorMsg}
        </div>
      )}

      {/* Section 1: Business Selection */}
      <div className="space-y-4">
        <label className="text-sm font-bold text-gray-700 ml-1">Posting from Business</label>
        <select 
          name="business_id"
          value={formData.business_id}
          onChange={handleChange}
          className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-[#F97316] transition-all font-bold text-gray-800"
          required
        >
          {businesses.length === 0 && <option value="">No businesses found</option>}
          {businesses.map(b => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
      </div>

      <hr className="border-gray-50" />

      {/* Section 2: Deal Content */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#F97316]/10 text-[#F97316] flex items-center justify-center text-sm font-bold">1</div>
          <h3 className="text-lg font-black text-gray-800 tracking-tight">Deal Information</h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">Deal Title *</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Mixed Surprise Bakery Box"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-[#F97316] transition-all font-medium text-gray-800"
              required
            />
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Surplus Type *</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {SURPLUS_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFormData(p => ({...p, surplus_type: type.value}))}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 group ${
                    formData.surplus_type === type.value 
                      ? "border-[#F97316] bg-[#F97316]/5 text-[#F97316]" 
                      : "border-gray-50 bg-gray-50 text-gray-400 hover:border-gray-100"
                  }`}
                >
                  <span className="text-2xl">{type.icon}</span>
                  <span className="font-bold text-[10px] uppercase">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="What might be inside? Any allergens? e.g. 'A mix of 3-4 fresh pastries from today...'"
              rows={3}
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-[#F97316] transition-all text-gray-800 font-medium resize-none"
            />
          </div>
        </div>
      </div>

      <hr className="border-gray-50" />

      {/* Section 3: Pricing & Inventory */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#F97316]/10 text-[#F97316] flex items-center justify-center text-sm font-bold">2</div>
          <h3 className="text-lg font-black text-gray-800 tracking-tight">Price & Quantity</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">Original Price (DA)</label>
            <input
              type="number"
              name="original_price"
              value={formData.original_price}
              onChange={handleChange}
              placeholder="1200"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-[#F97316] transition-all font-medium text-gray-800"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">Promo Price (DA) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="400"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-[#F97316] transition-all font-medium text-gray-800"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">Total Available *</label>
            <input
              type="number"
              name="quantity_total"
              value={formData.quantity_total}
              onChange={handleChange}
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-[#F97316] transition-all font-medium text-gray-800"
              min="1"
              required
            />
          </div>
        </div>

        {discountPercent > 0 && (
          <div className="p-4 bg-green-50 rounded-2xl border border-green-100 flex items-center justify-between">
            <span className="text-sm font-bold text-green-700 underline underline-offset-4 decoration-2">Great Value!</span>
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-black">-{discountPercent}% OFF</span>
          </div>
        )}
      </div>

      <hr className="border-gray-50" />

      {/* Section 4: Schedule */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#F97316]/10 text-[#F97316] flex items-center justify-center text-sm font-bold">3</div>
          <h3 className="text-lg font-black text-gray-800 tracking-tight">Availability & Pickup</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1">Available From</label>
              <input
                type="datetime-local"
                name="available_from"
                value={formData.available_from}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-[#F97316] transition-all font-medium text-gray-800"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1">Available Until</label>
              <input
                type="datetime-local"
                name="available_until"
                value={formData.available_until}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-[#F97316] transition-all font-medium text-gray-800"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1">Pickup Starts at</label>
              <input
                type="time"
                name="pickup_start"
                value={formData.pickup_start}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-[#F97316] transition-all font-medium text-gray-800"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1">Pickup Ends at</label>
              <input
                type="time"
                name="pickup_end"
                value={formData.pickup_end}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-[#F97316] transition-all font-medium text-gray-800"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Submit */}
      <button 
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#F97316] hover:bg-[#ea580c] text-white font-black py-5 rounded-[24px] shadow-lg shadow-orange-200/50 hover:shadow-xl hover:shadow-orange-300/50 transition-all active:scale-[0.98] mt-4 disabled:opacity-70 flex justify-center items-center gap-2 text-lg uppercase tracking-wide"
      >
        {isLoading ? "Publishing..." : "Publish Deal ✨"}
      </button>

    </form>
  );
}
