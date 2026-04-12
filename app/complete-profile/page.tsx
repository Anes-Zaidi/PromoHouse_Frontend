import CompleteProfileForm from "./components/CompleteProfileForm";

export default function CompleteProfilePage() {
  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4 font-sans text-gray-900">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-3xl p-8 lg:p-12 border border-zinc-100">
        
        <div className="mb-10 text-center">
          <div className="w-16 h-16 bg-[#1E633E]/10 flex items-center justify-center rounded-2xl mx-auto mb-6">
            <svg className="w-8 h-8 text-[#1E633E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight mb-2">Complete Your Profile</h2>
          <p className="text-gray-500 font-medium">Please provide your location so we can show you the best deals nearby.</p>
        </div>

        <CompleteProfileForm />
      </div>
    </div>
  );
}
