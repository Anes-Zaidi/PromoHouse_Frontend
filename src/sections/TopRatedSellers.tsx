import { motion } from "motion/react"
import { CheckCircle2 } from "lucide-react"

const TOP_SELLERS = [
  {
    id: 1,
    name: "Green Grocers",
    role: "Since 2018 • San Francisco",
    sales: "2.5k",
    rating: 4.9,
    saved: "98%",
    categories: ["Vegetables", "Fruits"],
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200",
    color: "border-green-500"
  },
  {
    id: 2,
    name: "City Bakery",
    role: "Since 2015 • New York",
    sales: "1.2k",
    rating: 4.7,
    saved: "95%",
    categories: ["Bread", "Pastries"],
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=200",
    color: "border-orange-500"
  },
  {
    id: 3,
    name: "Organic Hub",
    role: "Since 2020 • Austin",
    sales: "3.8k",
    rating: 4.8,
    saved: "99%",
    categories: ["Organic", "Dairy"],
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=400",
    color: "border-blue-500",
    isLarge: true
  }
];

export default function TopRatedSellers({ onAction }: { onAction: (msg: string) => void }) {
  return (
    <section className="py-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 xl:px-16">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-brand-dark mb-4 tracking-tight">Trusted <span className="text-brand-primary">Dealers</span></h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">We partner with certified local businesses committed to reducing food waste while providing quality products.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {TOP_SELLERS.map((seller) => (
            <motion.div 
              key={seller.id}
              whileHover={{ y: -10 }}
              className={`bg-white rounded-[2.5rem] p-10 shadow-sm hover:shadow-2xl transition-all border border-zinc-100 relative overflow-hidden group`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-[50px] rounded-full -mr-16 -mt-16 group-hover:bg-brand-primary/10 transition-colors" />
              
              <div className="flex items-center gap-5 mb-10">
                <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden border-2 border-zinc-50 shadow-sm">
                  <img src={seller.image} alt={seller.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-brand-dark flex items-center gap-2">
                    {seller.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="bg-brand-primary/10 text-brand-primary text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 size={10} /> Verified
                    </span>
                    <span className="text-xs text-zinc-400 font-medium">{seller.role}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-10">
                <div className="text-center">
                  <p className="text-xl font-bold text-brand-dark">{seller.rating}</p>
                  <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest mt-1">Rating</p>
                </div>
                <div className="text-center border-x border-zinc-100">
                  <p className="text-xl font-bold text-brand-dark">{seller.sales}</p>
                  <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest mt-1">Sales</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-brand-dark">{seller.saved}</p>
                  <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest mt-1">Saved</p>
                </div>
              </div>

              <div className="mb-10">
                <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest mb-4">Top Categories:</p>
                <div className="flex flex-wrap gap-2">
                  {seller.categories.map(cat => (
                    <span key={cat} className="bg-zinc-50 text-zinc-600 text-[10px] font-bold px-4 py-1.5 rounded-xl border border-zinc-100 group-hover:bg-brand-primary/5 group-hover:text-brand-primary group-hover:border-brand-primary/10 transition-colors">{cat}</span>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => onAction(`Opening ${seller.name}'s profile...`)}
                className="w-full py-4 rounded-2xl bg-brand-dark text-white font-bold text-sm hover:bg-brand-primary transition-all shadow-lg shadow-brand-dark/10"
              >
                View Profile
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
