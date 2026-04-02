import { Link } from "wouter";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CommunitiesPage() {
  usePageMeta({
    title: "Communities | Newcastle, Tuttle & Blanchard Realtor – The Coop Finder",
    description: "Explore real estate across Newcastle, Tuttle, Blanchard, Mustang, Moore, Norman, Yukon, and South OKC with Tessa Hood and Knight Land Company.",
    ogTitle: "Oklahoma Communities – The Coop Finder",
    ogDescription: "Serving Newcastle, Tuttle, Blanchard, and surrounding South OKC communities. Explore local real estate with Tessa Hood.",
  });

  /* SCHEMA: Place / RealEstateAgent areaServed structured data — add JSON-LD here */

  const primaryCommunities = [
    {
      id: "newcastle",
      name: "Newcastle",
      state: "OK",
      summary: "Located southwest of Oklahoma City along I-44, Newcastle has experienced significant growth while maintaining a community-centered character. The area offers a range of housing options, including new construction neighborhoods, established residential areas, and properties with acreage.",
      details: "Newcastle is home to the Newcastle Public School District, local shopping and dining, and convenient access to the Oklahoma City metro. The variety of housing options — from entry-level homes to larger properties — makes it one of the most active real estate markets in the Tri-City area.",
    },
    {
      id: "tuttle",
      name: "Tuttle",
      state: "OK",
      summary: "Situated west of Oklahoma City, Tuttle is known for its rural character, strong school district, and availability of acreage properties. It attracts buyers looking for land, equestrian properties, and custom homes in a quieter setting with reasonable proximity to the metro.",
      details: "Tuttle's real estate market includes a variety of acreage lots, rural residential properties, and land suitable for agricultural use. The Tuttle School District is well-regarded, and the community maintains a small-town feel while remaining accessible to Oklahoma City. It is a frequently searched area for buyers prioritizing space and land.",
    },
    {
      id: "blanchard",
      name: "Blanchard",
      state: "OK",
      summary: "Blanchard sits south of the Oklahoma City metro and offers a mix of small-town character, historic downtown areas, and wide-open properties. It provides access to both Norman and Oklahoma City while offering a quieter, more rural setting.",
      details: "Real estate in Blanchard ranges from homes near the historic town center to large acreage properties on the outskirts. The area appeals to buyers looking for more land and privacy without moving far from metro amenities. Proximity to the University of Oklahoma in Norman also adds to the area's appeal.",
    },
  ];

  const secondaryCommunities = [
    {
      id: "mustang",
      name: "Mustang",
      state: "OK",
      summary: "A growing southwest OKC suburb known for its award-winning school district and active residential development.",
      desc: "Mustang offers a variety of residential neighborhoods, strong school options, and expanding commercial amenities. Located southwest of Oklahoma City, it continues to see consistent demand from buyers seeking suburban living with metro access.",
    },
    {
      id: "moore",
      name: "Moore",
      state: "OK",
      summary: "An established community south of Oklahoma City with convenient access to I-35 and a wide range of housing options.",
      desc: "Moore features established neighborhoods, a range of price points, and easy access to both Oklahoma City and Norman via I-35. Its central location within the metro makes it a practical choice for a variety of buyers.",
    },
    {
      id: "norman",
      name: "Norman",
      state: "OK",
      summary: "Home to the University of Oklahoma, Norman offers diverse real estate from starter homes to larger properties across established and newer neighborhoods.",
      desc: "Norman's real estate market includes a wide range of property types, from well-established neighborhoods near the university to newer developments on the city's expanding perimeter. The city offers strong amenities, dining, and cultural activity.",
    },
    {
      id: "yukon",
      name: "Yukon",
      state: "OK",
      summary: "A growing community west of Oklahoma City with expanding residential development and a strong community identity.",
      desc: "Yukon continues to develop on Oklahoma City's western edge, with new construction neighborhoods, local schools, and easy highway access. It draws buyers looking for newer construction and room to grow.",
    },
  ];

  return (
    <div className="w-full">

      {/* ── HERO ── */}
      <section className="relative py-20 md:py-32 bg-card">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold font-serif text-foreground">Explore Our Communities</h1>
            <p className="text-xl md:text-2xl text-foreground/80 font-light">
              Serving the Tri-City area of Newcastle, Tuttle, and Blanchard, along with Mustang, Moore, Norman, Yukon, and surrounding South Oklahoma City communities.
            </p>
          </div>
        </div>
      </section>

      {/* ── PRIMARY: TRI-CITY ── */}
      <section className="py-20 bg-background">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">The Tri-City Area</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">Newcastle, Tuttle, and Blanchard represent the primary service area. These communities receive the deepest focus and most consistent market attention.</p>
          </div>

          <div className="space-y-20">
            {primaryCommunities.map((community, idx) => (
              <div
                key={community.id}
                id={community.id}
                className={`flex flex-col ${idx % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-12 items-center scroll-mt-24`}
              >
                <div className="flex-1 w-full">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#d4c5a9] relative shadow-lg">
                    <img src={`/images/${community.id}.jpg`} alt={`${community.name}, Oklahoma – homes and community`} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex-1 space-y-5">
                  <h3 className="text-3xl font-serif font-bold text-foreground border-b border-border pb-4">
                    {community.name}, {community.state}
                  </h3>
                  <p className="text-lg text-foreground/80 leading-relaxed">{community.summary}</p>
                  <p className="text-foreground/70 leading-relaxed">{community.details}</p>
                  <div className="flex gap-4 pt-2 flex-wrap">
                    <Button asChild variant="outline">
                      <Link href={`/featured-properties`}>View Properties in {community.name}</Link>
                    </Button>
                    <Button asChild variant="ghost">
                      <Link href="/contact">Ask About {community.name} <ArrowRight className="ml-2 w-4 h-4" /></Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECONDARY AREAS ── */}
      <section className="py-20 bg-card/50">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold mb-4">Also Serving</h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              My service area extends throughout the southwestern and southern Oklahoma City metro. Below are additional communities where I actively work with buyers and sellers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {secondaryCommunities.map((community) => (
              <Card key={community.id} id={community.id} className="overflow-hidden border-border shadow-sm group bg-background scroll-mt-24 flex flex-col">
                <div className="aspect-video relative bg-[#d4c5a9]">
                  <img src={`/images/${community.id}.jpg`} alt={`${community.name}, Oklahoma real estate`} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-serif font-bold mb-2">{community.name}, {community.state}</h3>
                  <p className="text-foreground/70 text-sm mb-4 flex-1 leading-relaxed">{community.desc}</p>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href="/contact">Ask About {community.name}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERNAL LINKS ── */}
      <section className="py-16 bg-background">
        <div className="container px-4 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-serif font-bold text-lg mb-2">Browse Properties</h3>
              <p className="text-foreground/70 text-sm mb-4">See current listings across all service areas.</p>
              <Button asChild variant="outline" size="sm"><Link href="/featured-properties">View Featured Properties</Link></Button>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-serif font-bold text-lg mb-2">Buying in the Area?</h3>
              <p className="text-foreground/70 text-sm mb-4">Learn about the buyer process and how I can help.</p>
              <Button asChild variant="outline" size="sm"><Link href="/buyers">Buyer Information</Link></Button>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-serif font-bold text-lg mb-2">Have Questions?</h3>
              <p className="text-foreground/70 text-sm mb-4">Not sure which area is the right fit? Let's talk.</p>
              <Button asChild variant="outline" size="sm"><Link href="/contact">Contact Tessa</Link></Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
