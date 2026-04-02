import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePageMeta } from "@/hooks/use-page-meta";
import { motion } from "framer-motion";
import { ArrowRight, Home, MapPin, Key, Star } from "lucide-react";
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
    description: "Tessa Hood is your local Realtor serving Newcastle, Tuttle, Blanchard, and the broader South OKC metro. Buyer representation, home sales, new construction, and acreage with Knight Land Company.",
    ogTitle: "Find Your Coop – Tessa Hood, Oklahoma Realtor",
    ogDescription: "Helping families put down roots in Newcastle, Tuttle, Blanchard, and beyond. Call 405-913-4185.",
  });

  /* SCHEMA: LocalBusiness/RealEstateAgent structured data placeholder — add JSON-LD here */
  /*
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Tessa Hood – The Coop Finder",
    "image": "",
    "@id": "",
    "url": "https://www.thecoopfinder.com",
    "telephone": "405-913-4185",
    "email": "TessaHood@TheCoopFinder.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Newcastle",
      "addressRegion": "OK",
      "addressCountry": "US"
    },
    "areaServed": ["Newcastle", "Tuttle", "Blanchard", "Mustang", "Moore", "Norman", "Yukon"]
  }
  </script>
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
      toast({ title: "Got it!", description: "Thanks for reaching out — I'll be in touch soon." });
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

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-card overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-[#d4c5a9]">
            {/* PHOTO: Wide Oklahoma landscape — open sky, rolling fields, golden hour light */}
            <img src="" alt="Wide open Oklahoma sky and golden fields in the Tri-City area" className="w-full h-full object-cover opacity-30" />
          </div>
          <div className="absolute inset-0 bg-background/80 md:bg-background/45 backdrop-blur-[2px]" />
        </div>

        <div className="container relative z-10 px-4 py-20 text-center md:text-left flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif leading-tight text-foreground">
                Find Your Coop in <span className="text-primary italic">Newcastle, Tuttle,</span> and <span className="text-primary italic">Blanchard.</span>
              </h1>
            </motion.div>

            <motion.p
              className="text-lg md:text-xl text-foreground/80 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            >
              I'm Tessa Hood — a local Realtor who was raised right here in the Tri-City area. I know these roads, these neighborhoods, and these communities personally. Let me help you find a place where your family can truly put down roots.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center gap-4 pt-4 md:justify-start justify-center"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button asChild size="lg" className="w-full sm:w-auto h-14 text-base px-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all hover:scale-105" data-testid="button-hero-search">
                <Link href="/featured-properties">Browse Available Homes</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto h-14 text-base px-8 border-primary/20 hover:bg-primary/5 transition-all" data-testid="button-hero-consultation">
                <Link href="/contact">Let's Talk</Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="flex-1 w-full max-w-md md:max-w-none"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl relative bg-[#d4c5a9] border-8 border-background/50">
              {/* PHOTO: Professional headshot of Tessa Hood — warm smile, approachable, natural Oklahoma setting */}
              <img src="" alt="Tessa Hood, Realtor – The Coop Finder, Knight Land Company" className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 flex items-center justify-center text-foreground/50 p-8 text-center font-medium text-sm">
                [Tessa Hood – Professional Headshot]
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brand Intro */}
      <section className="py-24 bg-background">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">Welcome to The Coop Finder</h2>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-light">
              "The Coop Finder" was born from a simple belief: everyone deserves a place they can truly call home — a coop that's theirs. Whether that's a new build on the edge of Newcastle, a piece of land in Tuttle to raise horses, or a quiet acreage home south of Blanchard, I'm here to help you find it and get you to closing with confidence.
            </p>
            <p className="text-lg text-foreground/70 leading-relaxed">
              I work with Knight Land Company and serve buyers and sellers across the Tri-City area — Newcastle, Tuttle, and Blanchard — and throughout Mustang, Moore, Norman, Yukon, and the broader South OKC metro.
            </p>
            <div className="pt-4">
              <img src="/favicon.svg" alt="The Coop Finder logo mark" className="w-12 h-12 mx-auto opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-card/50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">How I Can Help You</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">Whether you're buying your first home, selling the family house, building new, or hunting for acreage — I've got you covered from contract to close.</p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { title: "Buying a Home", desc: "From first-time buyers to veterans using VA benefits, I'll guide you every step of the way and negotiate hard on your behalf.", icon: Home, link: "/buyers" },
              { title: "Selling Your Home", desc: "Smart pricing, targeted marketing, and hands-on transaction management to get your home sold for what it's worth.", icon: Key, link: "/sellers" },
              { title: "New Construction", desc: "The builder's agent works for the builder. Let me be in your corner from lot selection through your final walkthrough.", icon: Star, link: "/buyers" },
              { title: "Land & Acreage", desc: "Specialized experience with rural properties, wells, septic, and the unique quirks of acreage buying and selling.", icon: MapPin, link: "/buyers" },
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

      {/* Why Tessa */}
      <section className="py-24 bg-background">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Why Work With Tessa?</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">This isn't just a job to me. I live here, raise my family here, and I'm genuinely invested in helping my neighbors find their place in these communities.</p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                title: "Locally Grown",
                body: "I'm not a big-city agent parachuting in on weekends. I grew up in this area, I know these school districts, these back roads, and which neighborhoods are up-and-coming. That local knowledge is something you can't Google.",
              },
              {
                title: "Straight Shooter",
                body: "You'll always get my honest opinion — even when it's not what you want to hear. If a house has a problem, we're going to talk about it. My job is to protect you, not just close a deal.",
              },
              {
                title: "With You Start to Finish",
                body: "I return calls, answer texts, and I show up. From your first consultation to handing you the keys, you'll have a real person in your corner who treats your transaction like it's the most important one — because to you, it is.",
              },
            ].map((item, i) => (
              <motion.div key={i} variants={itemVariants} className="bg-card p-8 rounded-xl shadow-sm border border-border/60">
                <h3 className="text-xl font-bold font-serif mb-4 text-primary">{item.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{item.body}</p>
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

      {/* Featured Communities */}
      <section className="py-24 bg-card/50">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Communities I Call Home</h2>
              <p className="text-lg text-foreground/70">The Tri-City area is my primary focus, and I know it like the back of my hand.</p>
            </div>
            <Button asChild variant="outline" className="shrink-0" data-testid="link-all-communities">
              <Link href="/communities">Explore All Areas <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {[
              { city: "Newcastle", teaser: "Fast-growing but still tight-knit. Great schools, new construction, and easy access to the metro via I-44." },
              { city: "Tuttle", teaser: "Wide open land, strong school district, and plenty of room to breathe. A perfect fit if you're after acreage or equestrian property." },
              { city: "Blanchard", teaser: "Southern charm, historic roots, and wide open skies. Blanchard is the peaceful retreat that still keeps you close to everything." },
            ].map(({ city, teaser }) => (
              <Card key={city} className="overflow-hidden border-none shadow-md group cursor-pointer">
                <Link href={`/communities#${city.toLowerCase()}`}>
                  <div className="aspect-video relative bg-[#d4c5a9] overflow-hidden">
                    {/* PHOTO: Representative image of {city} */}
                    <img src="" alt={`${city}, Oklahoma neighborhood and landscape`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center text-foreground/50 z-10 font-medium text-sm">
                      [{city} Community Photo]
                    </div>
                    <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/10 transition-colors" />
                  </div>
                  <CardContent className="p-6 bg-card">
                    <h3 className="text-2xl font-serif font-bold mb-2">{city}</h3>
                    <p className="text-foreground/70 mb-4">{teaser}</p>
                    <span className="text-primary font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                      Explore {city} <ArrowRight className="w-4 h-4" />
                    </span>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { city: "Mustang", note: "Family-friendly suburb, award-winning schools" },
              { city: "Moore", note: "Established neighborhoods, convenient metro access" },
              { city: "Norman", note: "University town, diverse housing options" },
              { city: "Yukon", note: "Czech heritage, growing west-side community" },
            ].map(({ city, note }) => (
              <Link key={city} href={`/communities#${city.toLowerCase()}`}>
                <div className="p-5 rounded-lg bg-card/70 hover:bg-card border border-border hover:border-primary/30 transition-all text-center cursor-pointer group">
                  <p className="font-semibold group-hover:text-primary transition-colors mb-1">{city}</p>
                  <p className="text-xs text-foreground/60">{note}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 bg-background">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Featured Properties</h2>
              <p className="text-lg text-foreground/70">A look at what's currently available in our service areas. Updated regularly.</p>
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
                  <img src="" alt="Featured property listing in Newcastle, Oklahoma" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center text-foreground/50 z-10 font-medium text-sm">
                    [Property Listing Photo {i}]
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">Newcastle, OK</h3>
                  <p className="text-2xl font-serif text-primary mb-4">$349,000</p>
                  <div className="flex gap-4 text-sm text-foreground/70 mb-4 pb-4 border-b">
                    <span>3 Beds</span><span>2 Baths</span><span>2,100 SqFt</span>
                  </div>
                  <p className="text-foreground/70 text-sm mb-6 line-clamp-2">Open floor plan, covered back patio, and a spacious half-acre lot in a sought-after Newcastle neighborhood.</p>
                  <Button asChild className="w-full" variant="outline">
                    <Link href="/featured-properties">View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Around the Coop Preview */}
      <section className="py-24 bg-card/50">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Around the Coop</h2>
              <p className="text-lg text-foreground/70">Life is more than a house. Here's a taste of what makes this area such a great place to live.</p>
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
              { cat: "Buyer Tip", title: "Get Pre-Approved Before You Fall in Love", body: "In a competitive market, a pre-approval letter isn't optional — it's your ticket to the table. I'll connect you with trusted local lenders to get you ready before we start touring." },
              { cat: "Local Favorite", title: "The Newcastle Farmers Market", body: "Every Saturday morning, the Newcastle Farmers Market is a local staple. Fresh produce, homemade goods, and a reminder of exactly what makes small-town Oklahoma so special." },
              { cat: "Seller Tip", title: "Curb Appeal Sells Homes", body: "You never get a second chance at a first impression. Before we list, let's talk about the simple, affordable updates that make buyers pull over and write offers." },
            ].map((card, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Card className="h-full border-border shadow-sm bg-background p-6 flex flex-col gap-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">{card.cat}</span>
                  <h3 className="text-xl font-serif font-bold text-foreground">{card.title}</h3>
                  <p className="text-foreground/70 leading-relaxed flex-1">{card.body}</p>
                  <Link href="/around-the-coop" className="text-primary font-medium inline-flex items-center gap-2 hover:gap-3 transition-all mt-2">
                    Read more <ArrowRight className="w-4 h-4" />
                  </Link>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">What Clients Are Saying</h2>
            <p className="text-lg text-foreground/70">I'm proud of the relationships I build — here's what a few past clients have shared.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { quote: "Tessa knew every neighborhood we looked at better than we did. She pointed out things we never would have noticed and negotiated us into a home we absolutely love. Couldn't have asked for a better experience.", name: "The Martinez Family – Newcastle, OK" },
              { quote: "We were first-time buyers and honestly terrified. Tessa walked us through every single step and never made us feel dumb for asking questions. She was patient, honest, and got us a great deal.", name: "Ashley & Cody – Tuttle, OK" },
              { quote: "Selling a house you've lived in for 20 years is emotional. Tessa handled everything with care and got us above asking. She felt more like a friend than a Realtor.", name: "Jim & Donna – Blanchard, OK" },
            ].map((t, i) => (
              <Card key={i} className="border-border shadow-sm bg-card p-8">
                <div className="flex text-secondary mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-foreground/80 mb-6 italic leading-relaxed">"{t.quote}"</p>
                <p className="font-bold font-serif text-sm">— {t.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture */}
      <section className="py-24 bg-card/50">
        <div className="container px-4 max-w-3xl mx-auto">
          <div className="bg-background p-8 md:p-12 rounded-2xl shadow-lg border border-border">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold mb-4">Ready to Take the First Step?</h2>
              <p className="text-foreground/70">Tell me a little about what you're looking for. No pressure, no obligation — just a conversation.</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl><Input placeholder="Your name" {...field} className="bg-card" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl><Input placeholder="Your email" {...field} className="bg-card" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl><Input placeholder="Your phone number" {...field} className="bg-card" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="intent" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Buying, selling, or both?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-card"><SelectValue placeholder="Select an option" /></SelectTrigger>
                        </FormControl>
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
                  <FormItem>
                    <FormLabel>What's your situation?</FormLabel>
                    <FormControl><Textarea placeholder="Share whatever's helpful — timeline, what you're looking for, questions you have..." className="bg-card min-h-[100px]" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-primary text-primary-foreground text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/favicon.svg')] bg-repeat bg-[length:100px_100px]" />
        </div>
        <div className="container px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Ready to Find Your Coop?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10 font-light">
            Your next chapter starts with one conversation. I'd love to hear where you want to go — and help you get there.
          </p>
          <Button asChild size="lg" className="h-14 px-10 text-lg bg-background text-foreground hover:bg-background/90 transition-all hover:scale-105" data-testid="button-footer-connect">
            <Link href="/contact">Let's Connect Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
