import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePageMeta } from "@/hooks/use-page-meta";
import { motion } from "framer-motion";
import { ArrowRight, Home, MapPin, Key, Star, Video, PlayCircle } from "lucide-react";
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
    title: "Tessa Hood - The Coop Finder | Oklahoma Real Estate",
    description: "Find your dream home in Newcastle, Tuttle, Blanchard, and the broader OKC metro with Tessa Hood, your trusted local Realtor.",
  });

  /* SCHEMA: LocalBusiness/RealEstateAgent structured data placeholder — add JSON-LD here */
  /*
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Tessa Hood - The Coop Finder",
    "image": "",
    "@id": "",
    "url": "https://www.thecoopfinder.com",
    "telephone": "405-913-4185",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "",
      "addressLocality": "Newcastle",
      "addressRegion": "OK",
      "postalCode": "",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 35.2484,
      "longitude": -97.5973
    }
  }
  </script>
  */

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof leadFormSchema>>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      intent: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof leadFormSchema>) {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-card overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-[#d4c5a9] flex items-center justify-center text-foreground/50 opacity-30">
            {/* // PHOTO: Beautiful Oklahoma sunrise or wide open landscape */}
            [Hero Landscape Image Placeholder - Wide open Oklahoma skies]
          </div>
          <div className="absolute inset-0 bg-background/80 md:bg-background/40 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="container relative z-10 px-4 py-20 text-center md:text-left flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif leading-tight text-foreground">
                Find Your Home in <span className="text-primary italic">Newcastle, Tuttle,</span> and <span className="text-primary italic">Blanchard</span> — and Beyond.
              </h1>
            </motion.div>
            
            <motion.p 
              className="text-lg md:text-xl text-foreground/80 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Your trusted guide for real estate across the Tri-City area, South OKC, and the broader Oklahoma communities.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center gap-4 pt-4 md:justify-start justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl relative bg-[#d4c5a9] border-8 border-background/50">
              <div className="w-full h-full flex items-center justify-center text-foreground/60 p-8 text-center font-medium border border-primary/10">
                {/* // PHOTO: Professional Tessa Hood headshot */}
                [Professional Headshot of Tessa Hood - Warm, approachable, professional lighting]
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
              Real estate is about more than transactions; it's about putting down roots. "The Coop Finder" is built on the simple idea of helping you <strong className="font-semibold text-foreground">Find Your Coop and Live Your Dream</strong>. 
            </p>
            <p className="text-lg text-foreground/70 leading-relaxed">
              Whether you're looking for acreage in Tuttle, a new build in Newcastle, or selling your longtime home in Blanchard, I provide honest guidance, local knowledge, and relationship-driven service to make your move seamless. Serving the Tri-City area, Mustang, Moore, Norman, Yukon, and beyond.
            </p>
            <div className="pt-4">
              <img src="/favicon.svg" alt="The Coop Finder subtle logo mark" className="w-12 h-12 mx-auto opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-card/50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">How I Can Help</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">Comprehensive real estate services tailored to your unique goals in the Oklahoma market.</p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { title: "Buying a Home", desc: "Strategic search and negotiation for your next chapter.", icon: Home, link: "/buyers" },
              { title: "Selling Your Home", desc: "Expert marketing to maximize your property's value.", icon: Key, link: "/sellers" },
              { title: "New Construction", desc: "Guidance from builder selection to final walkthrough.", icon: Star, link: "/buyers" },
              { title: "Land & Acreage", desc: "Specialized knowledge for rural and unique properties.", icon: MapPin, link: "/buyers" }
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

      {/* Featured Communities */}
      <section className="py-24 bg-background">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Featured Communities</h2>
              <p className="text-lg text-foreground/70">Deeply rooted in the Tri-City area and serving the broader South OKC communities.</p>
            </div>
            <Button asChild variant="outline" className="shrink-0" data-testid="link-all-communities">
              <Link href="/communities">Explore All Areas <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {['Newcastle', 'Tuttle', 'Blanchard'].map((city) => (
              <Card key={city} className="overflow-hidden border-none shadow-md group cursor-pointer">
                <Link href={`/communities#${city.toLowerCase()}`}>
                  <div className="aspect-video relative bg-[#d4c5a9] overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-foreground/60 z-10 font-medium">
                      [Image of {city} - Local landmark or neighborhood]
                    </div>
                    <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/10 transition-colors z-0"></div>
                  </div>
                  <CardContent className="p-6 bg-card group-hover:bg-card/80 transition-colors">
                    <h3 className="text-2xl font-serif font-bold mb-2">{city}</h3>
                    <p className="text-foreground/70 mb-4 line-clamp-2">A growing community offering a mix of residential neighborhoods, acreage, and excellent proximity to the metro.</p>
                    <span className="text-primary font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                      Explore {city} <ArrowRight className="w-4 h-4" />
                    </span>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Mustang', 'Moore', 'Norman', 'Yukon'].map((city) => (
              <Link key={city} href={`/communities#${city.toLowerCase()}`}>
                <div className="p-4 rounded-lg bg-card/50 hover:bg-card border border-border hover:border-primary/30 transition-all text-center cursor-pointer group">
                  <span className="font-medium group-hover:text-primary transition-colors">{city}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 bg-card/50">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Featured Properties</h2>
              <p className="text-lg text-foreground/70">Discover currently available homes in our service areas.</p>
            </div>
            <Button asChild variant="outline" className="shrink-0" data-testid="link-all-properties">
              <Link href="/featured-properties">View All Listings <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden border-none shadow-md group bg-background">
                <div className="aspect-[4/3] relative bg-[#d4c5a9]">
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm">Featured</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center text-foreground/60 z-10 font-medium">
                    [Property Image Placeholder {i}]
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">Newcastle, OK</h3>
                  <p className="text-2xl font-serif text-primary mb-4">$349,000</p>
                  <div className="flex gap-4 text-sm text-foreground/70 mb-4 pb-4 border-b">
                    <span>3 Beds</span>
                    <span>2 Baths</span>
                    <span>2,100 SqFt</span>
                  </div>
                  <p className="text-foreground/70 text-sm mb-6 line-clamp-2">A beautiful property located in a highly desirable area, featuring spacious living areas and a large backyard.</p>
                  <Button asChild className="w-full" variant="outline">
                    <Link href="/featured-properties">View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Client Experiences</h2>
            <p className="text-lg text-foreground/70">What it's like working with The Coop Finder.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-border shadow-sm bg-card p-8">
                <div className="flex text-secondary mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-foreground/80 mb-6 italic leading-relaxed">
                  "Tessa made the entire transaction process so smooth. Her communication was excellent from start to finish, and she negotiated a great deal for us. We felt completely supported the whole time."
                </p>
                <p className="font-bold font-serif">— Client {i}</p>
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
              <h2 className="text-3xl font-serif font-bold mb-4">Let's Talk Real Estate</h2>
              <p className="text-foreground/70">Reach out today to discuss your goals in the Oklahoma market.</p>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    name="intent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Are you buying, selling, or both?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-card">
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
                        <Textarea placeholder="How can I help you?" className="bg-card min-h-[100px]" {...field} />
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

      {/* CTA Banner */}
      <section className="py-24 bg-primary text-primary-foreground text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/favicon.svg')] bg-repeat bg-[length:100px_100px]"></div>
        </div>
        <div className="container px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Ready to Find Your Coop?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10 font-light">
            Whether you're buying your first home, selling to downsize, or looking for that perfect piece of acreage, I'm here to guide you every step of the way.
          </p>
          <Button asChild size="lg" className="h-14 px-10 text-lg bg-background text-foreground hover:bg-background/90 transition-all hover:scale-105" data-testid="button-footer-connect">
            <Link href="/contact">Let's Connect Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}