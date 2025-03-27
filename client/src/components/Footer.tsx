import React from "react";
import { Link } from "wouter";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1f2937] text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold mb-4">
              Creator<span className="text-secondary">Space</span>
            </h2>
            <p className="text-gray-300 mb-4 max-w-md">
              A simple, responsive blog template designed for content creators 
              who want to focus on creating amazing content without worrying 
              about technical details.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200" aria-label="YouTube">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-gray-300 hover:text-white transition-colors duration-200">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/articles">
                  <a className="text-gray-300 hover:text-white transition-colors duration-200">Articles</a>
                </Link>
              </li>
              <li>
                <Link href="/podcasts">
                  <a className="text-gray-300 hover:text-white transition-colors duration-200">Podcasts</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-gray-300 hover:text-white transition-colors duration-200">About</a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Mail className="mt-1 mr-3 text-secondary h-4 w-4" />
                <span className="text-gray-300">hello@creatorspace.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="mt-1 mr-3 text-secondary h-4 w-4" />
                <span className="text-gray-300">123 Creator Ave, Digital City</span>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Contact Form
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        <div className="text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} CreatorSpace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
