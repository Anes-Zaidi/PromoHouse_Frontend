import { motion } from "motion/react"
import { ShoppingBag, CheckCircle2, Store } from "lucide-react"

export default function HowItWorks() {
  return (
    <section className="py-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 xl:px-16">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-brand-dark mb-4 tracking-tight">How it <span className="text-brand-primary">Works</span></h2>
          <p className="text-zinc-500 max-w-xl mx-auto">Discovering and grabbing great deals is easier than you think. Follow these simple steps to start saving.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            { 
              step: "01", 
              title: "Discover Deals", 
              desc: "Browse through hundreds of local deals in your area. Use filters to find exactly what you're looking for.",
              icon: <ShoppingBag className="text-brand-primary" size={32} />
            },
            { 
              step: "02", 
              title: "Reserve Item", 
              desc: "Found something you like? Reserve it immediately with one click to ensure you don't miss out.",
              icon: <CheckCircle2 className="text-brand-primary" size={32} />
            },
            { 
              step: "03", 
              title: "Pick Up & Save", 
              desc: "Head to the store, show your reservation, and pick up your items. It's that simple!",
              icon: <Store className="text-brand-primary" size={32} />
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-zinc-100 relative group"
            >
              <div className="absolute top-8 right-8 text-6xl font-black text-zinc-50 group-hover:text-brand-primary/10 transition-colors">{item.step}</div>
              <div className="mb-8 relative z-10">{item.icon}</div>
              <h3 className="text-2xl font-bold text-brand-dark mb-4 relative z-10">{item.title}</h3>
              <p className="text-zinc-500 leading-relaxed relative z-10">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
