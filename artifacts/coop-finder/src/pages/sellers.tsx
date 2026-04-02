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
    title: "Selling Your Home | Tessa Hood - The Coop Finder",
    description: "Strategic home selling in Newcastle, Tuttle, and Blanchard. Expert marketing, pricing strategies, and negotiation to maximize your property's value.",
  });

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof sellerFormSchema>>({
    resolver: zodResolver(sellerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      propertyAddress: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof sellerFormSchema>) {
    setIsSubmitting(true);
    // /* GOHIGHLEVEL INTEGRATION: Replace form action here */
    console.log(values);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Valuation Request Sent!",
        description: "Thank you for reaching out. I'll get back to you with your home's valuation shortly.",
      });
      form.reset();
    }, 1000);
  }

  return (
    <div className="w-full">
      <section className="relative py-20 md:py-32 bg-card">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold font-serif text-foreground">Selling Your Home</h1>
            <p className="text-xl md:text-2xl text-foreground/80 font-light">
              Strategic pricing, expert marketing, and strong negotiation for sellers in the Tri-City area.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container px-4 max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-8 text-center">A Strategic Approach to Selling</h2>
          <p className="text-lg text-foreground/80 text-center mb-16">
            Selling your home is a major decision. My goal is to maximize your return while minimizing your stress, handling the complexities so you can focus on your next chapter.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="bg-card p-8 rounded-xl border border-border">
              <h3 className="text-xl font-bold font-serif mb-4 text-primary">Targeted Marketing</h3>
              <p className="text-foreground/70 mb-4">
                We go beyond the MLS. Your property receives comprehensive exposure through targeted social media campaigns, professional presentation, and my extensive local buyer network.
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl border border-border">
              <h3 className="text-xl font-bold font-serif mb-4 text-primary">Strategic Pricing</h3>
              <p className="text-foreground/70 mb-4">
                I provide a detailed Comparative Market Analysis (CMA) to ensure your home is priced perfectly for the current market—attracting serious buyers quickly.
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl border border-border">
              <h3 className="text-xl font-bold font-serif mb-4 text-primary">Expert Negotiation</h3>
              <p className="text-foreground/70 mb-4">
                From initial offers to repair requests, I fiercely protect your equity and negotiate terms that align with your goals and timeline.
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl border border-border">
              <h3 className="text-xl font-bold font-serif mb-4 text-primary">Seamless Management</h3>
              <p className="text-foreground/70 mb-4">
                I actively manage inspections, appraisals, and title work, anticipating potential hurdles before they arise to ensure a smooth closing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card/50">
        <div className="container px-4 max-w-3xl mx-auto">
          <div className="bg-background p-8 md:p-12 rounded-2xl shadow-lg border border-border">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold mb-4">Request a Home Valuation</h2>
              <p className="text-foreground/70">Find out how much equity you have in your current "coop."</p>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} className="bg-card" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Your email" {...field} className="bg-card" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Your phone" {...field} className="bg-card" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="propertyAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Address</FormLabel>
                      <FormControl>
                        <Input placeholder="The address of the property you want to sell" {...field} className="bg-card" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Any specific details or timeline?" className="bg-card min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
                  {isSubmitting ? "Sending Request..." : "Request Home Valuation"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background text-center">
        <div className="container px-4">
          <h2 className="text-3xl font-serif font-bold mb-6">Ready to take the next step?</h2>
          <Button asChild size="lg" className="h-14 px-10 text-lg">
            <Link href="/contact">Contact Tessa Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}