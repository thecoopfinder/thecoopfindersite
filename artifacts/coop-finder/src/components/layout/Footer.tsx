import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-serif text-2xl font-bold mb-2">Tessa Hood</h3>
            <p className="text-secondary font-serif uppercase tracking-wider text-sm mb-4">The Coop Finder</p>
            <p className="mb-2 opacity-80 max-w-sm">"Find Your Coop and Live Your Dream"</p>
            <p className="opacity-80">Knight Land Company</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 font-serif text-lg">Contact</h4>
            <ul className="space-y-2 opacity-80">
              <li>Phone: 405-913-4185</li>
              <li>Email: TessaHood@TheCoopFinder.com</li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a href="#" className="hover:text-secondary transition-colors" aria-label="Facebook">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="hover:text-secondary transition-colors" aria-label="Instagram">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="hover:text-secondary transition-colors" aria-label="YouTube">
                <FaYoutube size={24} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 font-serif text-lg">Quick Links</h4>
            <ul className="space-y-2 opacity-80">
              <li><Link href="/" className="hover:text-secondary transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-secondary transition-colors">About Tessa</Link></li>
              <li><Link href="/communities" className="hover:text-secondary transition-colors">Communities</Link></li>
              <li><Link href="/contact" className="hover:text-secondary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm opacity-60 gap-4 text-center md:text-left">
          <p>Copyright © 2025 Tessa Hood – The Coop Finder | Knight Land Company. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Equal Housing Opportunity</span>
            {/* PLACEHOLDER: Oklahoma real estate license number */}
            {/* PLACEHOLDER: Brokerage disclaimer and licensing language */}
          </div>
        </div>
      </div>
    </footer>
  );
}