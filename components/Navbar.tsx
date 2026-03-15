import Image from "next/image"
import logo from "@/public/logo.png"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Phone, Heart, Store } from "lucide-react"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white font-sans shadow-sm">
      
      {/* Top Banner */}
      <div className="bg-[#104d30] text-white py-2 px-4 sm:px-8 xl:px-16 text-xs flex flex-col sm:flex-row items-center justify-between">
        <p className="font-normal opacity-90">FREE delivery & 40% Discount for your first surplus order!</p>
        <div className="flex items-center gap-6 mt-2 sm:mt-0">
          <div className="flex items-center gap-1.5 opacity-90">
            <MapPin size={14} />
            <span>New York, USA</span>
          </div>
          <div className="flex items-center gap-1.5 opacity-90">
            <Phone size={14} />
            <span>+1 (800) 123-4567</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="flex items-center justify-between px-4 sm:px-8 xl:px-16 py-4 gap-4 bg-white">
        
        {/* Logo  */}
        <div className="flex items-center gap-2 min-w-fit">
          <div className="relative w-10 h-10">
            <Image 
              src={logo} 
              alt="PromoHouse Logo" 
              className="object-contain rounded-xl"
              fill
              priority
            />
          </div>
          <span className="font-bold text-2xl text-[#104d30]">PromoHouse</span>
        </div>

        {/* Barre de Recherche  */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-8 relative">
          <Input 
            type="text" 
            placeholder="Search for surplus food, groceries..." 
            className="w-full rounded-full bg-zinc-50 border-zinc-200 pl-6 py-6 text-sm pr-14 focus-visible:ring-emerald-500" 
          />
          {/* Bouton loupe vert */}
          <Button size="icon" className="absolute right-1.5 top-1.5 rounded-full bg-[#10b981] hover:bg-[#059669] text-white h-9 w-9">
            <Search size={18} />
          </Button>
        </div>

        {/* Liens et Bouton Sign Up */}
        <div className="flex items-center gap-8">
          {/* Wishlist avec badge orange */}
          <div className="hidden lg:flex flex-col items-center justify-center cursor-pointer group text-zinc-600 hover:text-emerald-600 transition-colors">
            <div className="relative">
              <Heart size={24} strokeWidth={1.5} />
              <div className="absolute -top-1.5 -right-2 bg-orange-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-white">
                2
              </div>
            </div>
            <span className="text-xs font-medium mt-1">Wishlist</span>
          </div>

          {/* Sell link */}
          <div className="hidden lg:flex flex-col items-center justify-center cursor-pointer group text-zinc-600 hover:text-emerald-600 transition-colors">
            <Store size={24} strokeWidth={1.5} />
            <span className="text-xs font-medium mt-1">Sell on PromoHouse</span>
          </div>

          {/* Bouton d'inscription vert */}
          <Button className="rounded-full bg-[#10b981] hover:bg-[#059669] text-white px-8 py-6 font-bold text-base shadow-sm">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  )
}