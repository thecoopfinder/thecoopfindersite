import { Link } from "wouter";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Card, CardContent } from "@/components/ui/card";

export default function AroundTheCoopPage() {
  usePageMeta({
    title: "Around The Coop | Tessa Hood - The Coop Finder",
    description: "Community insights, local business spotlights, and real estate tips for the Tri-City area and Oklahoma City metro.",
  });

  return (
    <div className="w-full">
      <section className="relative py-20 md:py-32 bg-card">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold font-serif text-foreground">Around The Coop</h1>
            <p className="text-xl md:text-2xl text-foreground/80 font-light">
              Your hub for community highlights, local business features, and real estate insights.
            </p>
          </div>
        </div>
      </section>

      {/* /* Update weekly with Facebook/YouTube content. Duplicate card pattern to add new posts. */ }

      <section className="py-20 bg-background">
        <div className="container px-4 max-w-7xl mx-auto">
          
          <div className="mb-20">
            <div className="aspect-[21/9] md:aspect-[21/7] rounded-2xl overflow-hidden bg-[#d4c5a9] relative mb-8 shadow-md">
              <div className="absolute top-6 left-6 z-20">
                <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm">Featured Video</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-foreground/60 z-10 font-medium">
                [Featured Video Thumbnail: Market Update or Business Spotlight]
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 p-8 z-20 text-white w-full md:w-2/3">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">Q3 Tri-City Real Estate Market Update</h2>
                <p className="text-white/80 line-clamp-2">A look at the latest trends, inventory levels, and what buyers and sellers can expect in Newcastle, Tuttle, and Blanchard.</p>
              </div>
            </div>
          </div>

          <div className="space-y-20">
            
            <div>
              <h2 className="text-3xl font-serif font-bold mb-8 border-b border-border pb-2">Community Spotlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => (
                  <Card key={i} className="overflow-hidden border-border shadow-sm group bg-card">
                    <div className="aspect-video relative bg-[#d4c5a9]">
                      <div className="absolute inset-0 flex items-center justify-center text-foreground/60 z-10 font-medium text-sm">
                        [Community Image {i}]
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2 block">Spotlight</span>
                      <h3 className="text-xl font-bold font-serif mb-2">Annual Newcastle Fall Festival</h3>
                      <p className="text-foreground/70 text-sm mb-4">A look at the upcoming community event and what makes it special for local families.</p>
                      <span className="text-primary text-sm font-medium hover:underline cursor-pointer">Read More →</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-serif font-bold mb-8 border-b border-border pb-2">Buyer & Seller Tips</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2].map(i => (
                  <Card key={i} className="overflow-hidden border-border shadow-sm group bg-card">
                    <div className="aspect-video relative bg-[#d4c5a9]">
                      <div className="absolute inset-0 flex items-center justify-center text-foreground/60 z-10 font-medium text-sm">
                        [Real Estate Tip Image {i}]
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <span className="text-xs font-bold text-secondary uppercase tracking-wider mb-2 block">{i === 1 ? 'Buyer Tip' : 'Seller Tip'}</span>
                      <h3 className="text-xl font-bold font-serif mb-2">{i === 1 ? 'Navigating Inspections' : 'Preparing for Photography'}</h3>
                      <p className="text-foreground/70 text-sm mb-4">Essential advice to ensure a smooth transaction and protect your interests.</p>
                      <span className="text-primary text-sm font-medium hover:underline cursor-pointer">Read More →</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}