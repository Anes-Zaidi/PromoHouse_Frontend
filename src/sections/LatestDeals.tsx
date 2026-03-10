import { motion } from "motion/react"
import { MapPin, ArrowRight, Star, Calendar, Plus } from "lucide-react"

const LATEST_DEALS = [
  {
    id: 1,
    title: "Organic Vegetable Bundle Box",
    store: "Whole Foods Market",
    oldPrice: "$24.00",
    newPrice: "$12.99",
    discount: "-45% OFF",
    rating: 4.5,
    reviews: 45,
    timeLeft: "2 days left",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 2,
    title: "Assorted Artisan Breads",
    store: "Local Bakery",
    oldPrice: "$8.50",
    newPrice: "$5.99",
    discount: "-30% OFF",
    rating: 4.2,
    reviews: 12,
    timeLeft: "5 days left",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 3,
    title: "Seasonal Fruit Basket",
    store: "Fresh Farms",
    oldPrice: "$21.00",
    newPrice: "$8.49",
    discount: "-60% OFF",
    rating: 4.8,
    reviews: 128,
    timeLeft: "1 day left",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 4,
    title: "Premium Cheese Selection",
    store: "Dairy King",
    oldPrice: "$20.00",
    newPrice: "$15.00",
    discount: "-25% OFF",
    rating: 4.0,
    reviews: 32,
    timeLeft: "3 days left",
    image: "https://images.unsplash.com/photo-1486297678162-ad2a19b05840?auto=format&fit=crop&q=80&w=400"
  }
];

export default function LatestDeals({ onAction }: { onAction: (msg: string) => void }) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 xl:px-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-bold text-brand-dark mb-4 tracking-tight">
              Deals near <span className="text-brand-primary border-b-4 border-brand-primary/20">California</span> <MapPin className="inline-block text-brand-primary ml-2" size={32} />
            </h2>
            <p className="text-zinc-500 max-w-lg">Discover surplus food deals in your local area and save big while helping to reduce food waste.</p>
          </div>
          <button 
            onClick={() => onAction("Viewing all deals...")}
            className="bg-zinc-50 text-brand-dark px-8 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-brand-primary hover:text-white transition-all shadow-sm"
          >
            View all deals <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {LATEST_DEALS.map((deal) => (
            <motion.div 
              key={deal.id}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-zinc-100 group cursor-pointer"
              onClick={() => onAction(`Reserving ${deal.title}...`)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={deal.image} alt={deal.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute top-4 left-4 bg-red-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-lg">
                  {deal.discount}
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-brand-dark text-[11px] font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg">
                  <Calendar size={14} className="text-brand-orange" /> {deal.timeLeft}
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{deal.store}</p>
                  <div className="flex items-center gap-1 text-brand-warning">
                    <Star size={12} fill="currentColor" />
                    <span className="text-[10px] font-bold text-zinc-900">{deal.rating}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-6 line-clamp-1 group-hover:text-brand-primary transition-colors">{deal.title}</h3>
                
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-zinc-400 text-xs line-through mb-0.5">{deal.oldPrice}</span>
                    <span className="text-2xl font-bold text-brand-dark">{deal.newPrice}</span>
                  </div>
                  <button className="bg-brand-primary text-white p-3.5 rounded-2xl hover:bg-brand-dark transition-all shadow-lg shadow-brand-primary/20 group-hover:scale-110">
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
