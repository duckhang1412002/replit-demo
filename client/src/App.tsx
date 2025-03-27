import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Articles from "@/pages/Articles";
import Article from "@/pages/Article";
import Podcasts from "@/pages/Podcasts";
import About from "@/pages/About";
import ThemeCustomizer from "@/components/ThemeCustomizer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/articles" component={Articles} />
      <Route path="/articles/:id" component={Article} />
      <Route path="/podcasts" component={Podcasts} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          <Router />
        </div>
        <Footer />
        <ThemeCustomizer />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
