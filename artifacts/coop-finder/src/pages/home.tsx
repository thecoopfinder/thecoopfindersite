import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/hooks/use-page-meta";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Home, MapPin, Key, Star, CheckCircle, Phone } from "lucide-react";
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

const fade = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function HomePage() {
  usePageMeta({
    title: "Tessa Hood – The Coop Finder | Newcastle, Tuttle & Blanchard Realtor",
    description: "Tessa Hood helps buyers and sellers across Newcastle, Tuttle, Blanchard, and the South OKC metro. Expert local guidance, trusted connections, and relationship-driven real estate with Knight Land Company.",
    ogTitle: "Find Your Coop – Tessa Hood, Oklahoma Realtor",
    ogDescription: "Serving Newcastle, Tuttle, Blanchard, and the South OKC metro. Call 405-913-4185.",
  });

  /* SCHEMA: LocalBusiness / RealEstateAgent structured data — insert JSON-LD here */

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

  return (
    <div className="w-full">

      {/* ── HERO ── Full-bleed cinematic */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-landscape.jpg"
            alt="Oklahoma landscape near Newcastle, Tuttle, and Blanchard"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        </div>

        <div className="relative z-10 container px-4 pb-20 pt-40">
          <motion.div
            initial="hidden" animate="visible" variants={stagger}
            className="max-w-4xl"
          >
            <motion.p variants={fade} className="text-white/60 uppercase tracking-[0.3em] text-xs font-semibold mb-6">
              Knight Land Company · Newcastle, Oklahoma
            </motion.p>
            <motion.h1
              variants={fade}
              className="text-5xl md:text-7xl lg:text-8xl font-bold font-serif leading-[1.05] text-white mb-8"
            >
              Find Your
              <span className="block text-[#c9a84c] italic">Coop.</span>
              Live Your Dream.
            </motion.h1>
            <motion.p
              variants={fade}
              className="text-white/75 text-lg md:text-xl max-w-xl leading-relaxed mb-10"
            >
              Helping buyers and sellers across Newcastle, Tuttle, Blanchard, and the South OKC metro — with honest guidance and relationships that last.
            </motion.p>
            <motion.div variants={fade} className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="h-14 px-8 text-base bg-[#c9a84c] hover:bg-[#b8973b] text-black font-semibold shadow-xl hover:scale-105 transition-all"
                data-testid="button-hero-search"
              >
                <Link href="/featured-properties">Start Your Search <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base border-white/40 text-white hover:bg-white/10 hover:border-white backdrop-blur-sm"
                data-testid="button-hero-consultation"
              >
                <Link href="/contact">Book a Consultation</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Stat bar */}
        <div className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-md">
          <div className="container px-4 py-5 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { label: "Primary Market", value: "Tri-City" },
              { label: "Areas Served", value: "7+" },
              { label: "Brokerage", value: "Knight Land Co." },
              { label: "Contact", value: "405-913-4185" },
            ].map((s) => (
              <div key={s.label} className="px-6 first:pl-0">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{s.label}</p>
                <p className="text-white font-semibold text-sm">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND STATEMENT ── Dark contrast section */}
      <section className="bg-[#1c2333] py-24">
        <div className="container px-4 max-w-5xl mx-auto text-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="space-y-6"
          >
            <motion.p variants={fade} className="text-[#c9a84c] uppercase tracking-[0.25em] text-xs font-bold">
              The Coop Finder
            </motion.p>
            <motion.h2 variants={fade} className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
              Real estate built on relationships,<br className="hidden md:block" /> not transactions.
            </motion.h2>
            <motion.p variants={fade} className="text-white/60 text-lg leading-relaxed max-w-3xl mx-auto">
              I'm Tessa Hood, a Realtor with Knight Land Company focused on the Tri-City area of Newcastle, Tuttle, and Blanchard — along with Mustang, Moore, Norman, Yukon, and surrounding South OKC communities. My goal is simple: make sure every client feels supported, informed, and confident at every step.
            </motion.p>
            <motion.div variants={fade} className="pt-4">
              <Button asChild variant="ghost" className="text-[#c9a84c] hover:text-[#c9a84c] hover:bg-white/5 group">
                <Link href="/about">
                  Learn more about Tessa
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ── Clean horizontal cards */}
      <section className="py-24 bg-background">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-4">
            <div>
              <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">What I Do</p>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">How I Can Help</h2>
            </div>
            <p className="text-foreground/60 max-w-xs text-sm leading-relaxed text-right hidden md:block">
              Full-service real estate across the South OKC metro — buyers, sellers, land, and new construction.
            </p>
          </div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border"
          >
            {[
              { title: "Buying a Home", desc: "Representation for first-time buyers, veterans, and move-up buyers searching for the right fit.", icon: Home, link: "/buyers", num: "01" },
              { title: "Selling Your Home", desc: "Strategic pricing, targeted marketing, and hands-on management to connect your home with the right buyers.", icon: Key, link: "/sellers", num: "02" },
              { title: "New Construction", desc: "Builder representation works for the builder. I provide independent guidance through every phase.", icon: Star, link: "/buyers", num: "03" },
              { title: "Land & Acreage", desc: "Specialized knowledge for rural properties — wells, septic, easements, and agricultural zoning.", icon: MapPin, link: "/buyers", num: "04" },
            ].map((s) => (
              <motion.div key={s.num} variants={fade}>
                <Link href={s.link} className="block group bg-background hover:bg-card transition-colors duration-300 p-8 h-full">
                  <p className="text-foreground/20 text-4xl font-bold font-serif mb-6">{s.num}</p>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <s.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold font-serif mb-3 group-hover:text-primary transition-colors">{s.title}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed mb-6">{s.desc}</p>
                  <span className="inline-flex items-center gap-1 text-primary text-xs font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── COMMUNITIES ── Image-overlay cards */}
      <section className="py-24 bg-card/40">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-4">
            <div>
              <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Where I Work</p>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">Communities I Serve</h2>
            </div>
            <Button asChild variant="outline" className="shrink-0 group" data-testid="link-all-communities">
              <Link href="/communities">
                Explore All Areas
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Primary 3 — full-bleed image overlay */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
          >
            {[
              { city: "Newcastle", img: "/images/newcastle.jpg", tag: "Primary Market", desc: "Growing southwest OKC community with strong schools and a range of housing options." },
              { city: "Tuttle", img: "/images/tuttle.jpg", tag: "Primary Market", desc: "Rural character, acreage properties, and equestrian land west of Oklahoma City." },
              { city: "Blanchard", img: "/images/blanchard.jpg", tag: "Primary Market", desc: "Small-town charm, open acreage, and convenient access to Norman and OKC." },
            ].map(({ city, img, tag, desc }) => (
              <motion.div key={city} variants={fade}>
                <Link href={`/communities#${city.toLowerCase()}`} className="block group relative aspect-[4/3] overflow-hidden rounded-xl">
                  <img
                    src={img}
                    alt={`${city}, Oklahoma`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <span className="self-start px-2.5 py-1 bg-white/15 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/20">
                      {tag}
                    </span>
                    <div>
                      <p className="text-white/60 text-xs mb-1">{desc}</p>
                      <div className="flex items-center justify-between">
                        <h3 className="text-white text-2xl font-serif font-bold">{city}, OK</h3>
                        <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-[#c9a84c] group-hover:border-[#c9a84c] transition-colors">
                          <ArrowUpRight className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Secondary 4 — compact pills */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { city: "Mustang", img: "/images/mustang.jpg" },
              { city: "Moore", img: "/images/moore.jpg" },
              { city: "Norman", img: "/images/norman.jpg" },
              { city: "Yukon", img: "/images/yukon.jpg" },
            ].map(({ city, img }) => (
              <Link key={city} href={`/communities#${city.toLowerCase()}`} className="block group relative aspect-video overflow-hidden rounded-lg">
                <img src={img} alt={`${city}, Oklahoma`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <p className="absolute inset-0 flex items-center justify-center text-white font-semibold text-sm">{city}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY TESSA ── Dark split layout */}
      <section className="bg-[#1c2333] py-24">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="sticky top-24">
              <p className="text-[#c9a84c] uppercase tracking-[0.25em] text-xs font-bold mb-4">Why Work With Tessa</p>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                A Realtor who shows up — every step of the way.
              </h2>
              <p className="text-white/55 leading-relaxed mb-8">
                From the first conversation to closing day, every client gets honest guidance, clear communication, and an advocate fully in their corner.
              </p>
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:border-white">
                <Link href="/about">More About Tessa <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              className="space-y-px"
            >
              {[
                { title: "Deep Local Knowledge", body: "Primary focus on Newcastle, Tuttle, and Blanchard — with strong familiarity across the broader South OKC metro." },
                { title: "Guidance From Start to Finish", body: "Every step handled with clear communication, honest advice, and consistent follow-through from pre-approval to closing." },
                { title: "Trusted Local Connections", body: "A reliable network of lenders, inspectors, title professionals, contractors, and insurance contacts." },
                { title: "First-Time Buyer & Veteran Support", body: "Patient, thorough guidance — because every buyer deserves a real advocate, no matter where they are in the process." },
                { title: "Strong Communication", body: "Responsive and accessible. You'll always know where things stand and what's coming next." },
                { title: "Creative Deal Structuring", body: "Experience managing contingent sales, new construction, acreage, and financing challenges." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fade}
                  className="group flex gap-4 p-6 border-b border-white/8 hover:bg-white/5 transition-colors cursor-default"
                >
                  <CheckCircle className="w-5 h-5 text-[#c9a84c] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-white/45 text-sm leading-relaxed">{item.body}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURED PROPERTIES ── */}
      <section className="py-24 bg-background">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-4">
            <div>
              <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Listings</p>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">Featured Properties</h2>
            </div>
            <Button asChild variant="outline" className="shrink-0 group" data-testid="link-all-properties">
              <Link href="/featured-properties">
                View All Listings <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[1, 2, 3].map((i) => (
              <motion.div key={i} variants={fade}>
                <Link href="/featured-properties" className="block group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <span className="absolute top-4 left-4 z-20 px-2.5 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-sm">Featured</span>
                    <img
                      src="/images/featured-property.jpg"
                      alt="Featured property listing – Newcastle, Oklahoma"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg leading-tight">Newcastle, OK</h3>
                        <p className="text-foreground/50 text-xs mt-0.5">3 Beds · 2 Baths · 2,100 SqFt</p>
                      </div>
                      <p className="text-2xl font-serif font-bold text-primary">$349K</p>
                    </div>
                    <p className="text-foreground/60 text-sm leading-relaxed mb-5">
                      Single-story home with open floor plan, covered back patio, and half-acre lot.
                    </p>
                    <div className="flex items-center justify-between text-xs text-primary font-semibold uppercase tracking-wider">
                      View Details
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── AROUND THE COOP PREVIEW ── */}
      <section className="py-24 bg-card/40">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-4">
            <div>
              <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Content & Community</p>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">Around the Coop</h2>
              <p className="text-foreground/60 mt-3 max-w-lg">Community spotlights, local business features, buyer and seller tips — all focused on life in the Tri-City area.</p>
            </div>
            <Button asChild variant="outline" className="shrink-0 group">
              <Link href="/around-the-coop">
                See All Videos <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              { videoId: "RngFX5wpDaM", cat: "Buyer Tip", title: "Should You Find a House First or Get Pre-Approved?" },
              { videoId: "JqBPmvrN7eg", cat: "Community Spotlight", title: "Things to Do in Newcastle, OK | Library Tour" },
              { videoId: "VPCIWvD-1BA", cat: "Local Business", title: "Ten Arrows Coffee, Blanchard OK | Bistro Tour" },
            ].map((card) => (
              <motion.div key={card.videoId} variants={fade}>
                <a
                  href={`https://www.youtube.com/watch?v=${card.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group relative aspect-video overflow-hidden rounded-xl"
                >
                  <img
                    src={`https://img.youtube.com/vi/${card.videoId}/maxresdefault.jpg`}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${card.videoId}/hqdefault.jpg`; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40">
                      <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-[#c9a84c] text-xs font-bold uppercase tracking-wider mb-1">{card.cat}</p>
                    <h3 className="text-white font-semibold text-sm leading-snug">{card.title}</h3>
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-background">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Client Stories</p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">What Clients Are Saying</h2>
          </div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { quote: "Tessa was incredibly patient and communicative throughout our entire home search. She helped us navigate a competitive market and we ended up with exactly what we wanted.", name: "Buyer – Newcastle, OK" },
              { quote: "We had a tight timeline on our sale and Tessa handled everything with professionalism. She kept us informed every step of the way and we closed on time.", name: "Seller – Tuttle, OK" },
              { quote: "As first-time buyers, we had a lot of questions. Tessa took the time to walk us through every part of the process and made sure we felt confident in our decisions.", name: "First-Time Buyers – Blanchard, OK" },
            ].map((t, i) => (
              <motion.div key={i} variants={fade}>
                <div className="h-full bg-card border border-border rounded-xl p-8 flex flex-col gap-5">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-[#c9a84c]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.447a1 1 0 00-1.175 0l-3.37 2.447c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" /></svg>
                    ))}
                  </div>
                  <p className="text-foreground/70 leading-relaxed italic flex-1">"{t.quote}"</p>
                  <p className="text-sm font-semibold text-foreground/50 border-t border-border pt-4">{t.name}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="bg-primary py-20">
        <div className="container px-4 max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="space-y-6"
          >
            <motion.h2 variants={fade} className="text-3xl md:text-5xl font-serif font-bold text-primary-foreground">
              Ready to find your coop?
            </motion.h2>
            <motion.p variants={fade} className="text-primary-foreground/70 text-lg max-w-xl mx-auto">
              Whether you're buying, selling, or just exploring your options — let's start a conversation.
            </motion.p>
            <motion.div variants={fade} className="flex flex-wrap justify-center gap-4 pt-2">
              <Button
                asChild
                size="lg"
                className="h-14 px-8 bg-white text-primary hover:bg-white/90 font-semibold shadow-lg"
              >
                <Link href="/contact">Get in Touch</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 px-8 border-white/30 text-white hover:bg-white/10 hover:border-white"
              >
                <a href="tel:4059134185">
                  <Phone className="mr-2 w-4 h-4" /> 405-913-4185
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section className="py-24 bg-background" id="contact-form">
        <div className="container px-4 max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Let's Talk</p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">Send a Message</h2>
            <p className="text-foreground/60 max-w-xl mx-auto">Have a question about buying, selling, or a specific property? Fill out the form and I'll follow up shortly.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/70 text-xs font-semibold uppercase tracking-wider">Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Smith" {...field} className="h-12 border-border/60 focus:border-primary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/70 text-xs font-semibold uppercase tracking-wider">Email Address *</FormLabel>
                  <FormControl>
                    <Input placeholder="jane@example.com" type="email" {...field} className="h-12 border-border/60 focus:border-primary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/70 text-xs font-semibold uppercase tracking-wider">Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="(405) 555-0100" type="tel" {...field} className="h-12 border-border/60 focus:border-primary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="intent" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/70 text-xs font-semibold uppercase tracking-wider">I'm Looking To *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 border-border/60 focus:border-primary">
                        <SelectValue placeholder="Select one..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="buy">Buy a Home</SelectItem>
                      <SelectItem value="sell">Sell My Home</SelectItem>
                      <SelectItem value="buy-sell">Buy & Sell</SelectItem>
                      <SelectItem value="land">Purchase Land / Acreage</SelectItem>
                      <SelectItem value="new-construction">New Construction</SelectItem>
                      <SelectItem value="other">Other / Just Exploring</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="text-foreground/70 text-xs font-semibold uppercase tracking-wider">Message *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell me a bit about what you're looking for..."
                      rows={5}
                      {...field}
                      className="border-border/60 focus:border-primary resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-foreground/40">
                  By submitting you agree to be contacted at the information provided above.
                </p>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </section>

    </div>
  );
}
