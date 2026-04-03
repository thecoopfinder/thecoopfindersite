import { Link } from "wouter";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, Phone } from "lucide-react";

export default function FeaturedPropertiesPage() {
  usePageMeta({
    title: "Featured Properties | Homes for Sale in Newcastle, Tuttle & Blanchard – The Coop Finder",
    description: "Browse featured real estate listings and homes for sale in Newcastle, Tuttle, Blanchard, Mustang, Moore, Norman, and surrounding South Oklahoma City communities with Tessa Hood.",
    ogTitle: "Featured Oklahoma Homes for Sale – The Coop Finder",
    ogDescription: "Current listings and property spotlights in Newcastle, Tuttle, Blanchard, and the South OKC metro. Contact Tessa Hood at 405-913-4185.",
    canonical: "https://www.thecoopfinder.com/featured-properties",
    ogImage: "https://www.thecoopfinder.com/images/featured-property.jpg",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Featured Properties \u2013 Oklahoma Real Estate | The Coop Finder",
      "url": "https://www.thecoopfinder.com/featured-properties",
      "description": "Featured homes and property listings in Newcastle, Tuttle, Blanchard, and surrounding South Oklahoma City communities.",
      "provider": {
        "@type": "RealEstateAgent",
        "@id": "https://www.thecoopfinder.com/#agent",
        "name": "Tessa Hood \u2013 The Coop Finder"
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.thecoopfinder.com/" },
          { "@type": "ListItem", "position": 2, "name": "Featured Properties", "item": "https://www.thecoopfinder.com/featured-properties" }
        ]
      }
    },
  });

  /* ── LISTINGS ────────────────────────────────────────────────────────────────
     Each listing supports:
       img     – path to photo in /public/images/ (leave null for placeholder)
       fbUrl   – Facebook listing URL for "View on Facebook" button (optional)
       status  – "Active" | "New Listing" | "Under Contract" | "Sold" | "Featured"
     Update weekly. All descriptions must remain factual and Fair Housing compliant.
  ──────────────────────────────────────────────────────────────────────────── */
  const listings = [
    {
      id: 1,
      status: "Active",
      city: "Newcastle, OK",
      price: null,
      beds: null,
      baths: null,
      sqft: null,
      img: null,
      fbUrl: "https://www.facebook.com/share/1E7YrjrSjB/",
      desc: "Live listing — photos and details coming soon. View the full post on Facebook or contact Tessa to schedule a showing.",
    },
    {
      id: 2,
      status: "Featured",
      city: "Tuttle, OK",
      price: "$450,000",
      beds: 3,
      baths: 2,
      sqft: "2,100",
      img: null,
      fbUrl: null,
      desc: "Property sitting on 2.5 acres of land. Includes a detached 30x40 workshop, updated interior fixtures, and easy highway access.",
    },
    {
      id: 3,
      status: "Under Contract",
      city: "Blanchard, OK",
      price: "$299,000",
      beds: 3,
      baths: 2,
      sqft: "1,850",
      img: null,
      fbUrl: null,
      desc: "Well-maintained residence in an established neighborhood. Features include a new roof (2023), granite countertops, and mature landscaping.",
    },
    {
      id: 4,
      status: "New Listing",
      city: "Mustang, OK",
      price: "$320,000",
      beds: 4,
      baths: 2,
      sqft: "2,050",
      img: null,
      fbUrl: null,
      desc: "Move-in ready home with recent updates to flooring and paint. The property offers a split floor plan and a spacious primary suite.",
    },
    {
      id: 5,
      status: "Sold",
      city: "Newcastle, OK",
      price: "$415,000",
      beds: 4,
      baths: 3,
      sqft: "2,600",
      img: null,
      fbUrl: null,
      desc: "New construction home with modern finishes throughout. Includes a 3-car garage, study, and energy-efficient features.",
    },
    {
      id: 6,
      status: "Featured",
      city: "Norman, OK",
      price: "$510,000",
      beds: 4,
      baths: 3.5,
      sqft: "3,100",
      img: null,
      fbUrl: null,
      desc: "Large property featuring two living areas, a formal dining room, and an updated kitchen. Located conveniently near major shopping centers.",
    },
  ];

  const statusStyle: Record<string, string> = {
    "Active":         "bg-[#6d6a40] text-white",
    "New Listing":    "bg-[#c99a45] text-white",
    "Under Contract": "bg-amber-500 text-white",
    "Sold":           "bg-destructive/80 text-white",
    "Featured":       "bg-[#6e3c4f] text-white",
  };

  return (
    <div className="w-full">
      <section className="relative py-20 md:py-32 bg-card">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold font-serif text-foreground">Featured Properties</h1>
            <p className="text-xl md:text-2xl text-foreground/80 font-light">
              Explore highlighted homes and acreage currently available in our service areas.
            </p>
            <p className="text-sm text-foreground/60 pt-2">
              Have a property in mind? Call or text Tessa at{" "}
              <a href="tel:+14059134185" className="text-primary font-medium hover:underline">405-913-4185</a>.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container px-4 max-w-7xl mx-auto">
          {/* All listing descriptions must remain neutral, factual, and Fair Housing compliant. Update weekly using Facebook listing content. */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((prop) => (
              <Card key={prop.id} className="overflow-hidden border-border shadow-sm group bg-card flex flex-col">

                {/* Photo */}
                <div className="aspect-[4/3] relative bg-[#d4c5a9] overflow-hidden">
                  <div className="absolute top-4 left-4 z-20">
                    <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm ${statusStyle[prop.status] ?? "bg-primary text-primary-foreground"}`}>
                      {prop.status}
                    </span>
                  </div>

                  {prop.img ? (
                    <img
                      src={prop.img}
                      alt={`Property listing in ${prop.city}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-foreground/50 z-10 gap-2 p-4 text-center">
                      <span className="text-sm font-medium">Photo coming soon</span>
                      <span className="text-xs">Drop images here or contact Tessa for details</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <CardContent className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-1">{prop.city}</h3>

                  {prop.price && (
                    <p className="text-2xl font-serif text-primary mb-4">{prop.price}</p>
                  )}

                  {(prop.beds || prop.sqft) && (
                    <div className="flex gap-4 text-sm text-foreground/70 mb-4 pb-4 border-b border-border/50 font-medium">
                      {prop.beds && <span>{prop.beds} Beds</span>}
                      {prop.baths && <span>{prop.baths} Baths</span>}
                      {prop.sqft && <span>{prop.sqft} SqFt</span>}
                    </div>
                  )}

                  <p className="text-foreground/70 text-sm mb-6 flex-1 leading-relaxed">{prop.desc}</p>

                  {/* Action buttons */}
                  <div className="flex flex-col gap-3 mt-auto">
                    <Button asChild className="w-full gap-2" variant="default">
                      <Link href="/contact#contact-form">
                        <Calendar className="w-4 h-4" /> Schedule a Showing
                      </Link>
                    </Button>

                    {prop.fbUrl ? (
                      <Button asChild variant="outline" className="w-full gap-2">
                        <a href={prop.fbUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" /> View on Facebook
                        </a>
                      </Button>
                    ) : (
                      <Button asChild variant="outline" className="w-full gap-2">
                        <a href="tel:+14059134185">
                          <Phone className="w-4 h-4" /> Call Tessa
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 text-center bg-card rounded-2xl p-10 border border-border/60">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Don't see what you're looking for?</h2>
            <p className="text-foreground/70 mb-8 max-w-xl mx-auto">
              New listings come up every week. Reach out and tell Tessa what you're searching for — she'll keep an eye out on your behalf.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="h-12 px-8">
                <Link href="/contact#contact-form">Tell Me What You're Looking For</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8">
                <a href="tel:+14059134185"><Phone className="w-4 h-4 mr-2" /> 405-913-4185</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
