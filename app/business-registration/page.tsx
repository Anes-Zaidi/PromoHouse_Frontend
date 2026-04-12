import BusinessRegistrationForm from "./components/BusinessRegistrationForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BusinessRegistrationPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />
      
      <main className="grow flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-2xl">
          <div className="mb-10 text-center">
            <div className="w-20 h-20 bg-[#22C55E]/10 flex items-center justify-center rounded-3xl mx-auto mb-6 shadow-sm">
              <svg className="w-10 h-10 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-3">Register Your Business</h1>
            <p className="text-gray-500 font-medium text-lg">Join the PromoHouse community and start sharing your surplus deals today.</p>
          </div>

          <div className="bg-white shadow-xl shadow-gray-200/50 rounded-[32px] p-8 lg:p-12 border border-gray-100">
            <BusinessRegistrationForm />
          </div>
          
          <p className="mt-8 text-center text-gray-400 text-sm font-medium">
            Need help? Contact our support at <span className="text-[#22C55E] font-bold underline cursor-pointer">support@promohouse.com</span>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
