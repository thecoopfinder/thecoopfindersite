import { Link } from "wouter";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  usePageMeta({
    title: "About Tessa Hood | The Coop Finder - Oklahoma Realtor",
    description: "Learn about Tessa Hood, a trusted local expert and real estate agent serving Newcastle, Tuttle, Blanchard, and the surrounding Oklahoma communities.",
  });

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-card">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold font-serif text-foreground">Meet Tessa Hood</h1>
            <p className="text-xl md:text-2xl text-foreground/80 font-light">
              Your trusted local expert in Newcastle, Tuttle, Blanchard, and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 w-full">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#d4c5a9] relative border-8 border-card shadow-xl">
                <div className="absolute inset-0 flex items-center justify-center text-foreground/60 p-8 text-center font-medium">
                  [PHOTO: Professional Lifestyle Headshot of Tessa Hood in a warm, comfortable setting]
                </div>
              </div>
            </div>
            
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Community-Rooted, Client-Focused</h2>
              <div className="prose prose-lg text-foreground/80 prose-headings:font-serif">
                <p>
                  As an Oklahoma native, I understand that finding a home is about more than just square footage and zip codes. It's about finding your "coop"—the place where your family gathers, memories are made, and your roots grow deep.
                </p>
                <p>
                  I built The Coop Finder to provide a boutique, personalized real estate experience. I believe in honest communication, steadfast advocacy, and building relationships that last long after closing day.
                </p>
                <p>
                  My primary focus is the Tri-City area: Newcastle, Tuttle, and Blanchard. These communities offer an incredible blend of spacious living and convenient access to the city. I also proudly serve Mustang, Moore, Norman, Yukon, and the broader South OKC metro.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Her Approach */}
      <section className="py-24 bg-card/50">
        <div className="container px-4 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">My Approach</h2>
            <p className="text-lg text-foreground/70">What you can expect when we work together.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Education & Guidance", desc: "I make sure you understand every step of the process, empowering you to make confident decisions." },
              { title: "Strategic Negotiation", desc: "Advocating fiercely for your best interests, whether you're buying or selling." },
              { title: "Local Connections", desc: "Access to my trusted network of lenders, inspectors, contractors, and title professionals." },
              { title: "Unwavering Support", desc: "I am consistently available, responsive, and dedicated to your success from start to finish." }
            ].map((item, i) => (
              <div key={i} className="bg-background p-8 rounded-xl shadow-sm border border-border/50">
                <h3 className="text-xl font-bold font-serif mb-3 text-primary">{item.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background text-center">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8">Let's Discuss Your Real Estate Goals</h2>
          <Button asChild size="lg" className="h-14 px-10 text-lg">
            <Link href="/contact">Book a Consultation</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}