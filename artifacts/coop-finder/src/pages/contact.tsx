import { usePageMeta } from "@/hooks/use-page-meta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  helpType: z.string().min(1, "Please select an option"),
  message: z.string().min(10, "Please provide a brief message"),
});

export default function ContactPage() {
  usePageMeta({
    title: "Contact Tessa Hood | Oklahoma Realtor – The Coop Finder",
    description: "Contact Tessa Hood, your Oklahoma Realtor with Knight Land Company. Serving buyers and sellers in Newcastle, Tuttle, Blanchard, and the South OKC metro. Call 405-913-4185 or email TessaHood@TheCoopFinder.com.",
    ogTitle: "Contact Tessa Hood – The Coop Finder",
    ogDescription: "Reach out to get started — whether you're buying, selling, or just exploring. Call 405-913-4185 or send a message.",
    canonical: "https://www.thecoopfinder.com/contact",
    ogImage: "https://www.thecoopfinder.com/images/tessa-headshot.png",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Tessa Hood \u2013 The Coop Finder",
      "url": "https://www.thecoopfinder.com/contact",
      "description": "Contact Tessa Hood, Oklahoma Realtor with Knight Land Company, for buyer and seller representation in Newcastle, Tuttle, Blanchard, and the South OKC metro.",
      "mainEntity": { "@id": "https://www.thecoopfinder.com/#agent" },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.thecoopfinder.com/" },
          { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://www.thecoopfinder.com/contact" }
        ]
      }
    },
  });

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      helpType: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // /* GOHIGHLEVEL INTEGRATION: Replace form action here */
    console.log(values);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I will get back to you shortly.",
      });
      form.reset();
    }, 1000);
  }

  return (
    <div className="w-full">
      <section className="relative py-20 md:py-32 bg-card">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold font-serif text-foreground">Let's Connect</h1>
            <p className="text-xl md:text-2xl text-foreground/80 font-light">
              Ready to find your coop? I'm here to help.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-serif font-bold mb-6">Contact Information</h2>
                <div className="space-y-6 text-lg text-foreground/80">
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-foreground">Phone</p>
                      <a href="tel:405-913-4185" className="hover:text-primary transition-colors">405-913-4185</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-foreground">Email</p>
                      <a href="mailto:TessaHood@TheCoopFinder.com" className="hover:text-primary transition-colors">TessaHood@TheCoopFinder.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-foreground">Brokerage</p>
                      <p>Knight Land Company</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-8 rounded-xl border border-border">
                <h3 className="text-xl font-bold font-serif mb-4">Service Areas</h3>
                <p className="text-foreground/80 leading-relaxed mb-4">
                  Serving the Tri-City area as my primary focus: <strong className="font-semibold text-foreground">Newcastle, Tuttle, and Blanchard</strong>.
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  Proudly serving the broader metro: Mustang, Moore, Norman, Yukon, and South OKC communities.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card p-8 md:p-10 rounded-2xl shadow-sm border border-border">
              <h2 className="text-2xl font-serif font-bold mb-6">Send a Message</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email address" {...field} className="bg-background" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Your phone number" {...field} className="bg-background" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="helpType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How can I help?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="buying">I am interested in buying</SelectItem>
                            <SelectItem value="selling">I am interested in selling</SelectItem>
                            <SelectItem value="both">I need to sell and buy</SelectItem>
                            <SelectItem value="general">General Question</SelectItem>
                          </SelectContent>
                        </Select>
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
                          <Textarea 
                            placeholder="Tell me a little about your real estate needs..." 
                            className="min-h-[120px] bg-background"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" size="lg" className="w-full h-12" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>

          </div>
        </div>
      </section>

      <section className="py-20 bg-card/50">
        <div className="container px-4 max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-10 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left text-lg font-serif">Do I need my own Realtor for new construction?</AccordionTrigger>
              <AccordionContent className="text-foreground/80 text-base">
                Yes! The builder's agent represents the builder's best interests, not yours. Having your own representation ensures someone is advocating for you during contract negotiations, design selections, inspections, and closing—and it typically costs you nothing, as the builder pays the commission.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left text-lg font-serif">What if I need to sell before I buy?</AccordionTrigger>
              <AccordionContent className="text-foreground/80 text-base">
                This is a very common scenario. We can structure your offers with contingencies, negotiate extended closings or leasebacks, or explore bridge loan options. We will create a custom strategy that minimizes your stress and ensures you aren't left without a "coop."
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left text-lg font-serif">Can you help with first-time buyers?</AccordionTrigger>
              <AccordionContent className="text-foreground/80 text-base">
                Absolutely. I love guiding first-time buyers through the process. We will take it step-by-step, ensuring you understand everything from pre-approval to the final walkthrough, so you feel confident and educated.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left text-lg font-serif">Do you work with land and acreage homes?</AccordionTrigger>
              <AccordionContent className="text-foreground/80 text-base">
                Yes. Buying and selling acreage requires specific knowledge regarding wells, septic systems, easements, and zoning. Communities like Tuttle and Blanchard are prime areas for acreage, and I have the experience to guide you through these unique transactions.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}