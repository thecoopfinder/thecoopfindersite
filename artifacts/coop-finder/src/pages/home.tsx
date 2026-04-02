import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePageMeta } from "@/hooks/use-page-meta";
import { motion } from "framer-motion";
import { ArrowRight, Home, MapPin, Key, Star, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const leadFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  intent: z.string().min(1, "Please select an option"),
  message: z.string().min(10, "Please provide a brief message"),
});

export default function HomePage() {
  usePageMeta({
    title: "Tessa Hood – The Coop Finder | Newcastle, Tuttle & Blanchard Realtor",
    description: "Tessa Hood helps buyers and sellers across Newcastle, Tuttle, Blanchard, and the South OKC metro. Expert local guidance, trusted connections, and relationship-driven real estate with Knight Land Company.",
    ogTitle: "Find Your Coop – Tessa Hood, Oklahoma Realtor",
    ogDescription: "Serving Newcastle, Tuttle, Blanchard, and the South OKC metro. Call 405-913-4185.",
  });

  /* SCHEMA: LocalBusiness / RealEstateAgent structured data — insert JSON-LD here */
  /*
  {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Tessa Hood – The Coop Finder",
    "telephone": "405-913-4185",
    "email": "TessaHood@TheCoopFinder.com",
    "url": "https://www.thecoopfinder.com",
    "address": { "@type": "PostalAddress", "addressLocality": "Newcastle", "addressRegion": "OK", "addressCountry": "US" },
    "areaServed": ["Newcastle", "Tuttle", "Blanchard", "Mustang", "Moore", "Norman", "Yukon", "South Oklahoma City"]
  }
  */

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof leadFormSchema>>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: { name: "", email: "", phone: "", intent: "", message: "" },
  });

  function onSubmit(values: z.infer<typeof leadFormSchema>) {
    setIsSubmitting(true);
    /* GOHIGHLEVEL INTEGRATION: Replace with GHL webhook URL when ready */
    console.log(values);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({ title: "Message received!", description: "Thank you for reaching out — I'll be in touch soon." });
      form.reset();
    }, 1000);
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="w-full">

      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-card overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-[#d4c5a9]">
            {/* PHOTO: Wide Oklahoma landscape — open sky, golden fields */}
            <img src="" alt="Oklahoma landscape near Newcastle, Tuttle, and Blanchard" className="w-full h-full object-cover opacity-30" />
          </div>
          <div className="absolute inset-0 bg-background/80 md:bg-background/45 backdrop-blur-[2px]" />
        </div>

        <div className="container relative z-10 px-4 py-20 text-center md:text-left flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif leading-tight text-foreground">
                Your Trusted Realtor in <span className="text-primary italic">Newcastle, Tuttle,</span> and <span className="text-primary italic">Blanchard.</span>
              </h1>
            </motion.div>

            <motion.p
              className="text-lg md:text-xl text-foreground/80 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            >
              Helping buyers and sellers across the Tri-City area of Newcastle, Tuttle, and Blanchard — and throughout the broader South Oklahoma City communities. Real estate with local knowledge, honest guidance, and relationships that last.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center gap-4 pt-4 md:justify-start justify-center"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button asChild size="lg" className="w-full sm:w-auto h-14 text-base px-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all hover:scale-105" data-testid="button-hero-search">
                <Link href="/featured-properties">Start Your Home Search</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto h-14 text-base px-8 border-primary/20 hover:bg-primary/5 transition-all" data-testid="button-hero-consultation">
                <Link href="/contact">Book a Consultation</Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="flex-1 w-full max-w-md md:max-w-none"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl relative bg-[#d4c5a9] border-8 border-background/50">
              {/* PHOTO: Professional headshot of Tessa Hood */}
              <img src="" alt="Tessa Hood – Realtor, The Coop Finder, Knight Land Company" className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 flex items-center justify-center text-foreground/50 p-8 text-center font-medium text-sm">
                [Tessa Hood – Professional Headshot]
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BRAND INTRO ── */}
      <section className="py-24 bg-background">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">Welcome to The Coop Finder</h2>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-light">
              The name says it all. "The Coop Finder" is built around one mission: helping you <strong className="font-semibold text-foreground">find your coop and live your dream.</strong> Whether that's a starter home in Newcastle, a piece of land in Tuttle, or a quiet acreage property outside Blanchard — this is about finding the right place for your next chapter.
            </p>
            <p className="text-lg text-foreground/70 leading-relaxed">
              I'm Tessa Hood, a Realtor with Knight Land Company. My focus is on building relationships, providing honest guidance, and making sure every client — buyer or seller — feels supported from the first conversation to closing day. I serve the Tri-City area of Newcastle, Tuttle, and Blanchard as my primary market, along with Mustang, Moore, Norman, Yukon, and surrounding South Oklahoma City communities.
            </p>
            <div className="pt-4">
              <img src="/favicon.svg" alt="The Coop Finder logo mark" className="w-12 h-12 mx-auto opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 bg-card/50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">How I Can Help</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">Full-service real estate representation for buyers, sellers, and everyone in between — across Newcastle, Tuttle, Blanchard, and the South OKC metro.</p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { title: "Buying a Home", desc: "Buyer representation for first-time buyers, veterans, move-up buyers, and everyone searching for the right fit in the Oklahoma market.", icon: Home, link: "/buyers" },
              { title: "Selling Your Home", desc: "Strategic pricing, targeted marketing, and hands-on transaction management to get your home in front of the right buyers.", icon: Key, link: "/sellers" },
              { title: "New Construction", desc: "Builder representation works for the builder — not you. I provide independent guidance through every phase of new construction.", icon: Star, link: "/buyers" },
              { title: "Land & Acreage", desc: "Specialized knowledge for rural properties, including wells, septic systems, easements, and agricultural zoning.", icon: MapPin, link: "/buyers" },
            ].map((service, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-background overflow-hidden group">
                  <CardContent className="p-8 flex flex-col items-center text-center h-full">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <service.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold font-serif mb-3">{service.title}</h3>
                    <p className="text-foreground/70 mb-6 flex-1">{service.desc}</p>
                    <Link href={service.link} className="text-primary font-medium inline-flex items-center gap-2 hover:gap-3 transition-all">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHY TESSA ── */}
      <section className="py-24 bg-background">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Why Work With Tessa?</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">Experience, local market knowledge, and a genuine commitment to every client's outcome — from the first showing to the final signature.</p>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { title: "Deep Local Knowledge", body: "Focused on Newcastle, Tuttle, and Blanchard as my primary market — with strong familiarity across Mustang, Moore, Norman, Yukon, and South OKC." },
              { title: "Guidance From Start to Finish", body: "Every step of the process, from pre-approval to closing, is handled with clear communication, honest advice, and consistent follow-through." },
              { title: "Trusted Local Connections", body: "Access to a reliable network of lenders, inspectors, title professionals, contractors, and insurance contacts built through local experience." },
              { title: "First-Time Buyer & Veteran Support", body: "Patient, thorough guidance for first-time buyers and veterans navigating VA loans — because every buyer deserves an advocate in their corner." },
              { title: "Strong Communication", body: "Responsive, accessible, and straightforward. You'll always know where things stand and what's coming next." },
              { title: "Creative Deal Structuring", body: "Experience managing complex situations — contingent sales, new construction, acreage transactions, and financing challenges." },
            ].map((item, i) => (
              <motion.div key={i} variants={itemVariants}>
                <div className="bg-card p-8 rounded-xl shadow-sm border border-border/60 h-full flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-bold font-serif mb-2">{item.title}</h3>
                    <p className="text-foreground/70 leading-relaxed text-sm">{item.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="h-12 px-8">
              <Link href="/about">More About Tessa <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── FEATURED COMMUNITIES ── */}
      <section className="py-24 bg-card/50">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Communities I Serve</h2>
              <p className="text-lg text-foreground/70">Serving the Tri-City area of Newcastle, Tuttle, and Blanchard, along with surrounding South OKC communities.</p>
            </div>
            <Button asChild variant="outline" className="shrink-0" data-testid="link-all-communities">
              <Link href="/communities">Explore All Areas <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {[
              { city: "Newcastle", desc: "A growing community southwest of Oklahoma City, known for its school district, mix of established neighborhoods and new construction, and convenient access to the metro via I-44." },
              { city: "Tuttle", desc: "Located west of Oklahoma City, Tuttle offers acreage properties, equestrian-friendly land, and a strong school district in a quieter rural setting." },
              { city: "Blanchard", desc: "South of the metro, Blanchard features a historic small-town character alongside wide-open properties and acreage, with access to both Norman and Oklahoma City." },
            ].map(({ city, desc }) => (
              <Card key={city} className="overflow-hidden border-none shadow-md group cursor-pointer">
                <Link href={`/communities#${city.toLowerCase()}`}>
                  <div className="aspect-video relative bg-[#d4c5a9] overflow-hidden">
                    {/* PHOTO: Representative image of {city}, Oklahoma */}
                    <img src="" alt={`${city}, Oklahoma real estate and community`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center text-foreground/50 z-10 font-medium text-sm">[{city}, OK – Community Photo]</div>
                    <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/10 transition-colors" />
                  </div>
                  <CardContent className="p-6 bg-card">
                    <h3 className="text-2xl font-serif font-bold mb-2">{city}, OK</h3>
                    <p className="text-foreground/70 mb-4 text-sm leading-relaxed">{desc}</p>
                    <span className="text-primary font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all text-sm">
                      Explore {city} <ArrowRight className="w-4 h-4" />
                    </span>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { city: "Mustang", desc: "Growing suburb with award-winning schools" },
              { city: "Moore", desc: "Established community with metro access" },
              { city: "Norman", desc: "University town, diverse housing options" },
              { city: "Yukon", desc: "Expanding west-side OKC community" },
            ].map(({ city, desc }) => (
              <Link key={city} href={`/communities#${city.toLowerCase()}`}>
                <div className="p-5 rounded-lg bg-background hover:bg-card border border-border hover:border-primary/30 transition-all text-center cursor-pointer group">
                  <p className="font-semibold group-hover:text-primary transition-colors mb-1">{city}</p>
                  <p className="text-xs text-foreground/60">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROPERTIES ── */}
      <section className="py-24 bg-background">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Featured Properties</h2>
              <p className="text-lg text-foreground/70">A selection of current listings and property spotlights across the service area. Updated regularly.</p>
            </div>
            <Button asChild variant="outline" className="shrink-0" data-testid="link-all-properties">
              <Link href="/featured-properties">View All Listings <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden border-none shadow-md group bg-card">
                <div className="aspect-[4/3] relative bg-[#d4c5a9]">
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm">Featured</span>
                  </div>
                  {/* PHOTO: Property listing photo */}
                  <img src="" alt="Featured property listing – Newcastle, Oklahoma" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center text-foreground/50 z-10 font-medium text-sm">[Property Photo {i}]</div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">Newcastle, OK</h3>
                  <p className="text-2xl font-serif text-primary mb-4">$349,000</p>
                  <div className="flex gap-4 text-sm text-foreground/70 mb-4 pb-4 border-b">
                    <span>3 Beds</span><span>2 Baths</span><span>2,100 SqFt</span>
                  </div>
                  <p className="text-foreground/70 text-sm mb-6 line-clamp-2">Single-story home with open floor plan, covered back patio, and half-acre lot in Newcastle, Oklahoma.</p>
                  <Button asChild className="w-full" variant="outline">
                    <Link href="/featured-properties">View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── AROUND THE COOP PREVIEW ── */}
      <section className="py-24 bg-card/50">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Around the Coop</h2>
              <p className="text-lg text-foreground/70">Community spotlights, local business features, buyer and seller tips, and more — all focused on life in the Newcastle, Tuttle, and Blanchard area.</p>
            </div>
            <Button asChild variant="outline" className="shrink-0">
              <Link href="/around-the-coop">See More <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                videoId: "RngFX5wpDaM",
                cat: "Buyer Tip",
                title: "Should You Find a House First or Get Pre-Approved?",
                body: "Most buyers want to start by touring homes — but getting pre-approved first puts you in a much stronger position when you're ready to make an offer.",
              },
              {
                videoId: "JqBPmvrN7eg",
                cat: "Community Spotlight",
                title: "Things to Do in Newcastle, OK | Library Tour + Kids Activities",
                body: "A look inside the Newcastle Public Library — from learning tablets and activity kits to a 3D printer and local experience passes for families.",
              },
              {
                videoId: "VPCIWvD-1BA",
                cat: "Local Business",
                title: "Ten Arrows Coffee, Blanchard OK | Coffee Shop + Bistro Tour",
                body: "A visit to Ten Arrows Coffee & Bistro in Blanchard — a locally owned spot worth knowing if you're in the area or considering a move.",
              },
            ].map((card, i) => (
              <motion.div key={i} variants={itemVariants}>
                <a href={`https://www.youtube.com/watch?v=${card.videoId}`} target="_blank" rel="noopener noreferrer" className="block group">
                  <Card className="h-full border-border shadow-sm bg-background overflow-hidden flex flex-col">
                    <div className="aspect-video relative overflow-hidden bg-[#d4c5a9]">
                      <img
                        src={`https://img.youtube.com/vi/${card.videoId}/maxresdefault.jpg`}
                        alt={card.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${card.videoId}/hqdefault.jpg`; }}
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col gap-2 flex-1">
                      <span className="text-xs font-bold uppercase tracking-widest text-primary">{card.cat}</span>
                      <h3 className="text-base font-serif font-bold text-foreground leading-snug group-hover:text-primary transition-colors">{card.title}</h3>
                      <p className="text-foreground/70 leading-relaxed flex-1 text-sm">{card.body}</p>
                    </div>
                  </Card>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-background">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">What Clients Are Saying</h2>
            <p className="text-lg text-foreground/70">Relationships built on trust, communication, and results.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { quote: "Tessa walked us through every step of the process and made sure we understood what was happening at each stage. The whole experience was smooth and we never felt left in the dark.", name: "— Buyer Client, Newcastle, OK" },
              { quote: "From the listing appointment to closing, Tessa was professional, communicative, and worked hard to get us the right outcome. We couldn't have asked for better representation.", name: "— Seller Client, Tuttle, OK" },
              { quote: "As first-time buyers, we had a lot of questions. Tessa was patient, knowledgeable, and really took the time to make sure we were making the right decision for our family.", name: "— Buyer Client, Blanchard, OK" },
            ].map((t, i) => (
              <Card key={i} className="border-border shadow-sm bg-card p-8">
                <div className="flex text-secondary mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-foreground/80 mb-6 italic leading-relaxed">"{t.quote}"</p>
                <p className="font-bold font-serif text-sm">{t.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEAD CAPTURE ── */}
      <section className="py-24 bg-card/50">
        <div className="container px-4 max-w-3xl mx-auto">
          <div className="bg-background p-8 md:p-12 rounded-2xl shadow-lg border border-border">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold mb-4">Let's Talk Real Estate</h2>
              <p className="text-foreground/70">Reach out today — no obligation, just a conversation about your goals.</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="Your name" {...field} className="bg-card" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="Your email" {...field} className="bg-card" /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem><FormLabel>Phone</FormLabel><FormControl><Input placeholder="Your phone number" {...field} className="bg-card" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="intent" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Buying, selling, or both?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger className="bg-card"><SelectValue placeholder="Select an option" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="buying">Buying</SelectItem>
                          <SelectItem value="selling">Selling</SelectItem>
                          <SelectItem value="both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem><FormLabel>Message</FormLabel><FormControl><Textarea placeholder="Tell me a little about what you're looking for..." className="bg-card min-h-[100px]" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 bg-primary text-primary-foreground text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/favicon.svg')] bg-repeat bg-[length:100px_100px]" />
        </div>
        <div className="container px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Ready to Find Your Coop?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10 font-light">
            Whether you're buying your first home, selling to move on, or searching for the right piece of land — let's start the conversation.
          </p>
          <Button asChild size="lg" className="h-14 px-10 text-lg bg-background text-foreground hover:bg-background/90 transition-all hover:scale-105" data-testid="button-footer-connect">
            <Link href="/contact">Let's Connect Today</Link>
          </Button>
        </div>
      </section>

    </div>
  );
}
