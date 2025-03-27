import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import Logo from "./ui/logo";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

type SiteSettings = {
  site_title: string;
};

const Header = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileArticlesOpen, setMobileArticlesOpen] = useState(false);

  const { data: settings } = useQuery<SiteSettings>({
    queryKey: ['/api/settings'],
  });

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Logo className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-gray-900 font-heading">
                {settings?.site_title || "Creator's Canvas"}
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/">
              <a className={`font-medium ${location === '/' ? 'text-primary' : 'text-gray-700 hover:text-primary'} transition-colors duration-200`}>
                Home
              </a>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="font-medium text-gray-700 hover:text-primary transition-colors duration-200 flex items-center">
                Articles <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/articles">Latest Articles</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/articles?featured=true">Featured</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/articles?view=categories">Categories</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link href="/articles?category=reviews">
              <a className={`font-medium ${location === '/articles?category=reviews' ? 'text-primary' : 'text-gray-700 hover:text-primary'} transition-colors duration-200`}>
                Reviews
              </a>
            </Link>
            
            <Link href="/podcasts">
              <a className={`font-medium ${location === '/podcasts' ? 'text-primary' : 'text-gray-700 hover:text-primary'} transition-colors duration-200`}>
                Podcasts
              </a>
            </Link>
            
            <Link href="/about">
              <a className={`font-medium ${location === '/about' ? 'text-primary' : 'text-gray-700 hover:text-primary'} transition-colors duration-200`}>
                About
              </a>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              type="button" 
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/">
              <a className={`block px-3 py-2 rounded-md text-base font-medium ${location === '/' ? 'text-primary' : 'text-gray-700 hover:text-primary hover:bg-gray-50'}`}>
                Home
              </a>
            </Link>
            
            <button 
              className="w-full text-left flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              onClick={() => setMobileArticlesOpen(!mobileArticlesOpen)}
            >
              Articles
              <ChevronDown className={`h-4 w-4 transform ${mobileArticlesOpen ? 'rotate-180' : ''} transition-transform duration-200`} />
            </button>
            
            {mobileArticlesOpen && (
              <div className="pl-4 space-y-1">
                <Link href="/articles">
                  <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">
                    Latest Articles
                  </a>
                </Link>
                <Link href="/articles?featured=true">
                  <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">
                    Featured
                  </a>
                </Link>
                <Link href="/articles?view=categories">
                  <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">
                    Categories
                  </a>
                </Link>
              </div>
            )}
            
            <Link href="/articles?category=reviews">
              <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">
                Reviews
              </a>
            </Link>
            
            <Link href="/podcasts">
              <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">
                Podcasts
              </a>
            </Link>
            
            <Link href="/about">
              <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">
                About
              </a>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
