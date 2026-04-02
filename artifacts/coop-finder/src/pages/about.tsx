import { Link } from "wouter";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  usePageMeta({
    title: "About Tessa Hood | The Coop Finder – Oklahoma Realtor",
    description: "Tessa Hood is a local Oklahoma Realtor with Knight Land Company, serving Newcastle, Tuttle, Blanchard, and the broader South OKC metro. Honest, knowledgeable, and genuinely invested in her clients.",
    ogTitle: "Meet Tessa Hood – The Coop Finder",
    ogDescription: "A local Realtor who knows the Tri-City area inside and out. Serving Newcastle, Tuttle, Blanchard, and beyond with Knight Land Company.",
  });

  /* SCHEMA: Person/RealEstateAgent structured data — add JSON-LD here */

  return (
    <div className="w-full">

      {/* Hero */}
      <section className="relative py-20 md:py-32 bg-card">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold font-serif text-foreground">Meet Tessa Hood</h1>
            <p className="text-xl md:text-2xl text-foreground/80 font-light">
              Local roots. Honest guidance. A Realtor who actually picks up the phone.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 w-full">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#d4c5a9] relative border-8 border-card shadow-xl">
                {/* PHOTO: Lifestyle headshot of Tessa Hood — warm, comfortable setting, natural Oklahoma light */}
                <img src="" alt="Tessa Hood, Realtor with Knight Land Company – Newcastle, Oklahoma" className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 flex items-center justify-center text-foreground/50 p-8 text-center font-medium text-sm">
                  [Tessa Hood – Lifestyle Headshot]
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">I Know This Place Because I'm From Here</h2>
              <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
                <p>
                  I'm an Oklahoma native, and the Tri-City area has been my home for most of my life. I've watched Newcastle grow, I know the roads in Tuttle before they were paved, and I've seen Blanchard hold onto its Southern charm through it all. That's not marketing — that's just where I live.
                </p>
                <p>
                  When I started The Coop Finder, I wanted to build a brand that reflected the way I actually work: personal, straightforward, and genuinely invested. The "coop" is a metaphor I love — everyone deserves a place that's truly theirs, where you can put down roots and feel at home.
                </p>
                <p>
                  I work with Knight Land Company and focus primarily on the Tri-City area, though I also serve buyers and sellers throughout Mustang, Moore, Norman, Yukon, and the broader South OKC metro. Whether you're a first-time buyer nervous about the process, a seller ready for your next chapter, or someone hunting for the right piece of land — I want to be the Realtor you call.
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
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">What Working With Me Looks Like</h2>
            <p className="text-lg text-foreground/70">A few things I believe in and how they show up in every transaction.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Education First",
                desc: "I won't rush you through anything. Real estate has a lot of moving parts, and my job is to make sure you understand every step before you sign anything. An informed client makes better decisions — and feels a whole lot better about them.",
              },
              {
                title: "Negotiation That Actually Works",
                desc: "I'm not in this to make friends with the other side. I'm in it to get you the best outcome possible. That means knowing the market, reading the situation, and advocating hard — whether we're writing an offer or pushing back on repair requests.",
              },
              {
                title: "A Trusted Local Network",
                desc: "I've built relationships over the years with lenders, inspectors, title companies, and contractors who do good work and treat clients with respect. You'll have access to people I'd send my own family to.",
              },
              {
                title: "Available When It Counts",
                desc: "Real estate doesn't run on business hours, and neither do I. If something comes up on a Sunday evening, you can reach me. I take communication seriously because I know how much is riding on this for you.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-background p-8 rounded-xl shadow-sm border border-border/50">
                <h3 className="text-xl font-bold font-serif mb-3 text-primary">{item.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Knight Land Company */}
      <section className="py-20 bg-background">
        <div className="container px-4 max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-serif font-bold">Knight Land Company</h2>
          <p className="text-lg text-foreground/70 leading-relaxed">
            I'm proud to be affiliated with Knight Land Company, a brokerage built around integrity and deep Oklahoma roots. Their focus on land, rural, and residential transactions aligns perfectly with the work I do in the Tri-City area and beyond.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-card/50 text-center">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Let's Find Your Coop Together</h2>
          <p className="text-foreground/70 max-w-xl mx-auto mb-8">I'd love to hear what you're looking for. Reach out anytime — no pressure, just a real conversation about your goals.</p>
          <Button asChild size="lg" className="h-14 px-10 text-lg">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
