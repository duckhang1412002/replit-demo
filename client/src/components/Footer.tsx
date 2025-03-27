import { useState } from "react";
import { Link } from "wouter";
import Logo from "./ui/logo";
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type SiteSettings = {
  site_title: string;
};

const Footer = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formLoading, setFormLoading] = useState(false);
  const { toast } = useToast();

  const { data: settings } = useQuery<SiteSettings>({
    queryKey: ['/api/settings'],
  });

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setFormLoading(true);
    try {
      await apiRequest('POST', '/api/contact', contactForm);
      toast({
        title: "Success",
        description: "Your message has been sent successfully!",
        variant: "default",
      });
      setContactForm({ name: '', email: '', message: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <Logo className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-bold">
                {settings?.site_title || "Creator's Canvas"}
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              A simple, elegant platform for content creators and bloggers to effortlessly publish their work.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Pages</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors duration-200">Home</Link></li>
              <li><Link href="/articles" className="hover:text-white transition-colors duration-200">Articles</Link></li>
              <li><Link href="/articles?category=reviews" className="hover:text-white transition-colors duration-200">Reviews</Link></li>
              <li><Link href="/podcasts" className="hover:text-white transition-colors duration-200">Podcasts</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors duration-200">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors duration-200">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/articles?category=content-strategy" className="hover:text-white transition-colors duration-200">Content Strategy</Link></li>
              <li><Link href="/articles?category=podcasting" className="hover:text-white transition-colors duration-200">Podcasting</Link></li>
              <li><Link href="/articles?category=social-media" className="hover:text-white transition-colors duration-200">Social Media</Link></li>
              <li><Link href="/articles?category=seo" className="hover:text-white transition-colors duration-200">SEO</Link></li>
              <li><Link href="/articles?category=video-creation" className="hover:text-white transition-colors duration-200">Video Creation</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Get In Touch</h3>
            <form className="space-y-3" onSubmit={handleContactSubmit}>
              <div>
                <input 
                  type="text" 
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactChange}
                  placeholder="Your Name" 
                  className="w-full px-4 py-2 text-sm bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-primary text-white placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <input 
                  type="email" 
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  placeholder="Your Email" 
                  className="w-full px-4 py-2 text-sm bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-primary text-white placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <textarea 
                  rows={3} 
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  placeholder="Your Message" 
                  className="w-full px-4 py-2 text-sm bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-primary text-white placeholder-gray-400"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="px-4 py-2 bg-primary hover:bg-primary-600 rounded-md text-white text-sm font-medium transition-colors duration-300 disabled:opacity-70"
                disabled={formLoading}
              >
                {formLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} {settings?.site_title || "Creator's Canvas"}. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-6">
            <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
