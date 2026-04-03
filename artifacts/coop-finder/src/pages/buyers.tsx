import { Link } from "wouter";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const buyerFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  buyerType: z.string().min(1, "Please select an option"),
  message: z.string().min(10, "Please provide a brief message"),
});

export default function BuyersPage() {
  usePageMeta({
    title: "Buying a Home in Newcastle, Tuttle & Blanchard | The Coop Finder",
    description: "Tessa Hood helps first-time buyers, move-up buyers, veterans, and acreage hunters find the right home in the Tri-City area and South OKC metro. Honest guidance from contract to close.",
    ogTitle: "Find Your Perfect Home – Buyer Representation with Tessa Hood",
    ogDescription: "Expert buyer representation in Newcastle, Tuttle, Blanchard, and South OKC. First-time buyers, VA loans, new construction, and acreage properties.",
    canonical: "https://www.thecoopfinder.com/buyers",
    ogImage: "https://www.thecoopfinder.com/images/tessa-headshot.png",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Home Buyer Representation \u2013 Oklahoma Real Estate",
      "serviceType": "Buyer Representation",
      "provider": {
        "@type": "RealEstateAgent",
        "@id": "https://www.thecoopfinder.com/#agent",
        "name": "Tessa Hood \u2013 The Coop Finder"
      },
      "areaServed": ["Newcastle, OK", "Tuttle, OK", "Blanchard, OK", "Mustang, OK", "Moore, OK", "Norman, OK", "Yukon, OK", "South Oklahoma City metro"],
      "description": "Expert buyer representation for first-time buyers, veterans (VA loans), move-up buyers, new construction, and acreage properties across the South OKC metro.",
      "url": "https://www.thecoopfinder.com/buyers",
      "offers": {
        "@type": "Offer",
        "description": "Buyer representation services including property search, offer strategy, negotiation, and transaction management.",
        "priceCurrency": "USD",
        "itemOffered": { "@type": "Service", "name": "Buyer Representation" }
      }
    },
  });

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof buyerFormSchema>>({
    resolver: zodResolver(buyerFormSchema),
    defaultValues: { name: "", email: "", phone: "", buyerType: "", message: "" },
  });

  function onSubmit(values: z.infer<typeof buyerFormSchema>) {
    setIsSubmitting(true);
    /* GOHIGHLEVEL INTEGRATION: Replace with GHL webhook URL when ready */
    console.log(values);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({ title: "Message received!", description: "I'll be in touch soon — looking forward to helping you find your coop." });
      form.reset();
    }, 1000);
  }

  return (
    <div className="w-full">

      {/* Hero */}
      <section className="relative py-20 md:py-32 bg-card">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold font-serif text-foreground">Let's Find Your Perfect Coop</h1>
            <p className="text-xl md:text-2xl text-foreground/80 font-light">
              Buying a home is one of the biggest decisions you'll ever make. I'm here to make sure you make it with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Buyer Types */}
      <section className="py-20 bg-background">
        <div className="container px-4 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">Who I Work With</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">Every buyer situation is different. Whether this is your first time or your fifth, I tailor my approach to what you actually need.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "First-Time Buyers",
                body: "I love working with first-timers. There's a lot to learn, and I won't rush through it. We'll go step by step — from understanding your budget to making your first offer — until you feel ready and excited, not overwhelmed.",
              },
              {
                title: "Move-Up Buyers",
                body: "Ready for more space, more land, or a new neighborhood? I'll help you sell your current home and find the next one without the chaos of managing both sides alone. Let's build a game plan that keeps you from being stuck without a place to land.",
              },
              {
                title: "Veterans & VA Buyers",
                body: "VA loans are a tremendous benefit, and you deserve an agent who knows how to use them effectively. I'll connect you with VA-approved lenders and make sure your benefits are working hard for you from day one.",
              },
              {
                title: "Land & Acreage Buyers",
                body: "Buying rural property comes with its own set of questions — wells, septic, easements, agricultural zoning, and more. This is a specialty of mine. If you want land in Tuttle or Blanchard, you want someone who knows what to look for.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-card p-8 rounded-xl border border-border">
                <h3 className="text-xl font-bold font-serif mb-3 text-primary">{item.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buying Process */}
      <section className="py-20 bg-card/50">
        <div className="container px-4 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">The Buying Process, Plain and Simple</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">No mystery, no surprises. Here's how we go from first conversation to closing day.</p>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {[
              { step: 1, title: "Let's Talk", desc: "We start with a no-pressure conversation about your goals, your timeline, what you need in a home, and what you can live without. This is where I learn what 'the right fit' means for you." },
              { step: 2, title: "Get Pre-Approved", desc: "Before we fall in love with a house, we need to know what you can buy. I'll connect you with trusted local lenders who will give you straight answers and treat you right." },
              { step: 3, title: "Start the Search", desc: "Now the fun part. I'll set you up with listings that actually match your criteria, and we'll tour properties together. I'll point out the things you might miss — good and bad." },
              { step: 4, title: "Make a Strong Offer", desc: "When we find the right place, I'll put together a competitive, strategic offer. I know how to negotiate without burning bridges — and how to protect your interests when things get tricky." },
              { step: 5, title: "Inspections & Closing", desc: "I walk you through the inspection report, help you decide what to ask for, and manage everything through appraisal, title, and the final walkthrough. On closing day, you get the keys." },
            ].map((item, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-primary-foreground font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md z-10">
                  {item.step}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl bg-background border border-border shadow-sm">
                  <h3 className="font-bold font-serif text-xl mb-2 text-foreground">{item.title}</h3>
                  <p className="text-foreground/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buyer Lead Form */}
      <section className="py-20 bg-background">
        <div className="container px-4 max-w-3xl mx-auto">
          <div className="bg-card p-8 md:p-12 rounded-2xl shadow-lg border border-border">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold mb-4">Ready to Start Looking?</h2>
              <p className="text-foreground/70">Tell me a little about what you're searching for and I'll be in touch shortly.</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl><Input placeholder="Your name" {...field} className="bg-background" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl><Input placeholder="Your email" {...field} className="bg-background" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl><Input placeholder="Your phone number" {...field} className="bg-background" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="buyerType" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Buyer type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background"><SelectValue placeholder="Select one" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="first-time">First-Time Buyer</SelectItem>
                          <SelectItem value="move-up">Move-Up Buyer</SelectItem>
                          <SelectItem value="veteran">Veteran / VA Loan</SelectItem>
                          <SelectItem value="acreage">Acreage / Land</SelectItem>
                          <SelectItem value="new-construction">New Construction</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel>What are you looking for?</FormLabel>
                    <FormControl><Textarea placeholder="Area, price range, must-haves — whatever helps me understand your search..." className="bg-background min-h-[100px]" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Let's Start the Search"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground text-center">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Have Questions Before You're Ready?</h2>
          <p className="text-xl opacity-90 max-w-xl mx-auto mb-8">I'm happy to answer questions with zero pressure. Call or text me anytime at <strong>405-913-4185</strong>.</p>
          <Button asChild size="lg" className="h-14 px-10 text-lg bg-background text-foreground hover:bg-background/90">
            <Link href="/contact">Contact Tessa</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
