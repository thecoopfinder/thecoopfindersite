import { Link } from "wouter";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { VideoModal } from "@/components/VideoModal";

/* UPDATE WEEKLY: Duplicate card patterns below to add new community spotlights, business features, tips, and videos */

type Category = "all" | "spotlights" | "businesses" | "buyer-tips" | "seller-tips" | "videos";

const categoryLabels: Record<Category, string> = {
  all: "All",
  spotlights: "Community Spotlights",
  businesses: "Local Businesses",
  "buyer-tips": "Buyer Tips",
  "seller-tips": "Seller Tips",
  videos: "All Videos",
};

function ytThumb(id: string) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}
function ytUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}

const spotlights = [
  {
    videoId: "JqBPmvrN7eg",
    title: "Things to Do in Newcastle, OK | Library Tour + Kids Activities",
    teaser: "A look inside the Newcastle Public Library and what it offers families — from learning tablets and activity kits to a 3D printer and local experience passes.",
    location: "Newcastle, OK",
  },
  {
    videoId: "3qGDepuLOcY",
    title: "Mind of Christ Academy Tuttle, OK | Faith-Based Homeschool Program Tour",
    teaser: "A tour of Mind of Christ Academy in Tuttle — a faith-based homeschool cooperative offering core subjects alongside enrichment classes for local families.",
    location: "Tuttle, OK",
  },
];

const businesses = [
  {
    videoId: "VPCIWvD-1BA",
    title: "Ten Arrows Coffee, Blanchard OK | Local Coffee Shop + Bistro Tour",
    teaser: "A visit to Ten Arrows Coffee & Bistro in Blanchard — a locally owned coffee shop and bistro worth knowing about if you're in the area.",
    location: "Blanchard, OK",
  },
  {
    videoId: "FpZnCbmrW30",
    title: "Happy Heart Homestead Newcastle, OK | Local Farm Store + Fresh Market Tour",
    teaser: "Happy Heart Homestead in Newcastle offers fresh produce, meats, baked goods, and locally sourced pantry staples — a great local resource for the community.",
    location: "Newcastle, OK",
  },
  {
    videoId: "jb0BHqMM6Uo",
    title: "The Outpost on Main Street in Newcastle, OK | Local Business Spotlight",
    teaser: "A spotlight on The Outpost on Main Street in Newcastle — part of the Around the Coop series highlighting local businesses in the Tri-City area.",
    location: "Newcastle, OK",
  },
];

const buyerTips = [
  {
    videoId: "RngFX5wpDaM",
    title: "Should You Find a House First or Get Pre-Approved?",
    teaser: "Most buyers want to start by touring homes — but getting pre-approved first puts you in a much stronger position when you're ready to make an offer.",
    label: "Buyer Tip",
  },
  {
    videoId: "ETkDB-HkJRY",
    title: "Closing Cost Credits — What Buyers and Sellers Should Know",
    teaser: "Closing cost credits can lower a buyer's out-of-pocket costs and help sellers attract more competitive offers. Here's how they work.",
    label: "Buyer & Seller Tip",
  },
  {
    videoId: "DrK6dUACPDg",
    title: "What Makes Up a Monthly Mortgage Payment? (First-Time Buyer Guide)",
    teaser: "A clear breakdown of what goes into a monthly mortgage payment — principal, interest, taxes, and insurance — for first-time home buyers in Oklahoma.",
    label: "Buyer Tip",
  },
];

const allVideos = [
  { videoId: "RngFX5wpDaM", title: "Should You Find a House First or Get Pre-Approved?", label: "Buyer Tip" },
  { videoId: "JqBPmvrN7eg", title: "Things to Do in Newcastle, OK | Library Tour", label: "Community Spotlight" },
  { videoId: "VPCIWvD-1BA", title: "Ten Arrows Coffee, Blanchard OK | Coffee Shop Tour", label: "Local Business" },
  { videoId: "3qGDepuLOcY", title: "Mind of Christ Academy Tuttle, OK | School Tour", label: "Community Spotlight" },
  { videoId: "ETkDB-HkJRY", title: "Closing Cost Credits — What You Need to Know", label: "Buyer & Seller Tip" },
  { videoId: "FpZnCbmrW30", title: "Happy Heart Homestead Newcastle, OK | Farm Store", label: "Local Business" },
  { videoId: "DrK6dUACPDg", title: "What Makes Up a Monthly Mortgage Payment?", label: "Buyer Tip" },
  { videoId: "jb0BHqMM6Uo", title: "The Outpost on Main Street, Newcastle OK", label: "Local Business" },
  { videoId: "Zu14mblmIko", title: "Around the Coop — Latest Video", label: "Featured" },
];

function VideoCard({ videoId, title, label, teaser, onPlay }: { videoId: string; title: string; label: string; teaser?: string; onPlay: (id: string, title: string) => void }) {
  return (
    <Card className="overflow-hidden border-border shadow-sm bg-background group cursor-pointer" onClick={() => onPlay(videoId, title)}>
      <div className="aspect-video relative overflow-hidden bg-[#d4c5a9]">
        <img
          src={ytThumb(videoId)}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; }}
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </div>
        </div>
      </div>
      <CardContent className="p-5">
        <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2 block">{label}</span>
        <h3 className="font-serif font-bold text-base leading-snug mb-2 group-hover:text-primary transition-colors">{title}</h3>
        {teaser && <p className="text-foreground/70 text-sm leading-relaxed line-clamp-3">{teaser}</p>}
      </CardContent>
    </Card>
  );
}

export default function AroundTheCoopPage() {
  usePageMeta({
    title: "Around the Coop | Community Spotlights, Local Businesses & Real Estate Tips",
    description: "Community spotlights, local business features, buyer and seller tips, and videos from Tessa Hood covering Newcastle, Tuttle, Blanchard, and the South OKC area.",
    ogTitle: "Around the Coop – Tessa Hood, The Coop Finder",
    ogDescription: "Local business spotlights, community videos, and real estate education for Newcastle, Tuttle, Blanchard, and South OKC.",
  });

  /* SCHEMA: Blog / ItemList structured data — add JSON-LD here */

  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const categories: Category[] = ["all", "spotlights", "businesses", "buyer-tips", "seller-tips", "videos"];
  const [playingVideo, setPlayingVideo] = useState<{ id: string; title: string } | null>(null);

  return (
    <div className="w-full">

      {/* ── HERO ── */}
      <section className="relative py-12 md:py-28 bg-card">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-3xl md:text-6xl font-bold font-serif text-foreground">Around the Coop</h1>
            <p className="text-lg md:text-2xl text-foreground/80 font-light">
              Community spotlights, local business features, buyer and seller education, and more — all centered on Newcastle, Tuttle, Blanchard, and the South OKC area.
            </p>
          </div>
        </div>
      </section>

      {/* ── FEATURED VIDEO ── */}
      <section className="py-6 md:py-12 bg-background">
        <div className="container px-4 max-w-7xl mx-auto">
          <div
            className="block group cursor-pointer"
            onClick={() => setPlayingVideo({ id: "RngFX5wpDaM", title: "Should You Find a House First or Get Pre-Approved?" })}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-lg bg-[#d4c5a9]">
              <img
                src={ytThumb("RngFX5wpDaM")}
                alt="Should You Find a House First or Get Pre-Approved? – The Coop Finder"
                className="w-full object-cover max-h-[460px] group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/RngFX5wpDaM/hqdefault.jpg`; }}
              />
              <div className="absolute top-6 left-6 z-20">
                <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm">Featured</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 p-4 md:p-8 z-20 text-white w-full md:w-2/3">
                <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-white/70 mb-1">Buyer Tip</p>
                <h2 className="text-lg md:text-3xl font-serif font-bold mb-1 md:mb-2">Should You Find a House First or Get Pre-Approved?</h2>
                <p className="text-white/80 text-xs md:text-sm line-clamp-2 hidden sm:block">Most buyers want to start by touring homes — but getting pre-approved first puts you in a stronger position from day one.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORY FILTERS ── */}
      <section className="py-3 bg-background border-b border-border sticky top-16 z-20">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
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
        <section id="spotlights" className="py-8 md:py-14 bg-background scroll-mt-28">
          <div className="container px-4 max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8 border-b border-border pb-3">Community Spotlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {spotlights.map((v) => (
                <VideoCard key={v.videoId} {...v} label="Community Spotlight" onPlay={(id, title) => setPlayingVideo({ id, title })} />
              ))}
              {/* DUPLICATE CARD PATTERN: Add new spotlights here weekly */}
            </div>
          </div>
        </section>
      )}

      {/* ── LOCAL BUSINESSES ── */}
      {(activeCategory === "all" || activeCategory === "businesses") && (
        <section id="businesses" className="py-8 md:py-14 bg-card/50 scroll-mt-28">
          <div className="container px-4 max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 border-b border-border pb-3">Local Businesses</h2>
            <p className="text-foreground/70 mb-8 text-sm">Spotlighting the independent businesses that make the Newcastle, Tuttle, and Blanchard area a great place to live.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {businesses.map((v) => (
                <VideoCard key={v.videoId} {...v} label="Local Business" onPlay={(id, title) => setPlayingVideo({ id, title })} />
              ))}
              {/* DUPLICATE CARD PATTERN: Add new business spotlights here weekly */}
            </div>
          </div>
        </section>
      )}

      {/* ── BUYER TIPS ── */}
      {(activeCategory === "all" || activeCategory === "buyer-tips") && (
        <section id="buyer-tips" className="py-8 md:py-14 bg-background scroll-mt-28">
          <div className="container px-4 max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 border-b border-border pb-3">Buyer Tips</h2>
            <p className="text-foreground/70 mb-8 text-sm">Practical guidance for home buyers navigating the Oklahoma market.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {buyerTips.map((v) => (
                <VideoCard key={v.videoId} {...v} onPlay={(id, title) => setPlayingVideo({ id, title })} />
              ))}
              {/* DUPLICATE CARD PATTERN: Add new buyer tip videos here */}
            </div>
            <div className="mt-8">
              <Button asChild variant="outline" size="sm">
                <Link href="/buyers">More Buyer Information <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* ── SELLER TIPS ── */}
      {(activeCategory === "all" || activeCategory === "seller-tips") && (
        <section id="seller-tips" className="py-8 md:py-14 bg-card/50 scroll-mt-28">
          <div className="container px-4 max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 border-b border-border pb-3">Seller Tips</h2>
            <p className="text-foreground/70 mb-8 text-sm">Advice to help sellers prepare, price, and navigate the market with confidence.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* ETkDB-HkJRY is both a buyer & seller tip */}
              <VideoCard
                videoId="ETkDB-HkJRY"
                title="Closing Cost Credits — What Sellers Should Know"
                label="Seller Tip"
                teaser="Offering a closing cost credit can help attract more buyers and make your listing stand out — here's how it works and when to use it."
                onPlay={(id, title) => setPlayingVideo({ id, title })}
              />
              {/* DUPLICATE CARD PATTERN: Add new seller tip videos here */}
            </div>
            <div className="mt-8">
              <Button asChild variant="outline" size="sm">
                <Link href="/sellers">More Seller Information <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* ── ALL VIDEOS ── */}
      {(activeCategory === "all" || activeCategory === "videos") && (
        <section id="videos" className="py-8 md:py-14 bg-background scroll-mt-28">
          <div className="container px-4 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8 border-b border-border pb-3">
              <h2 className="text-2xl md:text-3xl font-serif font-bold">All Videos</h2>
              <a
                href="https://youtube.com/@thecoopfinder"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
              >
                View Channel <ArrowRight className="w-3 h-3" />
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {allVideos.map((v) => (
                <VideoCard key={v.videoId} videoId={v.videoId} title={v.title} label={v.label} onPlay={(id, title) => setPlayingVideo({ id, title })} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── INTERNAL LINKS ── */}
      <section className="py-8 md:py-14 bg-card/50">
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

      <VideoModal
        videoId={playingVideo?.id ?? null}
        title={playingVideo?.title}
        onClose={() => setPlayingVideo(null)}
      />

    </div>
  );
}
