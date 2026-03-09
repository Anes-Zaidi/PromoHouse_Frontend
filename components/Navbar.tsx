import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Phone, Heart, Store } from "lucide-react"

export default function Navbar() {
  return (
    <header className="w-full border-b border-border/40 bg-white dark:bg-black font-sans">
      {/* Top Banner */}
      <div className="bg-brand-dark text-white py-1.5 px-4 sm:px-8 xl:px-16 text-xs flex flex-col sm:flex-row items-center justify-between">
        <p className="font-medium">FREE delivery & 40% Discount for your first surplus order!</p>
        <div className="flex items-center gap-6 mt-2 sm:mt-0 font-medium">
          <div className="flex items-center gap-1.5">
            <MapPin size={14} className="fill-current" />
            <span>New York, USA</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone size={14} className="fill-current" />
            <span>+1 (800) 123-4567</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="flex items-center justify-between px-4 sm:px-8 xl:px-16 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-brand-primary text-white p-1.5 rounded-lg flex items-center justify-center">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" fill="currentColor"/>
              <path d="M11 7C11 7 8 10 9 14C9 14 12 11 15 11C15 11 12 13 12 17C12 17 15 15 18 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-bold text-xl text-brand-dark dark:text-white">PromoHouse</span>
        </div>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
          <Input 
            type="text" 
            placeholder="Search for surplus food, groceries..." 
            className="w-full rounded-full bg-zinc-50 border-zinc-200 pl-4 py-6 text-sm pr-12 focus-visible:ring-brand-primary" 
          />
          <Button size="icon" className="absolute right-2 top-1.5 rounded-full bg-brand-primary hover:bg-brand-primary-hover text-white h-9 w-9">
            <Search size={18} />
          </Button>
        </div>

        {/* Links & CTA */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex flex-col items-center justify-center cursor-pointer group text-zinc-600 dark:text-zinc-300 hover:text-brand-primary">
            <div className="relative">
              <Heart size={24} className="group-hover:text-brand-primary transition-colors" />
              <div className="absolute -top-1.5 -right-1.5 bg-brand-orange text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">2</div>
            </div>
            <span className="text-xs font-semibold mt-1">Wishlist</span>
          </div>

          <div className="hidden lg:flex flex-col items-center justify-center cursor-pointer group text-zinc-600 dark:text-zinc-300 hover:text-brand-primary">
            <Store size={24} className="group-hover:text-brand-primary transition-colors" />
            <span className="text-xs font-semibold mt-1">Sell on PromoHouse</span>
          </div>

          <Button className="rounded-full bg-brand-primary hover:bg-brand-primary-hover text-white px-6 py-5 font-bold">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  )
}
