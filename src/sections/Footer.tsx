import { Store, MapPin, Phone } from "lucide-react"

export default function Footer({ onAction }: { onAction: (msg: string) => void }) {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-brand-dark p-2 rounded-lg">
                <Store className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold text-brand-dark tracking-tight">PromoHouse</span>
            </div>
            <p className="text-zinc-500 mb-8 leading-relaxed">
              The leading platform for surplus and near-expiry food deals. Save money, reduce waste, and support local businesses.
            </p>
            <div className="flex gap-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map(social => (
                <button key={social} className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-400 hover:bg-brand-dark hover:text-white transition-all">
                  <div className="capitalize font-bold text-[10px]">{social[0]}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-zinc-900 mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Explore Deals', 'Trusted Dealers', 'How it Works', 'About Us'].map(link => (
                <li key={link}>
                  <button onClick={() => onAction(`Navigating to ${link}...`)} className="text-zinc-500 hover:text-brand-dark transition-colors">{link}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-zinc-900 mb-6">Support</h4>
            <ul className="space-y-4">
              {['Help Center', 'Safety Center', 'Terms of Service', 'Privacy Policy', 'Cookie Policy'].map(link => (
                <li key={link}>
                  <button onClick={() => onAction(`Navigating to ${link}...`)} className="text-zinc-500 hover:text-brand-dark transition-colors">{link}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-zinc-900 mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-zinc-500">
                <MapPin size={20} className="text-brand-primary shrink-0" />
                <span>123 Market St, San Francisco, CA 94103</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-500">
                <Phone size={20} className="text-brand-primary shrink-0" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-500">
                <div className="w-5 h-5 bg-brand-primary rounded-full flex items-center justify-center text-white text-[10px] font-bold">@</div>
                <span>support@promohouse.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-400 text-sm">© 2024 PromoHouse. All rights reserved.</p>
          <div className="flex gap-8">
            <button className="text-zinc-400 text-sm hover:text-brand-dark">Privacy Policy</button>
            <button className="text-zinc-400 text-sm hover:text-brand-dark">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
}