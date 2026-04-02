import { Link } from "wouter";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CommunitiesPage() {
  usePageMeta({
    title: "Oklahoma Communities | Tessa Hood - The Coop Finder",
    description: "Explore real estate and living in Newcastle, Tuttle, Blanchard, Mustang, Moore, Norman, Yukon, and South OKC.",
  });

  const primaryCommunities = [
    {
      id: "newcastle",
      name: "Newcastle",
      desc: "A rapidly growing community that offers a perfect blend of small-town charm and modern conveniences. Known for excellent schools and quick access to the OKC metro area via I-44.",
      details: "Newcastle provides a variety of housing options, from established neighborhoods to new construction and properties with acreage. It's a thriving area that maintains a close-knit community feel."
    },
    {
      id: "tuttle",
      name: "Tuttle",
      desc: "Renowned for its strong agricultural roots, excellent school district, and spacious properties. Tuttle is ideal for those seeking a quieter, rural lifestyle without sacrificing proximity to city amenities.",
      details: "If you're looking for land, equestrian properties, or a spacious custom build, Tuttle is a premier destination. The community is highly sought after by families and those wanting room to breathe."
    },
    {
      id: "blanchard",
      name: "Blanchard",
      desc: "Offering a welcoming, historic downtown and wide-open spaces, Blanchard appeals to those looking for a true country living experience just south of the metro.",
      details: "Real estate in Blanchard ranges from historic homes near the town center to expansive acreage properties. It provides a peaceful retreat while remaining accessible to Norman and Oklahoma City."
    }
  ];

  const secondaryCommunities = [
    "Mustang", "Moore", "Norman", "Yukon", "South OKC"
  ];

  return (
    <div className="w-full">
      <section className="relative py-20 md:py-32 bg-card">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold font-serif text-foreground">Explore Our Communities</h1>
            <p className="text-xl md:text-2xl text-foreground/80 font-light">
              Deeply rooted in Newcastle, Tuttle, and Blanchard, and proudly serving the broader metro.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container px-4 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-center">The Tri-City Area</h2>
          
          <div className="space-y-20">
            {primaryCommunities.map((community, idx) => (
              <div key={community.id} id={community.id} className={`flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 items-center scroll-mt-24`}>
                <div className="flex-1 w-full">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#d4c5a9] relative shadow-lg">
                    <div className="absolute inset-0 flex items-center justify-center text-foreground/60 p-8 text-center font-medium">
                      [PHOTO: Representative image of {community.name} - Landscape or landmark]
                    </div>
                  </div>
                </div>
                <div className="flex-1 space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-foreground border-b border-border pb-4">{community.name}, OK</h3>
                  <p className="text-lg text-foreground/80 font-medium">{community.desc}</p>
                  <p className="text-foreground/70">{community.details}</p>
                  <div className="pt-4">
                    <Button asChild variant="outline">
                      <Link href={`/featured-properties?city=${community.name.toLowerCase()}`}>View {community.name} Properties</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card/50">
        <div className="container px-4 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold mb-8">Also Serving</h2>
          <p className="text-lg text-foreground/80 mb-12 max-w-2xl mx-auto">
            My expertise extends throughout the southwestern quadrant of the Oklahoma City metropolitan area.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {secondaryCommunities.map((city) => (
              <div key={city} className="px-6 py-3 bg-background border border-border rounded-full text-foreground/80 font-medium shadow-sm">
                {city}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-background text-center">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8">Not sure which area is right for you?</h2>
          <Button asChild size="lg" className="h-14 px-10 text-lg">
            <Link href="/contact">Let's Talk Neighborhoods</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}