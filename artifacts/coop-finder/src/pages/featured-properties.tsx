import { Link } from "wouter";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="w-full">
      <section className="relative py-20 md:py-32 bg-card">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold font-serif text-foreground">Featured Properties</h1>
            <p className="text-xl md:text-2xl text-foreground/80 font-light">
              Explore highlighted homes and acreage currently available in our service areas.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container px-4 max-w-7xl mx-auto">
          {/* /* All listing descriptions must remain neutral, factual, and Fair Housing compliant. Update weekly using Facebook listing content. */ }
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: 1, status: "New Listing", city: "Newcastle, OK", price: "$375,000", beds: 4, baths: 2.5, sqft: "2,350", desc: "Spacious single-story home featuring an open concept floor plan, large kitchen island, and a covered back patio on a half-acre lot." },
              { id: 2, status: "Featured", city: "Tuttle, OK", price: "$450,000", beds: 3, baths: 2, sqft: "2,100", desc: "Property sitting on 2.5 acres of land. Includes a detached 30x40 workshop, updated interior fixtures, and easy highway access." },
              { id: 3, status: "Under Contract", city: "Blanchard, OK", price: "$299,000", beds: 3, baths: 2, sqft: "1,850", desc: "Well-maintained residence in an established neighborhood. Features include a new roof (2023), granite countertops, and mature landscaping." },
              { id: 4, status: "New Listing", city: "Mustang, OK", price: "$320,000", beds: 4, baths: 2, sqft: "2,050", desc: "Move-in ready home with recent updates to flooring and paint. The property offers a split floor plan and a spacious primary suite." },
              { id: 5, status: "Sold", city: "Newcastle, OK", price: "$415,000", beds: 4, baths: 3, sqft: "2,600", desc: "New construction home with modern finishes throughout. Includes a 3-car garage, study, and energy-efficient features." },
              { id: 6, status: "Featured", city: "Norman, OK", price: "$510,000", beds: 4, baths: 3.5, sqft: "3,100", desc: "Large property featuring two living areas, a formal dining room, and an updated kitchen. Located conveniently near major shopping centers." },
            ].map((prop) => (
              <Card key={prop.id} className="overflow-hidden border-border shadow-sm group bg-card flex flex-col">
                <div className="aspect-[4/3] relative bg-[#d4c5a9]">
                  <div className="absolute top-4 left-4 z-20">
                    <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm
                      ${prop.status === 'New Listing' ? 'bg-secondary text-secondary-foreground' : 
                        prop.status === 'Under Contract' ? 'bg-amber-500 text-white' :
                        prop.status === 'Sold' ? 'bg-destructive/80 text-white' :
                        'bg-primary text-primary-foreground'}`}
                    >
                      {prop.status}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center text-foreground/60 z-10 font-medium text-center p-4">
                    [Property Image: {prop.city}]
                  </div>
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-1">{prop.city}</h3>
                  <p className="text-2xl font-serif text-primary mb-4">{prop.price}</p>
                  
                  <div className="flex gap-4 text-sm text-foreground/70 mb-4 pb-4 border-b border-border/50 font-medium">
                    <span>{prop.beds} Beds</span>
                    <span>{prop.baths} Baths</span>
                    <span>{prop.sqft} SqFt</span>
                  </div>
                  
                  <p className="text-foreground/70 text-sm mb-6 flex-1">{prop.desc}</p>
                  
                  <div className="flex flex-col gap-3 mt-auto">
                    <Button asChild className="w-full" variant="default">
                      <Link href="/contact">Contact About This Property</Link>
                    </Button>
                    <Button variant="outline" className="w-full">
                      Watch Video Tour
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}