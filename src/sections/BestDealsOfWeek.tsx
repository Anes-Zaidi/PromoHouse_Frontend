import { useState } from "react"
import { motion } from "motion/react"
import { ArrowRight, ChevronRight } from "lucide-react"

const BEST_DEALS_SIDE = [
  {
    id: 1,
    title: "Organic Avocado Box",
    newPrice: "$12.00",
    oldPrice: "$24.00",
    store: "Green Grocers",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 2,
    title: "Fresh Sourdough Bread",
    newPrice: "$3.50",
    oldPrice: "$7.00",
    store: "City Bakery",
    image: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 3,
    title: "Premium Beef Cuts",
    newPrice: "$15.00",
    oldPrice: "$30.00",
    store: "Organic Hub",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=200"
  }
];

export default function BestDealsOfWeek({ onAction }: { onAction: (msg: string) => void }) {
  const [activeTab, setActiveTab] = useState('Trending 🔥');
  const tabs = ['Trending 🔥', 'Ending Soon ⏳', 'Most reserved 🏆'];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 xl:px-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <div>
            <h2 className="text-4xl font-bold text-brand-dark mb-4 tracking-tight">Weekly <span className="text-brand-primary">Highlights</span></h2>
            <p className="text-zinc-500 max-w-md">Our hand-picked selection of the most popular and best value deals this week.</p>
          </div>
          <div className="flex bg-zinc-100 p-1.5 rounded-2xl">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab 
                  ? 'bg-white text-brand-dark shadow-sm' 
                  : 'text-zinc-500 hover:text-zinc-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative h-[550px] rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=1200" 
              alt="Featured" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 w-full p-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-brand-light text-brand-dark text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Patisserie</span>
                <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">20 items left</span>
              </div>
              <h3 className="text-4xl font-bold text-white mb-6 leading-tight">Sweet Algerian <br /> Delights</h3>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white/60 text-sm line-through mb-1">1,000 DA</p>
                  <p className="text-4xl font-bold text-brand-light">500 DA</p>
                </div>
                <button 
                  onClick={() => onAction("Reserving Sweet Algerian Delights...")}
                  className="w-16 h-16 rounded-full bg-white text-brand-dark flex items-center justify-center hover:bg-brand-light transition-all shadow-xl"
                >
                  <ArrowRight size={24} />
                </button>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col gap-6">
            {BEST_DEALS_SIDE.map((deal, idx) => (
              <motion.div 
                key={deal.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex items-center gap-6 p-5 rounded-[2rem] bg-zinc-50 border border-zinc-100 hover:bg-white hover:shadow-xl transition-all cursor-pointer"
                onClick={() => onAction(`Viewing ${deal.title}...`)}
              >
                <div className="w-28 h-28 rounded-2xl overflow-hidden shrink-0">
                  <img src={deal.image} alt={deal.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-2">{deal.store}</p>
                  <h4 className="text-xl font-bold text-brand-dark mb-4">{deal.title}</h4>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-brand-dark">{deal.newPrice}</span>
                    <span className="text-zinc-400 text-sm line-through">{deal.oldPrice}</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-brand-dark group-hover:text-white transition-all">
                  <ChevronRight size={18} />
                </div>
              </motion.div>
            ))}
            
            <button 
              onClick={() => onAction("Viewing all weekly deals...")}
              className="mt-2 w-full py-5 rounded-2xl border-2 border-dashed border-zinc-200 text-zinc-400 font-bold text-sm uppercase tracking-widest hover:border-brand-primary hover:text-brand-primary transition-all"
            >
              Discover more highlights
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}