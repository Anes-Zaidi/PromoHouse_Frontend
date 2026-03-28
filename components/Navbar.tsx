"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/public/logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Phone, Heart, Store, LogOut, Settings, User, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        logger.error("Error fetching session:", error);
      } else {
        setUser(session?.user ?? null);
      }
    };

    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      logger.error("Error signing out:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white font-sans shadow-sm">
      
      {/* Top Banner */}
      <div className="bg-brand-dark text-white py-2 px-4 sm:px-8 xl:px-16 text-xs flex flex-col sm:flex-row items-center justify-between">
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
          <Link href="/">
            <div className="relative w-10 h-10 cursor-pointer">
              <Image 
                src={logo} 
                alt="PromoHouse Logo" 
                className="object-contain rounded-xl"
                fill
                priority
              />
            </div>
          </Link>
          <Link href="/">
            <span className="font-bold text-2xl text-brand-dark cursor-pointer">PromoHouse</span>
          </Link>
        </div>

        {/* Barre de Recherche  */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-8 relative">
          <Input 
            type="text" 
            placeholder="Search for surplus food, groceries..." 
            className="w-full rounded-full bg-zinc-50 border-zinc-200 pl-6 py-6 text-sm pr-14 focus-visible:ring-emerald-500" 
          />
          {/* Bouton loupe vert */}
          <Button size="icon" className="absolute right-1.5 top-1.5 rounded-full bg-brand-primary hover:bg-brand-primary-hover text-white h-9 w-9">
            <Search size={18} />
          </Button>
        </div>

        
        <div className="flex items-center gap-8">
          {/* Wishlist avec badge orange */}
          <div className="hidden lg:flex flex-col items-center justify-center cursor-pointer group text-zinc-600 hover:text-emerald-600 transition-colors">
            <div className="relative">
              <Heart size={24} strokeWidth={1.5} />
              <div className="absolute -top-1.5 -right-2 bg-brand-orange text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-white">
                2
              </div>
            </div>
            <span className="text-xs font-medium mt-1">Wishlist</span>
          </div>

          
          <div className="hidden lg:flex flex-col items-center justify-center cursor-pointer group text-zinc-600 hover:text-emerald-600 transition-colors">
            <Store size={24} strokeWidth={1.5} />
            <span className="text-xs font-medium mt-1">Sell on PromoHouse</span>
          </div>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-12 w-12 rounded-full ring-2 ring-brand-primary/20 hover:ring-brand-primary transition-all p-0">
                  <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                    <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.full_name || "User"} />
                    <AvatarFallback className="bg-brand-primary/10 text-brand-primary font-bold">
                      {user.user_metadata?.full_name?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.user_metadata?.full_name || "Shopper"}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer flex items-center w-full">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer flex items-center w-full">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer flex items-center w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/signup">
              <Button className="rounded-full bg-brand-primary hover:bg-brand-primary-hover text-white px-8 py-6 font-bold text-base shadow-sm">
                Sign Up
              </Button>
            </Link>
          )}

        </div>
      </div>
    </header>
  )
}