import Hero from "@/sections/Hero";
import Navbar from "@/components/Navbar";
import CartSection from "@/sections/CartSection";
import DealerSection from "@/sections/DealerSection";
import Banner from "@/components/Banner";
import ExploreDeals from "@/sections/ExploreDeals";
import CommentSection from "@/sections/CommentSection" ;
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground w-full overflow-x-hidden">
      <Navbar/>
      <main className="w-full flex-col items-center justify-between">
        <Hero/>
        {/* Placeholder for the rest of the content (Deals near California etc.) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 xl:px-16 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold flex items-center gap-2">
                Deals near <span className="text-brand-primary">California</span> 
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-primary">
                  <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" fill="currentColor"/>
                </svg>
              </h2>
              <p className="text-muted-foreground mt-2">Discover surplus food deals in your local area and save big.</p>
            </div>
            <a href="#" className="text-brand-primary font-bold flex items-center gap-1 hover:underline">
              View all deals →
            </a>
          </div>
        </div>
        <CartSection/>
        <DealerSection/>
        <Banner/>
        <ExploreDeals/>
        <CommentSection/>
        <Footer/>

      </main>
    </div>
  );
}
