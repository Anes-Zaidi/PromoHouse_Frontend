import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

export function HeroVisual() {
  return (
    <div className="flex-1 relative w-full mt-10 lg:mt-0 flex justify-center lg:justify-end z-10">
      <div className="relative w-full max-w-md aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border-4 border-white/10 bg-zinc-800">
        <img
          src="https://www.linecoaching.com/sites/linecoaching/files/2020-09/Fruits%20l%C3%A9gumes%20saison.jpg"
          alt="Fresh produce"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-8 -right-2.5 sm:right-0 lg:-right-8 bg-white rounded-2xl p-4 shadow-xl flex items-center gap-4 z-20"
      >
        <div className="bg-emerald-100 text-emerald-600 h-10 w-10 rounded-full flex items-center justify-center">
          <Check size={24} />
        </div>
        <div>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Total Savings</p>
          <p className="text-zinc-900 text-lg font-extrabold">$124.50</p>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 -left-2.5 sm:left-4 lg:-left-12 bg-white rounded-2xl p-4 shadow-xl flex items-center gap-4 max-w-[240px] z-20"
      >
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-brand-primary bg-zinc-200 shrink-0">
          <img
            src="https://picsum.photos/seed/user/100/100"
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center text-amber-400 gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={12} className="fill-current" />
            ))}
          </div>
          <p className="text-zinc-800 text-xs font-semibold mt-1">"Great quality & prices!"</p>
        </div>
      </motion.div>
    </div>
  );
}
