import { useState } from "react"
import { motion } from "motion/react"
import { Star, ArrowRight } from "lucide-react"
import Image from "next/image"

const TESTIMONIALS = [
  {
    id: 1,
    name: "Annette Black",
    role: "Teacher",
    quote: "PromoHouse has changed how I shop for groceries. I save at least $200 a month and I feel great about reducing food waste.",
    rating: 5,
    image: "https://i.pravatar.cc/100?u=annette",
    bgColor: "bg-yellow-50/50"
  },
  {
    id: 2,
    name: "Ralph Edwards",
    role: "Chef",
    quote: "The quality of food is surprisingly good. Most items are just near the best-before date but perfectly fine to eat. Highly recommend!",
    rating: 5,
    image: "https://i.pravatar.cc/100?u=ralph",
    bgColor: "bg-green-50/50"
  },
  {
    id: 3,
    name: "Jane Cooper",
    role: "Student",
    quote: "Fast delivery and great customer service. The app is super easy to use to find deals near my workplace.",
    rating: 4,
    image: "https://i.pravatar.cc/100?u=jane",
    bgColor: "bg-orange-50/50"
  }
];

export default function StatsAndTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonial = TESTIMONIALS[activeIndex];

  return (
    <section className="py-24 bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 xl:px-16">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-8">What our <br /> <span className="text-brand-light">Community</span> says</h2>
            <p className="text-white/60 text-lg mb-12 max-w-md">
              Real feedback from shoppers who are saving money every day with PromoHouse while helping to reduce food waste.
            </p>
            
            <div className="flex gap-4">
              <button 
                onClick={() => setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-brand-dark transition-all"
              >
                <ArrowRight size={20} className="rotate-180" />
              </button>
              <button 
                onClick={() => setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1))}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-brand-dark transition-all"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>

          <motion.div 
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-12 rounded-[3rem] bg-white text-brand-dark border border-white/10 relative overflow-hidden shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <img src={testimonial.image} className="w-16 h-16 rounded-2xl object-cover" alt={testimonial.name} referrerPolicy="no-referrer" />
              <div>
                <p className="font-bold text-xl">{testimonial.name}</p>
                <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-2xl font-medium italic mb-8 leading-relaxed">
              &quot;{testimonial.quote}&quot;
            </p>
            <div className="flex text-brand-warning gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill={i < testimonial.rating ? "currentColor" : "none"} />)}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}