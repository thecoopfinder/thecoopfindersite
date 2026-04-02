import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

          {/* Brand */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
            <img
              src="/tessa-logo.png"
              alt="Tessa Hood – The Coop Finder"
              className="h-16 w-auto object-contain object-left brightness-0 invert"
            />
            <p className="opacity-80 italic">"Find Your Coop and Live Your Dream"</p>
            <p className="opacity-60 text-sm">Knight Land Company</p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 font-serif text-lg">Contact</h4>
            <ul className="space-y-2 opacity-80 text-sm">
              <li>
                <a href="tel:405-913-4185" className="hover:text-secondary transition-colors">
                  405-913-4185
                </a>
              </li>
              <li>
                <a href="mailto:TessaHood@TheCoopFinder.com" className="hover:text-secondary transition-colors break-all">
                  TessaHood@TheCoopFinder.com
                </a>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.facebook.com/thecoopfinder/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
                aria-label="Facebook – The Coop Finder"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="#"
                className="hover:text-secondary transition-colors opacity-40 cursor-not-allowed"
                aria-label="Instagram – coming soon"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://youtube.com/@thecoopfinder"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
                aria-label="YouTube – The Coop Finder"
              >
                <FaYoutube size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 font-serif text-lg">Quick Links</h4>
            <ul className="space-y-2 opacity-80 text-sm">
              <li><Link href="/" className="hover:text-secondary transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-secondary transition-colors">About Tessa</Link></li>
              <li><Link href="/buyers" className="hover:text-secondary transition-colors">Buyers</Link></li>
              <li><Link href="/sellers" className="hover:text-secondary transition-colors">Sellers</Link></li>
              <li><Link href="/communities" className="hover:text-secondary transition-colors">Communities</Link></li>
              <li><Link href="/featured-properties" className="hover:text-secondary transition-colors">Featured Properties</Link></li>
              <li><Link href="/around-the-coop" className="hover:text-secondary transition-colors">Around the Coop</Link></li>
              <li><Link href="/contact" className="hover:text-secondary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center text-xs opacity-50 gap-4 text-center md:text-left">
          <p>© 2026 Tessa Hood – The Coop Finder | Knight Land Company. All rights reserved.</p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span>Equal Housing Opportunity</span>
            {/* PLACEHOLDER: Oklahoma real estate license number */}
            {/* PLACEHOLDER: Brokerage disclaimer and licensing language */}
          </div>
        </div>
      </div>
    </footer>
  );
}
