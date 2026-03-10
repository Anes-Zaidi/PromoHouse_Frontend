import { motion } from "motion/react"

export default function CTA({ onAction }: { onAction: (msg: string) => void }) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 xl:px-16">
        <div className="bg-brand-dark rounded-[3rem] p-16 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 blur-[100px] rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/10 blur-[100px] rounded-full -ml-32 -mb-32" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8">Ready to start <br /> <span className="text-brand-light">Saving?</span></h2>
            <p className="text-white/60 text-lg mb-12 max-w-xl mx-auto">
              Join thousands of smart shoppers and start discovering amazing local deals today. Save money and help the planet.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => onAction("Redirecting to deals explorer...")}
                className="bg-brand-orange text-white px-10 py-4 rounded-full font-bold text-base hover:bg-brand-orange/90 transition-all shadow-lg"
              >
                Explore Deals Now
              </button>
              <button 
                onClick={() => onAction("Opening dealer registration...")}
                className="bg-white/10 text-white border border-white/20 px-10 py-4 rounded-full font-bold text-base hover:bg-white/20 transition-all"
              >
                Become a Dealer
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}