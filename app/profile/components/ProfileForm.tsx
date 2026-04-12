"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import locationDataRaw from "@/data/locations.json";
import type { Database } from "@/types/database.types";

const locationData = locationDataRaw as {
  countries: { id: number; name: string }[];
  wilayasByCountry: Record<string, { id: number; name: string }[]>;
  communesByWilaya: Record<string, { id: number; name: string }[]>;
};

// Zod validation schema
const profileUpdateSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  account_type: z.enum(["Buyer", "Merchant", "Admin"]),
  country_id: z.number().int().positive("Country is required"),
  wilaya_id: z.number().int().positive("Wilaya is required"),
  commune_id: z.number().int().positive("Commune is required"),
  address: z.string().min(1, "Address is required"),
});

interface ProfileFormProps {
  initialData: Database["public"]["Tables"]["profiles"]["Row"];
}

export default function ProfileForm({ initialData }: ProfileFormProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    first_name: initialData.first_name || "",
    last_name: initialData.last_name || "",
    account_type: initialData.account_type || "Buyer",
    country_id: initialData.country_id?.toString() || "",
    wilaya_id: initialData.wilaya_id?.toString() || "",
    commune_id: initialData.commune_id?.toString() || "",
    address: initialData.address || "",
  });

  const countries = locationData.countries || [];
  const currentWilayas = formData.country_id
    ? locationData.wilayasByCountry[formData.country_id] || []
    : [];
  const currentCommunes = formData.wilaya_id
    ? locationData.communesByWilaya[formData.wilaya_id] || []
    : [];

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updates: any = { [name]: value };

      // Auto-clear nested children on hierarchical shifts
      if (name === "country_id") {
        updates.wilaya_id = "";
        updates.commune_id = "";
      } else if (name === "wilaya_id") {
        updates.commune_id = "";
      }

      return { ...prev, ...updates };
    });

    // Clear validation error for this field
    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const handleAccountTypeSelect = (type: "Buyer" | "Merchant") => {
    setFormData((prev) => ({ ...prev, account_type: type }));
    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors["account_type"];
      return newErrors;
    });
  };

  const handleCancel = () => {
    setFormData({
      first_name: initialData.first_name || "",
      last_name: initialData.last_name || "",
      account_type: initialData.account_type || "Buyer",
      country_id: initialData.country_id?.toString() || "",
      wilaya_id: initialData.wilaya_id?.toString() || "",
      commune_id: initialData.commune_id?.toString() || "",
      address: initialData.address || "",
    });
    setIsEditing(false);
    setErrorMsg("");
    setSuccessMsg("");
    setValidationErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setValidationErrors({});

    // Validate form data with Zod
    const dataToValidate = {
      first_name: formData.first_name.trim(),
      last_name: formData.last_name.trim(),
      account_type: formData.account_type,
      country_id: parseInt(formData.country_id),
      wilaya_id: parseInt(formData.wilaya_id),
      commune_id: parseInt(formData.commune_id),
      address: formData.address.trim(),
    };

    const validation = profileUpdateSchema.safeParse(dataToValidate);
    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        const path = issue.path.join(".");
        errors[path] = issue.message;
      });
      setValidationErrors(errors);
      return;
    }

    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Authentication session not found. Please log in again.");

      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      if (!backendUrl) throw new Error("Backend URL not configured");

      const response = await fetch(`${backendUrl}/api/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(validation.data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || errorData.error || "Failed to update profile"
        );
      }

      setSuccessMsg("Profile updated successfully!");
      setIsEditing(false);
      setTimeout(() => {
        router.refresh();
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {errorMsg && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm font-semibold border border-red-100">
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div className="p-4 bg-green-50 text-green-700 rounded-xl text-sm font-semibold border border-green-100">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-2 border rounded-lg transition-colors ${
                  isEditing
                    ? "border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1E633E]"
                    : "border-gray-200 bg-gray-50 text-gray-600"
                } ${validationErrors.first_name ? "border-red-500" : ""}`}
              />
              {validationErrors.first_name && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.first_name}</p>
              )}
            </div>

            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-2 border rounded-lg transition-colors ${
                  isEditing
                    ? "border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1E633E]"
                    : "border-gray-200 bg-gray-50 text-gray-600"
                } ${validationErrors.last_name ? "border-red-500" : ""}`}
              />
              {validationErrors.last_name && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.last_name}</p>
              )}
            </div>
          </div>
        </div>

        {/* Account Type */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Account Type</h3>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleAccountTypeSelect("Buyer")}
              disabled={!isEditing}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 group ${
                formData.account_type === "Buyer"
                  ? "border-[#1E633E] bg-[#1E633E]/5 text-[#1E633E]"
                  : "border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200"
              } ${!isEditing ? "opacity-75 cursor-not-allowed" : ""}`}
            >
              <div
                className={`p-2 rounded-xl transition-all ${
                  formData.account_type === "Buyer"
                    ? "bg-[#1E633E] text-white"
                    : "bg-white text-gray-400 group-hover:text-gray-600"
                }`}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <span className="font-bold text-sm">Customer / Buyer</span>
            </button>

            <button
              type="button"
              onClick={() => handleAccountTypeSelect("Merchant")}
              disabled={!isEditing}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 group ${
                formData.account_type === "Merchant"
                  ? "border-[#1E633E] bg-[#1E633E]/5 text-[#1E633E]"
                  : "border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200"
              } ${!isEditing ? "opacity-75 cursor-not-allowed" : ""}`}
            >
              <div
                className={`p-2 rounded-xl transition-all ${
                  formData.account_type === "Merchant"
                    ? "bg-[#1E633E] text-white"
                    : "bg-white text-gray-400 group-hover:text-gray-600"
                }`}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <span className="font-bold text-sm">Merchant</span>
            </button>
          </div>
          {validationErrors.account_type && (
            <p className="text-red-500 text-xs">{validationErrors.account_type}</p>
          )}
        </div>

        {/* Location */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Location</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="country_id" className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                id="country_id"
                name="country_id"
                value={formData.country_id}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-2 border rounded-lg transition-colors ${
                  isEditing
                    ? "border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1E633E]"
                    : "border-gray-200 bg-gray-50 text-gray-600"
                } ${validationErrors.country_id ? "border-red-500" : ""}`}
              >
                <option value="">Select country</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
              {validationErrors.country_id && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.country_id}</p>
              )}
            </div>

            <div>
              <label htmlFor="wilaya_id" className="block text-sm font-medium text-gray-700 mb-1">
                Wilaya
              </label>
              <select
                id="wilaya_id"
                name="wilaya_id"
                value={formData.wilaya_id}
                onChange={handleChange}
                disabled={!isEditing || !formData.country_id}
                className={`w-full px-4 py-2 border rounded-lg transition-colors ${
                  isEditing && formData.country_id
                    ? "border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1E633E]"
                    : "border-gray-200 bg-gray-50 text-gray-600"
                } ${validationErrors.wilaya_id ? "border-red-500" : ""}`}
              >
                <option value="">Select wilaya</option>
                {currentWilayas.map((wilaya) => (
                  <option key={wilaya.id} value={wilaya.id}>
                    {wilaya.name}
                  </option>
                ))}
              </select>
              {validationErrors.wilaya_id && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.wilaya_id}</p>
              )}
            </div>

            <div>
              <label htmlFor="commune_id" className="block text-sm font-medium text-gray-700 mb-1">
                Commune
              </label>
              <select
                id="commune_id"
                name="commune_id"
                value={formData.commune_id}
                onChange={handleChange}
                disabled={!isEditing || !formData.wilaya_id}
                className={`w-full px-4 py-2 border rounded-lg transition-colors ${
                  isEditing && formData.wilaya_id
                    ? "border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1E633E]"
                    : "border-gray-200 bg-gray-50 text-gray-600"
                } ${validationErrors.commune_id ? "border-red-500" : ""}`}
              >
                <option value="">Select commune</option>
                {currentCommunes.map((commune) => (
                  <option key={commune.id} value={commune.id}>
                    {commune.name}
                  </option>
                ))}
              </select>
              {validationErrors.commune_id && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.commune_id}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={!isEditing}
              rows={3}
              className={`w-full px-4 py-2 border rounded-lg transition-colors resize-none ${
                isEditing
                  ? "border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1E633E]"
                  : "border-gray-200 bg-gray-50 text-gray-600"
              } ${validationErrors.address ? "border-red-500" : ""}`}
              placeholder="Enter your address"
            />
            {validationErrors.address && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.address}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-6">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex-1 px-6 py-2.5 bg-[#1E633E] text-white font-semibold rounded-lg hover:bg-[#1E633E]/90 transition-colors"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-6 py-2.5 bg-[#1E633E] text-white font-semibold rounded-lg hover:bg-[#1E633E]/90 disabled:opacity-50 transition-colors"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={isLoading}
                className="flex-1 px-6 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
