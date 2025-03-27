import React, { useState } from "react";
import { Link } from "wouter";
import { useTheme } from "../context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PaletteIcon, Menu, X } from "lucide-react";

interface HeaderProps {
  logoText?: string;
  navItems?: { label: string; href: string }[];
}

const Header: React.FC<HeaderProps> = ({
  logoText = "Creator",
  navItems = [
    { label: "Home", href: "/" },
    { label: "Articles", href: "/articles" },
    { label: "Podcasts", href: "/podcasts" },
    { label: "About", href: "/about" }
  ]
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toggleCustomizer } = useTheme();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="border-b border-gray-200 sticky top-0 bg-background z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-bold">
              <Link href="/">
                <a className="text-primary">
                  {logoText}<span className="text-secondary">Space</span>
                </a>
              </Link>
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <a className="text-foreground hover:text-primary font-medium">
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Theme customizer button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCustomizer}
            className="hidden md:flex items-center justify-center"
            aria-label="Customize theme"
          >
            <PaletteIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <Separator />
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <a className="block px-3 py-2 text-base font-medium text-foreground hover:bg-secondary/10 rounded-md">
                  {item.label}
                </a>
              </Link>
            ))}
            <Button 
              variant="ghost" 
              className="w-full justify-start px-3 py-2 text-base font-medium text-foreground hover:bg-secondary/10 rounded-md"
              onClick={toggleCustomizer}
            >
              <PaletteIcon className="h-5 w-5 mr-2" />
              Customize Theme
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
