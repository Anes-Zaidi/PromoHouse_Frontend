"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          }
        }
      });
      if (error) throw error;
      setSuccessMsg("Registration successful! Please check your email to confirm your account.");
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred during sign up");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 p-8 lg:p-10 flex flex-col items-center justify-center relative">

      {/* Mobile "or" divider */}
      <div className="lg:hidden flex items-center gap-4 w-full max-w-sm mb-8 -mt-12 z-20">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="text-[#1E633E] font-medium underline underline-offset-4">
          or
        </span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-12 tracking-tight">
          Create Account
        </h2>

        <form className="space-y-5" onSubmit={handleSignUp}>
          {errorMsg && <div className="text-red-600 text-sm font-medium text-center p-3 bg-red-50 border border-red-100 rounded-xl">{errorMsg}</div>}
          {successMsg && <div className="text-[#1E633E] text-sm font-medium text-center p-3 bg-green-50 border border-green-100 rounded-xl">{successMsg}</div>}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* First Name */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#1E633E] focus:ring-4 focus:ring-[#1E633E]/10 transition-all text-gray-800 placeholder:text-gray-400"
                required
              />
            </div>

            {/* Last Name */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#1E633E] focus:ring-4 focus:ring-[#1E633E]/10 transition-all text-gray-800 placeholder:text-gray-400"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john.doe@example.com"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#1E633E] focus:ring-4 focus:ring-[#1E633E]/10 transition-all text-gray-800 placeholder:text-gray-400"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#1E633E] focus:ring-4 focus:ring-[#1E633E]/10 transition-all text-gray-800 placeholder:text-gray-400 pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat your password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#1E633E] focus:ring-4 focus:ring-[#1E633E]/10 transition-all text-gray-800 placeholder:text-gray-400 pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Sign Up Button */}
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1E633E] hover:bg-[#164d30] text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98] mt-8 disabled:opacity-70 flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing up...
              </>
            ) : "Create Account"}
          </button>

          {/* Login Link */}
          <p className="text-center text-sm font-medium text-gray-600 mt-6 pb-2">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#F27D26] hover:underline font-bold transition-all"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
