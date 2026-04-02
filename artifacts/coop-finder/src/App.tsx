import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/Layout";
import NotFound from "@/pages/not-found";

import Home from "@/pages/home";
import About from "@/pages/about";
import Buyers from "@/pages/buyers";
import Sellers from "@/pages/sellers";
import Communities from "@/pages/communities";
import FeaturedProperties from "@/pages/featured-properties";
import AroundTheCoop from "@/pages/around-the-coop";
import Contact from "@/pages/contact";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/buyers" component={Buyers} />
        <Route path="/sellers" component={Sellers} />
        <Route path="/communities" component={Communities} />
        <Route path="/featured-properties" component={FeaturedProperties} />
        <Route path="/around-the-coop" component={AroundTheCoop} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;