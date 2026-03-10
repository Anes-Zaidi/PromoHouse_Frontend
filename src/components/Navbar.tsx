import Link from "next/link" // Importation pour la navigation
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Search, MapPin, Phone, Heart, Store } from "lucide-react"

export default function Navbar({ onAction }: { onAction: (msg: string) => void }) {
  return (
<header className="w-full border-b border-zinc-100 bg-white font-sans sticky top-0 z-[100]">

      <div className="bg-brand-dark text-white py-1.5 px-4 sm:px-8 xl:px-16 text-[11px] flex flex-col sm:flex-row items-center justify-between">

        <p className="font-medium">FREE delivery & 40% Discount for your first surplus order!</p>

        <div className="flex items-center gap-6 mt-2 sm:mt-0 font-medium">

          <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-80" onClick={() => onAction("Opening location selector...")}>
            <MapPin size={14} className="fill-current" />
            <span>New York, USA</span>
          </div>

          <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-80" onClick={() => onAction("Calling support...")}>
            <Phone size={14} className="fill-current" />
            <span> +1 (800) 123-4567 </span>
          </div>

        </div>

      </div>

      
      <div className="flex items-center justify-between px-4 sm:px-8 xl:px-16 py-4">
        
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
        <div className="w-12 h-12 rounded-full bg-brand-primary p-0.5 flex items-center justify-center">
  <div className="w-full h-full rounded-full overflow-hidden">
    <img 
      src="/promohouseimg.jpg" 
      alt="Logo PromoHouse" 
      className="w-full h-full object-cover" 
    />
  </div>
</div>

                <span className="font-bold text-xl text-brand-dark dark:text-white">PromoHouse</span>

        </Link>

        
        <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
          <Input 
            type="text" 
            placeholder="Search for surplus food, groceries..." 
            className="w-full rounded-full bg-zinc-50 border-zinc-200 pl-4 py-6 text-sm pr-12 focus-visible:ring-brand-primary" 
          />

          <Button size="icon" className="absolute right-2 top-1.5 rounded-full bg-brand-primary hover:bg-brand-primary/90 text-white h-9 w-9">
            <Search size={18} />
          </Button>

        </div>

      
        <div className="flex items-center gap-6">

          <div 
            className="hidden lg:flex flex-col items-center justify-center cursor-pointer group text-zinc-600 dark:text-zinc-300 hover:text-brand-primary"
            onClick={() => onAction("Opening Wishlist...")}
          >
            <div className="relative">
              <Heart size={24} className="group-hover:text-brand-primary transition-colors" />
              <div className="absolute -top-1.5 -right-1.5 bg-brand-orange text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">2</div>
            </div>

            <span className="text-xs font-semibold mt-1">Wishlist</span>

          </div>

          <div 
            className="hidden lg:flex flex-col items-center justify-center cursor-pointer group text-zinc-600 dark:text-zinc-300 hover:text-brand-primary"
            onClick={() => onAction("Opening Seller Dashboard...")}
          >
            <Store size={24} className="group-hover:text-brand-primary transition-colors" />
            <span className="text-xs font-semibold mt-1">Sell on PromoHouse</span>
          </div>

          
          <Link href="/signup">
            <Button 
              className="rounded-full bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-5 font-bold"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}