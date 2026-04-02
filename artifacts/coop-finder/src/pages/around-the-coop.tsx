import { Link } from "wouter";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

/* UPDATE WEEKLY: Duplicate card patterns below to add new community spotlights, business features, tips, and videos */

type Category = "all" | "spotlights" | "businesses" | "buyer-tips" | "seller-tips" | "videos";

const categoryLabels: Record<Category, string> = {
  all: "All",
  spotlights: "Community Spotlights",
  businesses: "Local Businesses",
  "buyer-tips": "Buyer Tips",
  "seller-tips": "Seller Tips",
  videos: "Featured Videos",
};

export default function AroundTheCoopPage() {
  usePageMeta({
    title: "Around the Coop | Community Spotlights, Local Businesses & Real Estate Tips",
    description: "Explore community spotlights, local business features, buyer tips, seller tips, and featured videos for Newcastle, Tuttle, Blanchard, and the South OKC area.",
    ogTitle: "Around the Coop – Tessa Hood, The Coop Finder",
    ogDescription: "Your hub for community content, local business spotlights, and real estate education for the Newcastle, Tuttle, and Blanchard area.",
  });

  /* SCHEMA: Blog / ItemList structured data — add JSON-LD here */

  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const categories: Category[] = ["all", "spotlights", "businesses", "buyer-tips", "seller-tips", "videos"];

  return (
    <div className="w-full">

      {/* ── HERO ── */}
      <section className="relative py-20 md:py-32 bg-card">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold font-serif text-foreground">Around the Coop</h1>
            <p className="text-xl md:text-2xl text-foreground/80 font-light">
              Community spotlights, local business features, buyer and seller education, and more — all centered on the Newcastle, Tuttle, and Blanchard area.
            </p>
          </div>
        </div>
      </section>

      {/* ── FEATURED POST ── */}
      <section className="py-16 bg-background">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="aspect-[21/9] md:aspect-[21/7] rounded-2xl overflow-hidden bg-[#d4c5a9] relative mb-8 shadow-md">
            <div className="absolute top-6 left-6 z-20">
              <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm">Featured</span>
            </div>
            {/* PHOTO / THUMBNAIL: Featured video or spotlight image */}
            <img src="" alt="Featured content – Around the Coop, The Coop Finder" className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 p-8 z-20 text-white w-full md:w-2/3">
              <span className="text-xs font-bold uppercase tracking-widest text-white/80 mb-2 block">Market Update</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">Tri-City Real Estate Market Update</h2>
              <p className="text-white/80 line-clamp-2">A current look at market trends, inventory, and what buyers and sellers can expect across Newcastle, Tuttle, and Blanchard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORY FILTERS ── */}
      <section className="py-4 bg-background border-b border-border sticky top-16 z-20">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-foreground/70 border-border hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY SPOTLIGHTS ── */}
      {(activeCategory === "all" || activeCategory === "spotlights") && (
        <section id="spotlights" className="py-16 bg-background scroll-mt-28">
          <div className="container px-4 max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8 border-b border-border pb-3">Community Spotlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Newcastle Community Highlights", teaser: "A look at local events, parks, and community resources available to residents of Newcastle, Oklahoma." },
                { title: "What's Happening in Tuttle", teaser: "Community updates and local happenings in Tuttle, Oklahoma — a growing rural community west of Oklahoma City." },
                { title: "Blanchard: Town & Community", teaser: "An overview of what Blanchard offers residents, from its historic downtown to open land and local amenities." },
              ].map((card, i) => (
                <Card key={i} className="overflow-hidden border-border shadow-sm bg-card group">
                  <div className="aspect-video relative bg-[#d4c5a9]">
                    {/* PHOTO: Community spotlight image */}
                    <img src="" alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center text-foreground/50 z-10 font-medium text-xs p-4 text-center">[Community Spotlight Photo {i + 1}]</div>
                  </div>
                  <CardContent className="p-6">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2 block">Community Spotlight</span>
                    <h3 className="text-xl font-bold font-serif mb-2">{card.title}</h3>
                    <p className="text-foreground/70 text-sm mb-4 leading-relaxed">{card.teaser}</p>
                    <Link href="/communities" className="text-primary text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                      Explore Communities <ArrowRight className="w-3 h-3" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── LOCAL BUSINESSES ── */}
      {(activeCategory === "all" || activeCategory === "businesses") && (
        <section id="businesses" className="py-16 bg-card/50 scroll-mt-28">
          <div className="container px-4 max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 border-b border-border pb-3">Local Businesses</h2>
            <p className="text-foreground/70 mb-8 text-sm">Supporting and spotlighting local businesses across Newcastle, Tuttle, Blanchard, and the South OKC area.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Local Business Spotlight #1", teaser: "A featured local business in the Newcastle, Tuttle, or Blanchard area — coffee shop, restaurant, service provider, or local staple." },
                { title: "Local Business Spotlight #2", teaser: "Highlighting the independent businesses and services that make the Tri-City area a great place to live and work." },
                { title: "Local Business Spotlight #3", teaser: "Another community business worth knowing about for new residents and longtime locals alike." },
              ].map((card, i) => (
                <Card key={i} className="overflow-hidden border-border shadow-sm bg-background group">
                  <div className="aspect-video relative bg-[#d4c5a9]">
                    {/* PHOTO: Local business photo */}
                    <img src="" alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center text-foreground/50 z-10 font-medium text-xs p-4 text-center">[Local Business Photo {i + 1}]</div>
                  </div>
                  <CardContent className="p-6">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2 block">Local Business</span>
                    <h3 className="text-xl font-bold font-serif mb-2">{card.title}</h3>
                    <p className="text-foreground/70 text-sm mb-4 leading-relaxed">{card.teaser}</p>
                    <span className="text-primary text-sm font-medium cursor-pointer hover:underline">Read More →</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BUYER TIPS ── */}
      {(activeCategory === "all" || activeCategory === "buyer-tips") && (
        <section id="buyer-tips" className="py-16 bg-background scroll-mt-28">
          <div className="container px-4 max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 border-b border-border pb-3">Buyer Tips</h2>
            <p className="text-foreground/70 mb-8 text-sm">Practical guidance for home buyers at every stage of the process.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Get Pre-Approved Before You Start Looking", body: "Pre-approval gives you a clear budget, strengthens your offers, and helps you move quickly when you find the right property. I connect buyers with trusted local lenders who make this process straightforward." },
                { title: "Understanding the Home Inspection Process", body: "A home inspection is one of the most important steps in a real estate transaction. Knowing what to expect — and how to use the results — makes a real difference in your final outcome." },
                { title: "Buying Acreage or Rural Property in Oklahoma", body: "Land and acreage transactions have unique considerations including wells, septic systems, easements, and agricultural zoning. Here's what buyers should know before searching for rural properties." },
              ].map((card, i) => (
                <Card key={i} className="border-border shadow-sm bg-card p-6 flex flex-col gap-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">Buyer Tip</span>
                  <h3 className="text-xl font-serif font-bold text-foreground">{card.title}</h3>
                  <p className="text-foreground/70 leading-relaxed flex-1 text-sm">{card.body}</p>
                  <Link href="/buyers" className="text-primary font-medium inline-flex items-center gap-1 hover:gap-2 transition-all mt-2 text-sm">
                    Buyer Information <ArrowRight className="w-3 h-3" />
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SELLER TIPS ── */}
      {(activeCategory === "all" || activeCategory === "seller-tips") && (
        <section id="seller-tips" className="py-16 bg-card/50 scroll-mt-28">
          <div className="container px-4 max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 border-b border-border pb-3">Seller Tips</h2>
            <p className="text-foreground/70 mb-8 text-sm">Advice to help sellers prepare, price, and navigate the market with confidence.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "How Presentation Affects Your Sale", body: "The way a home looks online and in person directly impacts buyer interest and offer activity. Simple, targeted improvements before listing can meaningfully affect your results." },
                { title: "Understanding Your Comparative Market Analysis", body: "A CMA is the foundation of smart pricing. Here's how to read one, what it tells you about your market, and how to use it to set a competitive and realistic list price." },
                { title: "Navigating Offers and Negotiations", body: "When offers come in, the work is just beginning. Understanding your options — countering, accepting, or rejecting — and knowing what terms matter most puts you in a stronger position." },
              ].map((card, i) => (
                <Card key={i} className="border-border shadow-sm bg-background p-6 flex flex-col gap-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">Seller Tip</span>
                  <h3 className="text-xl font-serif font-bold text-foreground">{card.title}</h3>
                  <p className="text-foreground/70 leading-relaxed flex-1 text-sm">{card.body}</p>
                  <Link href="/sellers" className="text-primary font-medium inline-flex items-center gap-1 hover:gap-2 transition-all mt-2 text-sm">
                    Seller Information <ArrowRight className="w-3 h-3" />
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FEATURED VIDEOS ── */}
      {(activeCategory === "all" || activeCategory === "videos") && (
        <section id="videos" className="py-16 bg-background scroll-mt-28">
          <div className="container px-4 max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 border-b border-border pb-3">Featured Videos</h2>
            <p className="text-foreground/70 mb-8 text-sm">Market updates, property tours, and community content — updated regularly.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Market Update Video", label: "Market Update" },
                { title: "Property Tour or Spotlight", label: "Property Tour" },
                { title: "Community or Lifestyle Feature", label: "Community Feature" },
              ].map((card, i) => (
                <Card key={i} className="overflow-hidden border-border shadow-sm bg-card group cursor-pointer">
                  <div className="aspect-video relative bg-[#d4c5a9]">
                    {/* VIDEO THUMBNAIL: Embed YouTube thumbnail or video preview here */}
                    <img src="" alt={card.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-end justify-start p-4 bg-gradient-to-t from-black/50 to-transparent z-0" />
                  </div>
                  <CardContent className="p-5">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1 block">{card.label}</span>
                    <h3 className="font-serif font-bold text-base">{card.title}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── INTERNAL LINKS ── */}
      <section className="py-16 bg-card/50">
        <div className="container px-4 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
            <div className="p-6 rounded-xl border border-border bg-background">
              <h3 className="font-serif font-bold text-lg mb-2">Explore the Communities</h3>
              <p className="text-foreground/70 text-sm mb-4">Learn more about Newcastle, Tuttle, Blanchard, and surrounding areas.</p>
              <Button asChild variant="outline" size="sm"><Link href="/communities">View All Communities</Link></Button>
            </div>
            <div className="p-6 rounded-xl border border-border bg-background">
              <h3 className="font-serif font-bold text-lg mb-2">Ready to Make a Move?</h3>
              <p className="text-foreground/70 text-sm mb-4">Reach out to start a conversation about buying or selling.</p>
              <Button asChild variant="outline" size="sm"><Link href="/contact">Contact Tessa</Link></Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
