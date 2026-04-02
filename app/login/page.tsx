"use client";

import LoginLeftPanel from "./components/LoginLeftPanel";
import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row font-sans text-[#141414]">
      <LoginLeftPanel />
      <LoginForm />
    </div>
  );
}
