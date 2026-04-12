import PostDealForm from "./components/PostDealForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PostDealPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />
      
      <main className="grow flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-2xl">
          <div className="mb-10 text-center">
            <div className="w-20 h-20 bg-[#F97316]/10 flex items-center justify-center rounded-3xl mx-auto mb-6 shadow-sm">
              <svg className="w-10 h-10 text-[#F97316]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-3">Post a New Deal</h1>
            <p className="text-gray-500 font-medium text-lg">Turn your surplus into opportunities and reduce waste today.</p>
          </div>

          <div className="bg-white shadow-xl shadow-gray-200/50 rounded-[32px] p-8 lg:p-12 border border-gray-100">
            <PostDealForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
