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
  intent: z.string().min(1, "Please select an option"),
  message: z.string().min(10, "Please provide a brief message"),
});

export default function BuyersPage() {
  usePageMeta({
    title: "Buying a Home | Tessa Hood - The Coop Finder",
    description: "Expert guidance for home buyers in Newcastle, Tuttle, Blanchard, and South OKC. First-time buyers, move-up buyers, and acreage specialists.",
  });

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof buyerFormSchema>>({
    resolver: zodResolver(buyerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      intent: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof buyerFormSchema>) {
    setIsSubmitting(true);
    // /* GOHIGHLEVEL INTEGRATION: Replace form action and add webhook URL here when ready */
    console.log(values);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you shortly.",
      });
      form.reset();
    }, 1000);
  }

  return (
    <div className="w-full">
      <section className="relative py-20 md:py-32 bg-card">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold font-serif text-foreground">Find Your Perfect Coop</h1>
            <p className="text-xl md:text-2xl text-foreground/80 font-light">
              Expert buyer representation in Newcastle, Tuttle, Blanchard, and South OKC.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container px-4 max-w-4xl mx-auto">
          <div className="prose prose-lg text-foreground/80 mx-auto mb-16 text-center">
            <p>
              Whether you are a first-time buyer navigating the market, a move-up buyer looking for more space, a veteran utilizing VA benefits, or searching for that perfect piece of acreage in the country, I am here to guide you.
            </p>
          </div>

          <h2 className="text-3xl font-serif font-bold mb-12 text-center">The 5-Step Buying Process</h2>
          
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {[
              { step: 1, title: "Connect & Consult", desc: "We sit down to discuss your goals, timeline, must-haves, and budget." },
              { step: 2, title: "Get Pre-Approved", desc: "I'll connect you with trusted local lenders to determine your purchasing power and secure your financing options." },
              { step: 3, title: "Search Smart", desc: "We'll tour properties that match your criteria, focusing on the communities and features you value most." },
              { step: 4, title: "Make a Strategic Offer", desc: "When we find 'the one,' I'll help you craft a competitive offer and negotiate fiercely on your behalf." },
              { step: 5, title: "Inspections & Closing", desc: "I guide you through the inspection period, appraisal, and final walkthrough, ensuring a smooth path to the closing table." }
            ].map((item, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-primary-foreground font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md z-10">
                  {item.step}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl bg-card border border-border shadow-sm">
                  <h3 className="font-bold font-serif text-xl mb-2 text-foreground">{item.title}</h3>
                  <p className="text-foreground/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container px-4 max-w-3xl mx-auto">
          <div className="bg-card p-8 md:p-12 rounded-2xl shadow-lg border border-border">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold mb-4">Start Your Home Search</h2>
              <p className="text-foreground/70">Connect with Tessa to discuss your home buying goals.</p>
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
                          <Input placeholder="Your name" {...field} className="bg-background" />
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
                          <Input placeholder="Your email" {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone" {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="intent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Are you buying, selling, or both?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="buying">Buying</SelectItem>
                            <SelectItem value="selling">Selling</SelectItem>
                            <SelectItem value="both">Both</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell me what you're looking for..." className="bg-background min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card/50 text-center">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8">Ready to Start Your Search?</h2>
          <Button asChild size="lg" className="h-14 px-10 text-lg">
            <Link href="/contact">Contact Tessa Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}