import { Switch, Route } from "wouter";
import { Toaster } from "./components/ui/toaster";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import Podcasts from "./pages/Podcasts";
import About from "./pages/About";
import NotFound from "./pages/not-found";
import { ThemeProvider } from "./context/ThemeContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/articles" component={Articles} />
      <Route path="/podcasts" component={Podcasts} />
      <Route path="/about" component={About} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
