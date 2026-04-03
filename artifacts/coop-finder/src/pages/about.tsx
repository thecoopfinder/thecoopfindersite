import { Link } from "wouter";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  usePageMeta({
    title: "About Tessa Hood | The Coop Finder – Oklahoma Realtor",
    description: "Tessa Hood is a Realtor with Knight Land Company, serving buyers and sellers across Newcastle, Tuttle, Blanchard, and the broader South OKC metro. Relationship-driven, knowledgeable, and committed to every client.",
    ogTitle: "Meet Tessa Hood – The Coop Finder",
    ogDescription: "Realtor with Knight Land Company serving Newcastle, Tuttle, Blanchard, and South OKC. Focused on education, strategy, and honest guidance from start to finish.",
    canonical: "https://www.thecoopfinder.com/about",
    ogImage: "https://www.thecoopfinder.com/images/tessa-headshot.png",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "name": "About Tessa Hood \u2013 The Coop Finder",
      "url": "https://www.thecoopfinder.com/about",
      "mainEntity": {
        "@type": ["Person", "RealEstateAgent"],
        "@id": "https://www.thecoopfinder.com/#agent",
        "name": "Tessa Hood",
        "jobTitle": "Realtor",
        "worksFor": { "@type": "Organization", "name": "Knight Land Company" },
        "url": "https://www.thecoopfinder.com",
        "image": "https://www.thecoopfinder.com/images/tessa-headshot.png",
        "telephone": "+14059134185",
        "email": "TessaHood@TheCoopFinder.com",
        "description": "Licensed Oklahoma Realtor with Knight Land Company, serving buyers and sellers in Newcastle, Tuttle, Blanchard, and the South OKC metro.",
        "areaServed": ["Newcastle, OK", "Tuttle, OK", "Blanchard, OK", "Mustang, OK", "Moore, OK", "Norman, OK", "Yukon, OK", "South Oklahoma City"]
      },
    },
  });

  return (
    <div className="w-full">

      {/* ── HERO ── */}
      <section className="relative py-12 md:py-32 bg-card">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold font-serif text-foreground">Meet Tessa Hood</h1>
            <p className="text-xl md:text-2xl text-foreground/80 font-light">
              Realtor with Knight Land Company — serving Newcastle, Tuttle, Blanchard, and surrounding South Oklahoma City communities.
            </p>
          </div>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            <div className="flex-1 w-full">
              <div className="aspect-[4/5] relative flex items-end justify-center">
                <img src="/images/tessa-headshot-nobg.png" alt="Tessa Hood, Realtor – The Coop Finder, Knight Land Company, Newcastle Oklahoma" className="w-full h-full object-contain" style={{ filter: "drop-shadow(0 16px 32px rgba(31,58,74,0.20))" }} />
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Relationship-Driven. Community-Focused.</h2>
              <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
                <p>
                  Real estate is personal. For most people, buying or selling a home is one of the most significant decisions they'll make — and it deserves an agent who treats it that way. I'm Tessa Hood, and that's exactly the standard I hold myself to with every client.
                </p>
                <p>
                  The Coop Finder is built around the idea of helping people <strong className="font-semibold text-foreground">find their coop and live their dream</strong> — whatever that looks like for them. For some, that's a move-in ready home in Newcastle. For others, it's a piece of land in Tuttle or a quiet property outside Blanchard. My job is to listen, understand what you're really looking for, and guide you there.
                </p>
                <p>
                  I work with Knight Land Company and specialize in the Tri-City area of Newcastle, Tuttle, and Blanchard as my primary market. I also serve buyers and sellers throughout Mustang, Moore, Norman, Yukon, and the broader South Oklahoma City communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── APPROACH ── */}
      <section className="py-12 md:py-24 bg-card/50">
        <div className="container px-4 max-w-5xl mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">My Approach</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">What you can expect when we work together — from the first conversation to the closing table.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Education & Clarity",
                desc: "I take time to make sure you understand every part of the process — what's happening, why it matters, and what your options are. Informed clients make better decisions and feel more confident throughout the transaction.",
              },
              {
                title: "Strategy & Negotiation",
                desc: "Whether you're buying or selling, I approach every transaction with a clear strategy. That means pricing your home correctly, structuring offers competitively, and negotiating terms that protect your interests.",
              },
              {
                title: "Trusted Local Connections",
                desc: "Over time, I've built relationships with reliable local lenders, inspectors, title professionals, contractors, and insurance contacts. You'll have access to people I trust to do good work.",
              },
              {
                title: "Consistent Communication",
                desc: "You'll never have to wonder where things stand. I stay in regular contact throughout the process and make myself accessible when something comes up — because in real estate, things always come up.",
              },
              {
                title: "Support for All Buyer Types",
                desc: "First-time buyers, veterans using VA benefits, move-up buyers, and acreage purchasers all have different needs. I adapt my approach accordingly and make sure every client feels supported regardless of where they are in the process.",
              },
              {
                title: "Creative Problem Solving",
                desc: "Complex situations — contingent sales, new construction guidance, acreage transactions, financing hurdles — require experience and creative thinking. I've worked through a wide range of scenarios and know how to keep a transaction moving forward.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-background p-5 md:p-8 rounded-xl shadow-sm border border-border/50">
                <h3 className="text-xl font-bold font-serif mb-3 text-primary">{item.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BROKERAGE NOTE ── */}
      <section className="py-10 md:py-20 bg-background">
        <div className="container px-4 max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-serif font-bold">Knight Land Company</h2>
          <p className="text-lg text-foreground/70 leading-relaxed">
            I'm proud to be affiliated with Knight Land Company. Their focus on land, rural, and residential real estate aligns with the work I do across the Tri-City area of Newcastle, Tuttle, and Blanchard — and throughout Oklahoma.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-10 md:py-20 bg-card/50 text-center">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-foreground/70 max-w-xl mx-auto mb-8">
            Whether you're buying, selling, or just starting to think about your options — reach out. I'm happy to talk through your situation with no pressure and no obligation.
          </p>
          <Button asChild size="lg" className="h-14 px-10 text-lg">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>

    </div>
  );
}
