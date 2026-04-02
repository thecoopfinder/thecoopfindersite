import { Link } from "wouter";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const sellerFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  propertyAddress: z.string().min(5, "Property address is required"),
  message: z.string().min(10, "Please provide a brief message"),
});

export default function SellersPage() {
  usePageMeta({
    title: "Selling Your Home in Newcastle, Tuttle & Blanchard | The Coop Finder",
    description: "Tessa Hood helps sellers in Newcastle, Tuttle, Blanchard, and the South OKC metro with strategic pricing, targeted marketing, and expert transaction management through Knight Land Company.",
    ogTitle: "Sell Your Home with Confidence – Tessa Hood, The Coop Finder",
    ogDescription: "Strategic home selling in Newcastle, Tuttle, Blanchard, and South OKC. Request a home valuation today.",
  });

  /* SCHEMA: Service / HomeSelling structured data — add JSON-LD here */

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof sellerFormSchema>>({
    resolver: zodResolver(sellerFormSchema),
    defaultValues: { name: "", email: "", phone: "", propertyAddress: "", message: "" },
  });

  function onSubmit(values: z.infer<typeof sellerFormSchema>) {
    setIsSubmitting(true);
    /* GOHIGHLEVEL INTEGRATION: Replace with GHL webhook URL when ready */
    console.log(values);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({ title: "Valuation request received!", description: "Thank you — I'll be in touch with your home's valuation shortly." });
      form.reset();
    }, 1000);
  }

  return (
    <div className="w-full">

      {/* ── HERO ── */}
      <section className="relative py-20 md:py-32 bg-card">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold font-serif text-foreground">Selling Your Home</h1>
            <p className="text-xl md:text-2xl text-foreground/80 font-light">
              Strategic pricing, targeted marketing, and dedicated representation for sellers across Newcastle, Tuttle, Blanchard, and the South OKC metro.
            </p>
          </div>
        </div>
      </section>

      {/* ── APPROACH ── */}
      <section className="py-20 bg-background">
        <div className="container px-4 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">A Thoughtful Approach to Selling</h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Selling a home involves more than putting a sign in the yard. The right price, the right presentation, and the right strategy make a real difference in your final outcome.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[
              {
                title: "Strategic Pricing",
                desc: "I provide a detailed Comparative Market Analysis (CMA) to establish a price that reflects current market conditions and attracts serious buyers — without leaving money on the table.",
              },
              {
                title: "Targeted Marketing",
                desc: "Your home gets exposure through the MLS, social media campaigns, my local buyer network, and professional presentation. The goal is to reach the right buyers, not just more buyers.",
              },
              {
                title: "Strong Presentation",
                desc: "How a home looks in photos and in person directly affects buyer interest. I help sellers understand what to prioritize before listing to make the best possible first impression.",
              },
              {
                title: "Expert Negotiation",
                desc: "From initial offers to inspection repair requests, I work to protect your equity and negotiate terms that align with your timeline and goals.",
              },
              {
                title: "Transaction Management",
                desc: "Inspections, appraisals, title work, and lender coordination — I manage the process proactively so issues get addressed before they become problems.",
              },
              {
                title: "Clear Communication",
                desc: "You'll know what's happening at every stage. I keep sellers informed, answer questions promptly, and make sure the path to closing stays on track.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-card p-8 rounded-xl border border-border">
                <h3 className="text-xl font-bold font-serif mb-3 text-primary">{item.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SELLING PROCESS ── */}
      <section className="py-20 bg-card/50">
        <div className="container px-4 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">The Selling Process</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">A straightforward overview of how we go from initial consultation to a successful closing.</p>
          </div>

          <div className="space-y-6">
            {[
              { step: 1, title: "Consultation & Valuation", desc: "We meet to discuss your goals, timeline, and the current state of the market. I'll provide a Comparative Market Analysis so you have an accurate picture of your home's value before we make any decisions." },
              { step: 2, title: "Preparation & Pricing", desc: "We determine the right listing price and talk through any preparation steps — staging, repairs, or improvements — that will help your home show at its best." },
              { step: 3, title: "List & Market", desc: "Your home goes live on the MLS with professional presentation and gets promoted through social media, my buyer network, and targeted local exposure." },
              { step: 4, title: "Offers & Negotiation", desc: "I review all incoming offers with you, explain your options clearly, and negotiate on your behalf to secure the best possible terms." },
              { step: 5, title: "Inspections, Title & Closing", desc: "I manage the transaction through inspection negotiations, appraisal, title work, and final walkthrough — keeping everything on schedule through to closing day." },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start bg-background p-6 rounded-xl border border-border shadow-sm">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold shrink-0 shadow-md">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold font-serif text-lg mb-1 text-foreground">{item.title}</h3>
                  <p className="text-foreground/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUATION FORM ── */}
      <section className="py-24 bg-background">
        <div className="container px-4 max-w-3xl mx-auto">
          <div className="bg-card p-8 md:p-12 rounded-2xl shadow-lg border border-border">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold mb-4">Request a Home Valuation</h2>
              <p className="text-foreground/70">Find out what your home is worth in today's market — no obligation, just information.</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="Your name" {...field} className="bg-background" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="Your email" {...field} className="bg-background" /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem><FormLabel>Phone</FormLabel><FormControl><Input placeholder="Your phone number" {...field} className="bg-background" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="propertyAddress" render={({ field }) => (
                  <FormItem><FormLabel>Property Address</FormLabel><FormControl><Input placeholder="Address of the property you'd like to sell" {...field} className="bg-background" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem><FormLabel>Anything else I should know?</FormLabel><FormControl><Textarea placeholder="Timeline, condition of the property, questions you have..." className="bg-background min-h-[100px]" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Request Home Valuation"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-primary text-primary-foreground text-center">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Ready to Move Forward?</h2>
          <p className="text-xl opacity-90 max-w-xl mx-auto mb-8">Let's talk about your property and put together a plan. Call or text anytime at <strong>405-913-4185</strong>.</p>
          <Button asChild size="lg" className="h-14 px-10 text-lg bg-background text-foreground hover:bg-background/90">
            <Link href="/contact">Contact Tessa</Link>
          </Button>
        </div>
      </section>

    </div>
  );
}
