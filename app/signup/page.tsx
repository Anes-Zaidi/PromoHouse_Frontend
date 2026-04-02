"use client";

import SignupLeftPanel from "./components/SignupLeftPanel";
import SignupForm from "./components/SignupForm";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row font-sans text-[#141414]">
      <SignupLeftPanel />
      <SignupForm />
    </div>
  );
}